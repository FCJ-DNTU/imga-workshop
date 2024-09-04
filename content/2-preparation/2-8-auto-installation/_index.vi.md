+++
title = "Tự động cài đặt, triển khai"
date = 2024
weight = 8
chapter = false
pre = "2.8. "
+++

{{% notice note %}}
Các bạn có thể bỏ qua phần này để làm các phần tiếp theo, nhưng nếu như các bạn muốn hiểu được cách mà hệ thống được triển khai thì vui lòng đọc tiếp phần này.
{{% /notice %}}

Trong môi trường phát triển, mình có 2 phần là FrontEnd và BackEnd.

#### Triển khai website

Ở trong môi trường phát triển của chúng ta, website sẽ được chuyển tới theo từng bước như sau:

- Bản hoàn chỉnh của trang website được tải lên S3
- CloudFront sẽ lấy dữ liệu website đó từ S3 Bucket (gọi là Origin). Tạo ra distribution để quản lý dữ liệu này.
- Tuy nhiên Bucket này là riêng tư, nên CloudFront cần phải thiết lập OAI để cài vào trong resource-based policy của Bucket, để Bucket này có thể "biết" được distribution đó.
- Khi đó CloudFront sẽ phân phối dữ liệu tới các Edge Location khác nhau.
- Khi người dùng truy cập vào ứng dụng web thì trình duyệt sẽ lấy thônng tin ở Edge Location gần nhất.
- Cuối cùng là hiển thị nội dung lên cho người dùng cuối.

Thông thường, để triển khai được ứng dụng web, thì chúng ta cần phải xây dựng -> kiểm thử -> triển khai lên máy chủ (tải dữ liệu của ứng dụng web), bằng cách thủ công.

Nhưng trong bài này thì ứng dụng của chúng ta sẽ được triển khai tự động với Github Actions, cụ thể là Github sẽ kích hoạt workflow khi nhánh `main` của dự án được đẩy lên từ máy của một lập trình viên nào đó hoặc được ghép lại từ các nhánh khác; hoặc là lập trình viên có thể kích hoạt thủ công.

Khi đó, một Runner sẽ đảm nhận thực hiện các công việc (Jobs) trong workflow đã được định nghĩa trước đó theo từng bước (Steps), cụ thể

- Nội dung của web sẽ được bundle lại bởi Webpack
- Sau đó là tối giản lại những ký tự không cần thiết để giảm dung lượng
- Lưu lại vào một thư mục (build)
- AWS CLI sẽ tiếp lập credential từ ACCESS KEY ID và SERECT ACCESS KEY cùng với tên Bucket và Region của Bucket.
- AWS sẽ copy nội dung trong thư mục (build) để tải lên trên S3.
- Cuối cùng là kết thúc các công việc, Runner tiến hành dọn dẹp tài nguyên.

Đây là workflow

```yml
# Tên của workflow
name: Deploy to product environment

# Sự kiện của github
# Khi nào thì workflow nên được kích hoạt?
on:
  # Đẩy các thay đổi trong code lênh nhánh master hoặc main
  push:
    branches: [master, main]

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build_website:
    runs-on: ubuntu-latest
    steps:
      # Vào trong thư mục repo
      - name: Check to repository
        uses: actions/checkout@v4
        with:
          submodules: recursive

      # Cài đặt node
      - name: Install NodeJS
        uses: actions/setup-node@v4
        with:
          node-version: 20

      # Cài cài thư viện
      - name: Install dependencies
        run: npm install

      # Xây dựng website với webpack
      # Output được lưu ở trong build/gui
      - name: Build website
        run: npm run build

      # Chuẩn bị AWS Credential
      - name: Prepare AWS Credential
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY}}
          aws-region: ${{ secrets.AWS_REGION}}

      # Tải artifact lên S3
      - name: Upload website to Amazon S3
        run: aws s3 cp ./build/gui s3://${{ secrets.AWS_BUCKET }} --recursive
```

Nhìn chung thì workflow này cũng thể hiện được đầy đủ những gì mà mình muốn truyền tải rồi. Ngoài ra, các bạn có thể tách bước build và deploy (chuẩn bị AWS Credential tới Tải artifact lên S3) ra làm 2 jobs khác nhau. Tuy nhiên mỗi job sẽ chạy ở 2 runner khác nhau, nhưng vẫn trong cùng một workflow, nên:

1. Cuối công việc build thì các bạn nên tải artifact lên Context của Worfklow.
2. Ở đầu công việc deploy thì các bạn tải artifact đó xuống Runner và tiến hành tiếp các bước còn lại.

#### Triển khai máy chủ của ứng dụng web

Để triển khai máy chủ cho ứng dụng web thì có phức tạp hơn một xíu, cụ thể là mình sẽ phải viết kịch bản triển khai trong docker container. Với luồng triển khai là như sau:

- Khi được phát triển xong, thì mã nguồn của máy chủ web sẽ được xây dựng lại với docker thông qua các scripts
- Sau khi được đóng gói thành Docker Image thì sẽ được tải lên ECR
- Khi này thì kỹ sư DevOps sẽ kết nối tới EC2 ở trong môi trường sản phẩm để kéo docker image ở trên ECR về.
- Tiếp theo là chạy docker để bắt đầu thực hiện việc triển khai

Cụ thể, khi xây dựng, thì

- Node, Npm sẽ được cài để cài đặt các thư viện cần thiết để chạy Node Server
- Python và Pip sẽ được cài đặt để thực hiện các chức năng chính
- Các thư viện python và Tesseract OCR cũng sẽ được cài

Tương ứng với việc xây dựng đó thì chúng ta có 2 scripts, các tệp scripts này sẽ được chạy trong quá trình xây dựng docker container

##### Cài đặt NodeJS và các thư viện cho Web server

Đầu tiên là file script `backend/nodejs/scripts/install.sh`

Script này được dùng để cài đặt các packages phù hợp để có thể triển khai được ứng dụng web server.

```bash
#!/bin/bash

. /home/backend/utils.sh

## Update packages
apt update

## Install curl
apt install curl

## Install nodejs
### Install `nvm`
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# infoln "NVM has just been installed: $(nvm -v)"

### Install node 20
nvm install node 20

### Check version of `node` and `npm`
infoln "Node has just been installed: $(node -v)"
infoln "NPM has just been installed: $(npm -v)"

### Change directory to `nodejs`
cd /home/backend/nodejs

## Install packages in `package.json`
npm install
npm install -g pm2

infoln "Install packages: $(npm list -g)"
```

Giải thích:

- Đầu tiên, load các utils trong `/home/backend/utils.sh`. Các utils này là các hàm in ra màn hình.
- Cập nhật lại các thông tin của packages trong hệ thống với `apt update`.
- Cài đặt `curl` và tải nvm với curl và thực thi `install.sh` với lệnh `bash`.
- Cài dặt xong thì bắt đầu setup biến môi trường.
- Cài đặt Node 20.
- Cài đặt pm2 toàn cục, pm2 dùng để quản lý các instance của Node.

Tới bước này thì mình chưa chạy server vội, vì backend chưa sẵn sàng để chạy.

##### Cài đặt Python, Tesseract OCR

Tiếp theo là file script `backend/python/scripts/install.sh`

Script này được dùng để cài các thư viện của python, cũng như là Tesseract OCR

```bash
#!/bin/bash

## Update packages
apt update

## Install util packages
apt install wget

## Install python and pip
### Install python3
apt install python3
printf "Python has been just installed: $(python3 --version)"

### Install `pip3` and `virtualenv`
apt install python3-pip python3-virtualenv
printf "PIP has just been installed: $(pip3 --version)"
printf "virtualenv has just been installed: $(virtualenv --version)"

# Change directory to `/home/backend/python`
cd /home/backend/python

## Create virtual environment
virtualenv venv
source venv/bin/activate

## Install packages in `requirements.txt`
pip3 install -r requirements.txt

## Install tesseract
apt install tesseract-ocr

## Create `xml/haarcascade` directory
mkdir xml
cd xml
mkdir haarcascade
cd haarcascade

## Install xml file for test
wget https://raw.githubusercontent.com/opencv/opencv/4.x/data/haarcascades/haarcascade_frontalface_default.xml
wget https://raw.githubusercontent.com/opencv/opencv/4.x/data/haarcascades/haarcascade_eye_tree_eyeglasses.xml
```

Giải thích:

- Giống với script trước, mình cũng nên cập nhật lại thông tin của các packages.
- Cài đặt wget.
- Cài đặt python3 với lệnh `apt install python3`.
- Thông thường thì khi cài python trên linux sẽ không có pip, nên mình tiến hành cài python cũng như là virtualenv. Virtualenv để chạy chương trình python, giúp cho mình cô lập các tài nguyên của python trên máy.
- Sau khi cài xong thì sẽ cd (change directory) vào thư mục `/home/backend/python` (root của python).
- Tạo một môi trường ảo với `virtualenv` và thư mục host là `venv`. Lúc sau, mình sẽ chuyển session vào trong `venv/bin/activate`.
- Giờ là lúc cài đặt các thư viện cần thiết co chương trình python trong file `requirements.txt`.
- Cài đặt Tesseract OCR với apt.
- Vì hiện tại đang ở trong thư mục root của python, tạo một folder mới tên là `xml`. CD tiếp vào thư mục mới này, tiếp theo là tạo một thư mục mới tên là `haarcascade` và cd vào trong thư mục này.
- Tải các file xml (training file) về để hỗ trợ nhận diện khuôn mặt và mắt kính. Phần này các bạn có thể bỏ đi, vì nó không liên quan tới chức năng chính, nhưng nếu muốn test thì các bạn nên để lại cho sau này.

Có thể nói là chương trình python của hệ thống giờ đã sẵn sàng hoạt động.

##### Khởi động Web server

Một script nữa dùng để khởi động server `backend/nodejs/scripts/start.sh`

```bash
#!/bin/bash

# Set up PATH
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# Change directory to `nodejs`
cd /home/backend/nodejs

export PYTHON_PATH="/home/backend/python/venv/bin/python"
export TEMP_PATH="/home/backend/temp"
export UPLOADS_PATH="/home/backend/uploads"

## Setup AWS Resource Information
export AWS_REGION="your_region"
export BUCKET_NAME="your_bucket_name"

# Start NodeJS Server
npm start

pm2 logs
```

Giải thích:

- Vì mỗi script là một process con, nên khi qua script khác thì các biến môi trường sẽ biến mất, ở đây các biến môi trường để chạy Node, Nvm và Npm sẽ được assign lại.
- Sau đó là assign các biến môi trường khác, các biến này sẽ được dùng trong NodeJS.
- Có 2 biến mối trường cũng quan trọng là `AWS_RESION` và `BUCKET_NAME`, lần lượt là vùng mà S3 bucket được triển khai và tên của Bucket đó. Bucket ở đây sẽ là bucket lưu ảnh.
- Bắt đầu server và mở log.

Đến giờ thì mọi thứ đã gần như là sẵn sàng, giờ chúng ta ghép các script lại thành một script duy nhất là có thể dùng để triển khai.

##### Kết hợp lại các script thành một script hoàn chỉnh duy nhất

Cuối cùng là gom vào trong một script duy nhất `backend/install.sh`

```bash
#!/bin/bash

. utils.sh

# Change directory to `backend`
infoln "Change directory to /home/backend"
cd /home/backend

# Install NodeJS Server
infoln "Installing NodeJS Dependencies..."
bash nodejs/scripts/install.sh
infoln "Done!"

# Change directory to `backend`
cd /home/backend

# Install Python
infoln "Installing Python Packages, Tesseract OCR..."
bash python/scripts/install.sh
infoln "Done!"

# Change directory to `backend`
cd /home/backend

# Create `temp` and `uploads` folders
infoln "Create \`temp\` and \`uploads\` folders..."
mkdir temp
mkdir uploads
infoln "Done!"

# Start server
infoln "Booting server..."
bash nodejs/scripts/start.sh
infoln "Done!"
```

Bạn sẽ không cần phải cài đặt các scripts trên trong bài này, vì đã được cài hết ở trong mã nguồn.

Tổng kết, chiến lược triển khai trong ứng dụng sẽ như sau:

![deployment_strategy](/images/2-preparation/deployment_strategy.png)

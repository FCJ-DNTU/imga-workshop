+++
title = "Tự động triển khai"
date = 2024
weight = 6
chapter = false
pre = "2.6. "
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

`backend/nodejs/scripts/install.sh`
```
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

`backend/python/scripts/install.sh`
```
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

Một script nữa dùng để khởi động server `backend/nodejs/scripts/start.sh`
```
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

Cuối cùng là gom vào trong một script duy nhất `backend/install.sh`
```
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
+++
title = "Cài đặt Docker và Git"
date = 2024
weight = 2
chapter = false
pre = "3.2. "
+++

#### Cài đặt Docker

Vì để máy EC2 có thể đóng gói được mã nguồn và máy EC2 ở môi trường phát triển có thể triển khai được bản đóng gói đó thành server thì chúng ta cần phải tải Docker ở cả trên 2 máy EC2.

Đầu tiên, chúng ta phải kết nối SSH vào trong máy EC2 của môi trường phát triển và tiến hành cài đặt Docker như lệnh bên dưới

```bash
sudo yum install -y docker
```

![3-setup-project](/images/3-setup-project/3-2-1-install-docker-in-dev-ec2.png)

Sau khi tải xong thì chúng ta sẽ bắt đầu dịch vụ của Docker trên linux

```bash
sudo service docker start
```

Thêm người dùng linux hiện tại vào trong docker group để người dùng này có thể thao tác được với docker và kiểm tra xem người dùng hiện tại có thể dùng được docker hay chưa

```bash
# Create group if it doesn't exist
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
docker ps
```

![3-setup-project](/images/3-setup-project/3-2-2-start-docker-service-in-dev-ec2.png)

Thứ hai, chúng ta sẽ kết nối SSH tới máy EC2 trong môi trường máy chủ và cài Docker giống như với các bước trên

![3-setup-project](/images/3-setup-project/3-2-3-install-docker-in-prod-ec2.png)
![3-setup-project](/images/3-setup-project/3-2-4-start-docker-service-in-prod-ec2.png)

#### Cài đặt Git

Để có thể tải bản sao của dự án mà chúng ta vừa mới sao chép ở bước trước về trên máy EC2 ở trong môi trường phát triển, thì chúng ta phải cài Git ở trên máy EC2 đó.

```bash
sudo yum install -y git-all
```

![3-setup-project](/images/3-setup-project/3-2-5-install-git-in-dev-ec2.png)

Vào trong repository của dự án trên github, lấy đường dẫn để có thể tải được mã nguồn

![3-setup-project](/images/3-setup-project/3-2-6-copy-folked-repo-uri.png)

```bash
git clone https://github.com/{your-user-name}/imga
```

![3-setup-project](/images/3-setup-project/3-2-7-clone-repo-to-dev-ec2.png)

Vậy là xong, chúng ta đã có

- Docker và Git ở trong EC2 ở môi trường phát triển (dùng để quản lý mã nguồn, đóng gói mã nguồn và đẩy docker image lên trên ECR)
- Docker ở trong EC2 ở trong môi trường sản phẩm (dùng để lấy docker image từ ECR và triển khai server)

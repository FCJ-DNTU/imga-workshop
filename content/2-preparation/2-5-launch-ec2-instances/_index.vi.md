+++
title = "Khởi động 2 máy EC2"
date = 2024
weight = 5
chapter = false
pre = "2.5. "
+++

#### Tạo và khởi động máy EC2 trong môi trường phát triển

Ở trang chủ

- Tìm `EC2`
- Chọn **EC2**

![2-image](/images/2-preparation/2-5-1-search-ec2.png)

Trong trang của của EC2, chúng ta ấn **Launch instance**

![2-image](/images/2-preparation/2-5-2-setup-to-launch-dev-ec2.png)

Trong phần cài đặt, chúng ta sẽ thiết lập các thông tin như trong hình

- Name: `dev-ec2`
- Application and OS Images: **Amazon Linux 2023 AMI**
- Instance type: **t2.micro**
- Chọn một key-pair nếu như chúng ta đã có các key-pair. Nếu không thì tạo như sau:
  - Chọn **Create new key pair**
  - **Name**: `my-key`
  - **Type**: `RSA`
  - **Private key file**: `.pem`
  - Chọn **Create key pair**

![2-image](/images/2-preparation/2-5-3-setup-dev-ec2-info-1.png)
![2-image](/images/2-preparation/2-5-4-setup-dev-ec2-info-2.png)

Trong phần Network settings, ấn **Edit**

- VPC: **development-vpc**
- Subnet: chọn public subnet
- Auto-assign public IP: Enable
- Firewall:
  - Chọn **Select existing security group**
  - Chọn SG **dev-ec2-sg** chúng ta tạo hồi nãy
- Cuối cùng là **Launch instance**

![2-image](/images/2-preparation/2-5-5-setup-and-launch-dev-ec2.png)

#### Tạo và khởi động máy EC2 trong môi trường sản phẩm

Trong phần cài đặt, chúng ta sẽ thiết lập các thông tin như trong hình

- Name: `imga-server`
- Application and OS Images: **Amazon Linux 2023 AMI**
- Instance type: **t3.small**
- Chọn một key-pair nếu như chúng ta đã có các key-pair. Nếu không thì tạo như sau:
  - Chọn **Create new key pair**
  - **Name**: `my-key`
  - **Type**: `RSA`
  - **Private key file**: `.pem`
  - Chọn **Create key pair**

![2-image](/images/2-preparation/2-5-6-setup-to-launch-imga-server.png)
![2-image](/images/2-preparation/2-5-7-setup-imga-server-info-1.png)

Trong phần Network settings, ấn **Edit**

- VPC: **production-vpc**
- Subnet: chọn private subnet
- Auto-assign public IP: Disable
- Firewall:
  - Chọn **Select existing security group**
  - Chọn SG **prod-ec2-sg** chúng ta tạo hồi nãy
- Cuối cùng là **Launch instance**

![2-image](/images/2-preparation/2-5-8-setup-and-launch-imga-server.png)

Cuối cùng là chúng ta sẽ kiểm tra xem 2 EC2 được tạo đã chạy hay chưa.

![2-image](/images/2-preparation/2-5-9-check.png)

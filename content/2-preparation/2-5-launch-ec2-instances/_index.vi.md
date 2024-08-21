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

**INSERT IMAGE HERE**

Trong trang của của EC2, chúng ta ấn **Launch instance**

**INSERT IMAGE HERE**

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

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Trong phần Network settings, ấn **Edit**
  - VPC: **development-vpc**
  - Subnet: chọn public subnet
  - Auto-assign public IP: Enable
  - Firewall:
    - Chọn **Select existing security group**
    - Chọn SG **dev-ec2-sg** chúng ta tạo hồi nãy
  - Cuối cùng là **Launch instance**

**INSERT IMAGE HERE**

#### Tạo và khởi động máy EC2 trong môi trường sản phẩm
Trong phần cài đặt, chúng ta sẽ thiết lập các thông tin như trong hình
  - Name: `prod-ec2`
  - Application and OS Images: **Amazon Linux 2023 AMI**
  - Instance type: **t3.small**
  - Chọn một key-pair nếu như chúng ta đã có các key-pair. Nếu không thì tạo như sau:
    - Chọn **Create new key pair**
    - **Name**: `my-key`
    - **Type**: `RSA`
    - **Private key file**: `.pem`
    - Chọn **Create key pair**

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Trong phần Network settings, ấn **Edit**
  - VPC: **production-vpc**
  - Subnet: chọn private subnet
  - Auto-assign public IP: Disable
  - Firewall:
    - Chọn **Select existing security group**
    - Chọn SG **prod-ec2-sg** chúng ta tạo hồi nãy
  - Cuối cùng là **Launch instance**

**INSERT IMAGE HERE**

Cuối cùng là chúng ta sẽ kiểm tra xem 2 EC2 được tạo đã chạy hay chưa.

**INSERT IMAGE HERE**

#### Thử kết nối
Theo lý thuyết, với những gì mà từ nãy giờ chúng ta cấu hình, thì EC2 trong môi trường phát triển sẽ có thể kết nối SSH được tới EC2 trong môi trường sản phẩm, giờ thì chúng ta sẽ kiểm tra thử.

Đầu tiên
  - Chọn **dev-ec2**
  - Sao chép public IPv4

**INSERT IMAGE HERE**

Mở phần mềm MobaXterm hoặc VSCode, trong bài này thì chúng ta dùng MobaXterm
  - Mở một phiên kết nối mới
  - Với một số thông
    - Remote host: public IPv4
    - Specify username: `ec2-user`
    - Trong **Advanced SSH settings**, tích vào **Use private key**, chọn key-pair mà chúng ta đã tải ở bước trước.
  - Ấn **Ok**

**INSERT IMAGE HERE**

Tiếp theo là chúng ta sẽ tải tệp `.pem` lên trên EC2 với MobaXterm để có thể kết nối SSH tới EC2 trong môi trường sản phẩm (2 EC2 trong bài này chúng ta dùng cung key-pair).

Trong giao diện của Instances
  - Chọn `prod-ec2`
  - Sao chép địa chỉ IPv4 nội bộ của EC2 này

**INSERT IMAGE HERE**

Nhập lệnh bên dưới vào trong command line

```
chmod 400 <your-key>.pem
ssh -i <your-key>.pem ec2-user@<private ipv4>
```

Và chúng ta nhận được kết quả

**INSERT IMAGE HERE**

Như vậy thì các bước thiết lập trên chung ta đã làm đúng. Trong phần tiếp theo, chúng ta sẽ tìm hiểu thêm cách mà hệ thống của chúng ta được triển khai như thế nào.
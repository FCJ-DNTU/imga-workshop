+++
title = "Thiết lập security groups"
date = 2024
weight = 3
chapter = false
pre = "2.3. "
+++

#### Thiết lập bảo mật

Tiếp theo, chúng ta sẽ cần phải bảo mật hơn cho các EC2 ở trong hai môi trường. Đầu tiên là tạo security groups cho EC2 trong môi trường phát triển.

- Trong phần `Security` của giao diện của **VPC**
- Chọn **Security groups**
- Ấn **Create security group**

**INSERT IMAGE HERE**

chúng ta sẽ nhập các thông số cho security group của EC2 trong môi trường phát triển như sau

- Name: `dev-ec2-s`
- Description: `Allow SSH and other private connection`
- VPC: chọn `development-vpc`
- Trong bài này, thì chúng ta sẽ giới hạn lại kết nối SSH tới EC2 trong môi trường phát triển, ở trong Inbound Rules, thêm rule:
  - Type: **SSH**
  - Source: **My IP**

**INSERT IMAGE HERE**

Tiếp theo là security group cho EC2 trong môi trường sản phẩm

- Name: `prod-ec2-s`
- Description: `Allow SSH and other private connection`
- VPC: chọn `production-vpc`
- Hiện tại thì chỉ cho phép SSH tới từ các thiết bị trong vùng mạng `10.1.0.0/16` (là vùng mạng **development-vpc**):
  - Type: **SSH**
  - Source: **My IP**

**INSERT IMAGE HERE**

Sau khi tạo xong thì chúng ta đã có được 2 SG mong muốn

**INSERT IMAGE HERE**

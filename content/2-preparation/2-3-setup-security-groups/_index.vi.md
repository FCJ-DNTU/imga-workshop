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

![2-image](/images/2-preparation/2-3-1-sg-page.png)

chúng ta sẽ nhập các thông số cho security group của EC2 trong môi trường phát triển như sau

- Name: `dev-ec2-sg`
- Description: `Allow SSH and other private connection`
- VPC: chọn `development-vpc`
- Trong bài này, thì chúng ta sẽ giới hạn lại kết nối SSH tới EC2 trong môi trường phát triển, ở trong Inbound Rules, thêm rule:
  - Type: **SSH**
  - Source: **My IP**

![2-image](/images/2-preparation/2-3-2-edit-dev-ec2-inbound-rule.png)

Tiếp theo là security group cho EC2 trong môi trường sản phẩm

- Name: `prod-ec2-sg`
- Description: `Allow SSH and other private connection`
- VPC: chọn `production-vpc`
- Inbound rules:
  - Protocol: **SSH**; Port range: **22**; Source: `10.1.0.0/16` (Dev VCP)
  - Protocol: **TCP**; Port range: **80**; Source: Anywhere IPv4 (0.0.0.0/0). Source nên là từ SG `imga-nlb-sg` ở dưới

![2-image](/images/2-preparation/2-3-3-edit-prod-ec2-inbound-rule.png)

{{% notice note %}}
Ở trong ảnh mình quên thêm Inbound Rule thứ hai :D
{{% /notice %}}

Sau khi tạo xong thì chúng ta đã có được 2 SG mong muốn

Cuối cùng là thiết lập SG cho Load Balancer và một số tài nguyên khác

- Name: `imga-nlb`
- Description: `Allow traffic from API Gateway and prod EC2`
- VPC: chọn `production-vpc`
- Inbound rules:
  - Protocol: **TCP**; Port range: **80**; Source: **Anywhere IPv4** (0.0.0.0/0)
  - Protocol: **ALL**; Port range: **ALL**; Source: `prod-ec2-sg`

![2-image](/images/2-preparation/2-3-4-edit-nlb-inbound-rule.png)

Kiểm tra lại
![2-image](/images/2-preparation/2-3-5-check-sgs.png)

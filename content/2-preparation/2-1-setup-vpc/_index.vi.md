+++
title = "Thiết lập VPC"
date = 2024
weight = 1
chapter = false
pre = "2.1. "
+++

#### Thiết lập VPC cho môi trường sản phẩm

Trong phần này, chúng ta sẽ cấu hình VPC nhanh cho hạ tầng của bài workshop này với thiết lập tự động VPC.

- Tìm `VPC`
- Chọn **VPC**
- Trong trang chủ của **VPC**, ấn **Create VPC**.

![2-image](/images/2-preparation/2-1-1-vpc-page.png)

Trong phần **VPC Settings**:

- Resources to create: **VPC and more**
- Name (auto-generation): production
- IPv4 CIDR Block: `10.0.0.0/16`, không có CIDR Block cho IPv6
- Tenancy: **Default**

![2-image](/images/2-preparation/2-1-2-create-prod-vpc.png)

Tiếp theo:

- Number of AZs: 2
- First AZ: ap-southeast-1a
- Second AZ: ap-southeast-1b
- Number of public subnets: 2
- Number of private subnets: 2
- NAT Gateway: None, chúng ta sẽ cài đặt sau
- VPC Endpoints: S3 Gateway

{{% notice note %}}
Trên thực tế, mình nên cấu hình thủ công để có thể có được các tài nguyên theo ý mình. Trong hạ tầng của bài này, thì môi trường sản phẩm chỉ có 2 subnets là private và public; còn môi trường phát triển chỉ có 1 public subnet.
{{% /notice %}}

![2-image](/images/2-preparation/2-1-3-create-prod-vpc.png)

Và chúng ta sẽ chọn **Enable DNS hostname** và **Enable DNS resolution** để EC2 trong private subnet có thể tải nội dung từ ngoài internet.

![2-image](/images/2-preparation/2-1-4-setup-prod-vpc-dns.png)

Chờ cho VPC được cài đặt

![2-image](/images/2-preparation/2-1-5-creating-prod-vpc.png)

#### Thiết lập VPC cho môi trường phát triển

Tương tự với VPC cho môi trường sản phẩm, giờ chúng ta sẽ tạo tự động VPC cho môi trường phát triển. Ở đây các bạn xem các cấu hình bên trong ảnh theo từng bước.

![2-image](/images/2-preparation/2-1-6-create-dev-vpc.png)
![2-image](/images/2-preparation/2-1-7-setup-dev-vpc-dns.png)

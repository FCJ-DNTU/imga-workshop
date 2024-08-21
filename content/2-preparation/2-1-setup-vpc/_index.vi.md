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

**INSERT IMAGE HERE**

Trong phần **VPC Settings**:
  - Resources to create: **VPC and more**
  - Name (auto-generation): production
  - IPv4 CIDR Block: `10.0.0.0/16`, không có CIDR Block cho IPv6
  - Tenancy: **Default**

**INSERT IMAGE HERE**

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

**INSERT IMAGE HERE**

Và chúng ta sẽ chọn **Enable DNS hostname** và **Enable DNS resolution** để EC2 trong private subnet có thể tải nội dung từ ngoài internet.

**INSERT IMAGE HERE**

Chờ cho VPC được cài đặt

**INSERT IMAGE HERE**

#### Thiết lập VPC cho môi trường phát triển
Tương tự với VPC cho môi trường sản phẩm, giờ chúng ta sẽ tạo tự động VPC cho môi trường phát triển. Ở đây các bạn xem các cấu hình bên trong ảnh theo từng bước.

**INSERT IMAGE HERE**

**INSERT IMAGE HERE**
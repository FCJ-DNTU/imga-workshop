+++
title = "Dọn dẹp tài nguyên"
date = 2024
weight = 8
chapter = false
pre = "8. "
+++

Khi làm bài này xong thì chúng ta phải dọn dẹp hết các tài nguyên. Để không mà không làm gì thì sẽ bị tính phí.

#### Xoá distribution

Truy vập vào danh sách distribution, chọn vào distribution mà chúng ta đã tạo, ấn **Delete**

**INSERT IMAGE HERE**

#### Xoá API Gateway và VPC Link

Tiếp theo, trong danh sách APIs của **API Gateway**, chọn `imga-api`, ấn **Delete**

**INSERT IMAGE HERE**

Vào trong **VPC links**, chọn VPC link mà chúng ta tạo lúc này, ấn **Delete**

**INSERT IMAGE HERE**

#### Xoá Network Load Balancer và Target Group

Trong giao diện EC2, kéo xuống **Load balancer**, chọn NLB mà lúc nãy chúng ta tạo

- Xổ **Actions**
- Chọn **Delete load balancer**

**INSERT IMAGE HERE**

Tiếp theo, trong danh sách target groups, chọn `prod-ec2`

- Xổ **Actions**
- Chọn **Delete**

**INSERT IMAGE HERE**

#### Xoá EC2 Instances

Cũng trong giao diện EC2, vào trong danh sách EC2. Chúng ta sẽ huỷ cả 2 EC2 mà chúng ta đã tạo.

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Xoá NAT Gateway và Elastic IP

Trong mục NAT Gateway, chọn NAT Gateway mà chúng ta đã tạo

- Xổ **Actions**
- Chọn **Delete NAT gateway**

**INSERT IMAGE HERE**

Chờ cho NAT Gateway hoàn toàn được xoá, thì tiếp theo vào trong danh sách Elastic IP, chọn Elastic IP được tạo với NAT Gateway

- Xổ **Actions**
- Chọn **Release Elastic IP address**

**INSERT IMAGE HERE**

{{% notice note %}}
VPC Link có tạo ENI, và vì ENI nên nó cũng dùng Elastic IP. Nhưng vì chúng ta đã xoá VPC Link nên Elastic IP cũng đã bị xoá.
{{% notice %}}

#### Xoá VPC Peering và các tài nguyên VPC

Trong danh sách peering connection trong giao diện VPC, chọn kết nối ngang cấp mà từ đầu chúng ta đã tạo

- Xổ **Actions**
- Chọn **Delete peering connection**

**INSERT IMAGE HERE**

Tiếp theo, trong danh sách VPC, chúng ta sẽ xoá 2 VPCs ban đầu đã tạo

- Xổ **Actions**
- Chọn **Delete VPC**

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Xoá repository trên ECR

Trong giao diện của ECR, vào trong repository mà chúng ta đã tạo để xoá docker image trước. Chọn image, ấn **Delete**

**INSERT IMAGE HERE**

Giờ chúng ta có thể xoá được repository

**INSERT IMAGE HERE**

#### Xoá S3 Buckets

Trong danh sách của S3 Bucket, chúng ta sẽ xoá đi các Buckets đã tạo. Đầu tiên là S3 Bucket cho website.

- Chọn **Empty**

**INSERT IMAGE HERE**

Xác nhận muốn xoá các objects trong bucket

**INSERT IMAGE HERE**

Chọn lại bucket, ấn Delete

**INSERT IMAGE HERE**

Xác nhận xoá

**INSERT IMAGE HERE**

Tương tự, xoá bucket còn lại chúng ta sẽ làm các bước y hệt. Như vậy, chúng ta đã dọn dẹp được tài nguyên trong bài workshop này.

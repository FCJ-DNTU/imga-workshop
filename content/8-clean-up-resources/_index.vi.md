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

![8-clean-up-resources](/images/8-clean-up-resources/8-1-delete-distribution.png)

#### Xoá API Gateway và VPC Link

Tiếp theo, trong danh sách APIs của **API Gateway**, chọn `imga-api`, ấn **Delete**

![8-clean-up-resources](/images/8-clean-up-resources/8-2-delete-api-gw.png)

Vào trong **VPC links**, chọn VPC link mà chúng ta tạo lúc này, ấn **Delete**

![8-clean-up-resources](/images/8-clean-up-resources/8-3-delete-vpc-link.png)

#### Xoá Network Load Balancer và Target Group

Trong giao diện EC2, kéo xuống **Load balancer**, chọn NLB mà lúc nãy chúng ta tạo

- Xổ **Actions**
- Chọn **Delete load balancer**

![8-clean-up-resources](/images/8-clean-up-resources/8-4-delete-nlb.png)

Tiếp theo, trong danh sách target groups, chọn `prod-ec2`

- Xổ **Actions**
- Chọn **Delete**

![8-clean-up-resources](/images/8-clean-up-resources/8-5-delete-target-group.png)

#### Xoá EC2 Instances

Cũng trong giao diện EC2, vào trong danh sách EC2. Chúng ta sẽ huỷ cả 2 EC2 mà chúng ta đã tạo.

![8-clean-up-resources](/images/8-clean-up-resources/8-6-delete-ec2.png)
![8-clean-up-resources](/images/8-clean-up-resources/8-7-delete-imga-server.png)

#### Xoá NAT Gateway và Elastic IP

Trong mục NAT Gateway, chọn NAT Gateway mà chúng ta đã tạo

- Xổ **Actions**
- Chọn **Delete NAT gateway**

![8-clean-up-resources](/images/8-clean-up-resources/8-8-delete-nat-gw.png)

Chờ cho NAT Gateway hoàn toàn được xoá, thì tiếp theo vào trong danh sách Elastic IP, chọn Elastic IP được tạo với NAT Gateway

- Xổ **Actions**
- Chọn **Release Elastic IP address**

![8-clean-up-resources](/images/8-clean-up-resources/8-9-delete-elastic-ip.png)

{{% notice note %}}
VPC Link có tạo ENI, và vì ENI nên nó cũng dùng Elastic IP. Nhưng vì chúng ta đã xoá VPC Link nên Elastic IP cũng đã bị xoá.
{{% /notice %}}

#### Xoá VPC Peering và các tài nguyên VPC

Trong danh sách peering connection trong giao diện VPC, chọn kết nối ngang cấp mà từ đầu chúng ta đã tạo

- Xổ **Actions**
- Chọn **Delete peering connection**

![8-clean-up-resources](/images/8-clean-up-resources/8-10-delete-vpc-peering.png)

Tiếp theo, trong danh sách VPC, chúng ta sẽ xoá 2 VPCs ban đầu đã tạo

- Xổ **Actions**
- Chọn **Delete VPC**

![8-clean-up-resources](/images/8-clean-up-resources/8-11-delete-vpc.png)
![8-clean-up-resources](/images/8-clean-up-resources/8-12-delete-vpc.png)

#### Xoá repository trên ECR

Trong giao diện của ECR, vào trong repository mà chúng ta đã tạo để xoá docker image trước. Chọn image, ấn **Delete**

![8-clean-up-resources](/images/8-clean-up-resources/8-13-delete-image.png)

Giờ chúng ta có thể xoá được repository

![8-clean-up-resources](/images/8-clean-up-resources/8-14-delete-repository.png)

#### Xoá S3 Buckets

Trong danh sách của S3 Bucket, chúng ta sẽ xoá đi các Buckets đã tạo. Đầu tiên là S3 Bucket cho website.

- Chọn **Empty**

![8-clean-up-resources](/images/8-clean-up-resources/8-15-empty-bucket.png)

Xác nhận muốn xoá các objects trong bucket

![8-clean-up-resources](/images/8-clean-up-resources/8-16-confirm-empty-bucket.png)

Chọn lại bucket, ấn Delete

![8-clean-up-resources](/images/8-clean-up-resources/8-17-delete-bucket.png)

Xác nhận xoá

![8-clean-up-resources](/images/8-clean-up-resources/8-18-confirm-delete-bucket.png)

Tương tự, xoá bucket còn lại chúng ta sẽ làm các bước y hệt. Như vậy, chúng ta đã dọn dẹp được tài nguyên trong bài workshop này.

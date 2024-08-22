+++
title = "Tạo Network Load Balancer"
date = 2024
weight = 1
chapter = false
pre = "5.1. "
+++

#### Tạo NLB

Trong giao diện của **EC2**, tìm mục **Load Balancer**

- Ấn **Create load balancer**

**INSERT IMAGE HERE**

Trong này, chúng ta sẽ chọn Network Load Balancer

**INSERT IMAGE HERE**

Và một số thông tin như sau:

- Name: `imga-nlb`
- Scheme: **Internal**
- Load balancer IP address type: **IPv4**

**INSERT IMAGE HERE**

Trong phần Network mapping

- VPC: chọn `production-vpc`
- Availability Zones: **app-southeast-1a**
  - Subnet: chọn private subnet
  - IPv4 Address: chọn **Assigned from CIDR 10.0.128.0/20**

**INSERT IMAGE HERE**

Với Security groups, chúng ta sẽ chọn SG mà chúng ta đã tạo ở các bước trước. Và dưới đó có phần **Listeners and routing**, Load Balancer cần phải biết được là nó sẽ chuyển tiếp gói tin đến đâu thông qua Target Group.

Giờ chúng ta sẽ tạo một Target Group mới

- Protocol: TCP
- Port: 80

Ấn vào link **Create target group**, chúng ta sẽ vào giao diện tạo target group

- Choose a target type: Instances
- Name: prod-ec2

**INSERT IMAGE HERE**

- Protocol: TCP
- Port: 80
- IP address type: IPv4
- VPC: **production-vpc**
- Health checks: cấu hình giống trong hình

**INSERT IMAGE HERE**

Tiếp theo, chúng ta sẽ ấn **Next**, lúc này, chúng ta cần thêm EC2 trong môi trường sản phẩm vào trong target group mới tạo

- Chọn **imga-server** EC2
- Ấn **Include as pending below**
- Ấn **Create target group**

**INSERT IMAGE HERE**

Đã tạo target group và thêm target thành công

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Xác nhận lại các thông số mà chúng ta đã cấu hình. Khi xác nhận xong thì ấn **Create load balancer**

**INSERT IMAGE HERE**

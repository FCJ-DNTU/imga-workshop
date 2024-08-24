+++
title = "Thiết lập NAT Gateway"
date = 2024
weight = 7
chapter = false
pre = "2.7. "
+++

Để có EC2 trong môi trường sản phẩm có thể tải được các gói cài đặt, thư viện, phần mềm và cả docker image được đặt ở trong ECR thì VPC của môi trường sản phẩm buộc phải có NAT Gateway, thì các EC2 ở trong vùng mạng đó mới có thể đi ra ngoài internet và tải được những gì cần thiết thông qua NAT Gateway.

#### Thiết lập NAT Gateway

Trong giao diện của VPC

- Chọn **NAT gateways**
- Ấn **Create NAT gateway**

![2-image](/images/2-preparation/2-7-1-nat-gw-page.png)

Chúng ta sẽ thiết lập VPC có các thông tin như sau

- Name: `nat-gw`
- Subnet: chọn public subnet đã cài trước đó
- Connectivity type: **Public**
- Elastic IP allocation ID: ấn **Allocate Elastic IP** để tạo nhanh
- Ấn **Create NAT gateway**

![2-image](/images/2-preparation/2-7-2-setup-nat-gw.png)

Giờ chúng ta sẽ thêm một route mới trong bản định tuyến mà được kết nối với private subnet mà có EC2 đặt ở trong, route này sẽ đi tới NAT Gateway.

- Chọn private subnet
- Thêm route có thông tin
  - Destination: `0.0.0.0/0`
  - Target: **NAT Gateway** mình mới tạo
- Lưu thay đổi

![2-image](/images/2-preparation/2-7-3-edit-prod-private-rtb.png)
![2-image](/images/2-preparation/2-7-4-add-route-to-prod-private-rtb.png)

Giờ thì private subnet này đã có thể đi ra ngoài internet thông qua NAT Gateway và Internet Gateway. Chúng ta có thể kiểm tra với tab **Resource map** trong mục **Your VPCs**.

![2-image](/images/2-preparation/2-7-5-check-resource-map.png)

#### Kiểm tra kết nối

Theo lý thuyết, với những gì mà từ nãy giờ chúng ta cấu hình, thì EC2 trong môi trường phát triển sẽ có thể kết nối SSH được tới EC2 trong môi trường sản phẩm, giờ thì chúng ta sẽ kiểm tra thử.

Đầu tiên

- Chọn **dev-ec2**
- Sao chép public IPv4

![2-image](/images/2-preparation/2-7-6-copy-dev-ec2-public-ip.png)

Mở phần mềm MobaXterm hoặc VSCode, trong bài này thì chúng ta dùng MobaXterm

- Mở một phiên kết nối mới
- Với một số thông
  - Remote host: public IPv4
  - Specify username: `ec2-user`
  - Trong **Advanced SSH settings**, tích vào **Use private key**, chọn key-pair mà chúng ta đã tải ở bước trước.
- Ấn **Ok**

![2-image](/images/2-preparation/2-7-7-setup-in-mobaxterm.png)
![2-image](/images/2-preparation/2-7-8-connection-result.png)

Tiếp theo là chúng ta sẽ tải tệp `.pem` lên trên EC2 với MobaXterm để có thể kết nối SSH tới EC2 trong môi trường sản phẩm (2 EC2 trong bài này chúng ta dùng cung key-pair).

Trong giao diện của Instances

- Chọn `imga-server`
- Sao chép địa chỉ IPv4 nội bộ của EC2 này

![2-image](/images/2-preparation/2-7-9-upload-key.png)
![2-image](/images/2-preparation/2-7-10-upload-key.png)
![2-image](/images/2-preparation/2-7-11-copy-prod-ec2-private-ip.png)

Nhập lệnh bên dưới vào trong command line

```bash
chmod 400 <your-key>.pem
ssh -i <your-key>.pem ec2-user@<private ipv4>
```

![2-image](/images/2-preparation/2-7-12-connect-to-private-ec2.png)

Và chúng ta nhận được kết quả

![2-image](/images/2-preparation/2-7-13-ping-from-private-ec2-to-amazon.png)

Như vậy thì các bước thiết lập trên chung ta đã làm đúng. Trong phần tiếp theo, chúng ta sẽ tìm hiểu thêm cách mà hệ thống của chúng ta được triển khai như thế nào.

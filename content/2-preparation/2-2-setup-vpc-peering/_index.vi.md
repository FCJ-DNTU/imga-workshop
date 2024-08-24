+++
title = "Thiết lập VPC Peering"
date = 2024
weight = 2
chapter = false
pre = "2.2. "
+++

#### Kết nối hai vùng mạng khác nhau

Trong bài này, chúng ta sẽ dùng EC2 ở trong môi trường phát triển để điểu khiển EC2 ở trong môi trường sản phẩm để thực hiện công việc triển khai máy chủ cho ứng dụng. Vì thế mà mình cần phải tạo một kết nối ngang cấp để cho các thiết bị trong 2 VPC có thể giao tiếp với nhau.

Trong giao diện VPC:

- Chọn **Peering connection**
- Ấn **Create peering connection**

![2-image](/images/2-preparation/2-2-1-vpc-peering-page.png)

Trong phần cài đặt:

- Tên: `dev-prod-peering`
- Trong **Select a local VPC to peer with**, chọn **production-vpc**
- Trong **Select another VPC to peer with**, chọn
  - Account: **My Account**
  - Region: **This Region** (ap-southeast-1)
- Trong **VPC ID (Accepter)**, chọn **development-vpc**

![2-image](/images/2-preparation/2-2-2-create-vpc-peering.png)

Sau khi tạo xong, thì chúng ta phải chấp nhận việc kết nối ngang cấp mới được thiết lập

![2-image](/images/2-preparation/2-2-3-accept-peering.png)

#### Cài đặt bảng định tuyến trong 2 VPC

Tới đây, thì 2 VPC đã có một "đường" kết nối ngang cấp với nhau, nhưng để mà các thiết bị trong 2 môi trường này có thể thật sự giao tiếp được với nhau, thì sẽ cần phải cấu hình bảng định tuyến cho các bản định tuyến được tạo ở trong các bước trước.

Giờ thì mình trờ lại mục **Route tables**

- Chọn **development-rtb-public**
- Ở phần giao diện bên dưới, chọn tab **Routes**
- Ấn **Edit routes**

![2-image](/images/2-preparation/2-2-4-rtb-page-dev.png)

Khối IPv4 CIDR của môi trường phát triển là `10.1.0.0/16`, còn môi trường sản phẩm là `10.0.0.0/16`, để có thể giao tiếp được, thì mình sẽ cần phải thêm khối IPv4 CIDR của môi trường sản phẩm, với target là **Peering Connection** mà mình tạo hồi nãy.

![2-image](/images/2-preparation/2-2-5-edit-dev-rtb.png)

Tiếp theo:

- Chọn **production-rtb-public**
- Ở phần giao diện bên dưới, chọn tab **Routes**
- Ấn **Edit routes**

Ở đây tương tự với ở trên, nhưng mình sẽ làm ngược lại.

![2-image](/images/2-preparation/2-2-6-rtb-page-prod.png)
![2-image](/images/2-preparation/2-2-7-edit-prod-rtb.png)

Khi mà mình thiết lập xong, thì EC2 ở trong public subnet của môi trường phát triển sẽ có thể giao tiếp được với EC2 ở trong private subnet của môi trường phát triển. Tuy nhiên, EC2 của môi trường phát triển không thể giao tiếp chủ động với EC2 trong môi trường phát triển được.

+++
title = "Gán IAM Roles và thiết lập cài đặt Metadata cho các EC2"
date = 2024
weight = 6
chapter = false
pre = "2.6. "
+++

Giờ thì chúng ta sẽ sử dụng các IAM Roles mà lúc nãy chúng ta đã tạo để gán cho 2 máy EC2

#### Cấu hình Role và phương thức lấy Metadata cho DevEC2

Vào trong màn hinh quản lý của EC2, truy cập vào danh sách EC2.

- Chọn EC2 cần gán `dev-ec2`

![2-image](/images/2-preparation/2-6-1-attach-iam-role-to-dev-ec2.png)

- Xổ thanh lựa chọn và chọn đúng role mà chúng ta đã đặt tên ở lúc trước `DevEC2`
- Ấn **Update IAM role** để xác nhận.

![2-image](/images/2-preparation/2-6-2-select-iam-role-for-dev-ec2.png)

Tiếp theo, vẫn là EC2 này, chúng ta sẽ điều chỉnh lựa chọn để lấy metadata của EC2

![2-image](/images/2-preparation/2-6-3-setup-metadata-for-dev-ec2.png)

- Instance metadata service: Enable (thường thì nó được mặc định là bật)
- IMDSv2: đổi thành **Optional**

![2-image](/images/2-preparation/2-6-4-setup-metadata-for-dev-ec2.png)

#### Gán IAM Role cho Prod EC2

Tương tự, chúng ta sẽ làm ở trên EC2 `imga-server`

- Chọn `imga-server`

![2-image](/images/2-preparation/2-6-5-attach-iam-role-for-prod-ec2.png)

- Xổ thanh lựa chọn và chọn đúng role mà chúng ta đã đặt tên ở lúc trước `ProdEC2`
- Ấn **Update IAM role** để xác nhận.

![2-image](/images/2-preparation/2-6-6-select-iam-role-for-prod-ec2.png)

Tiếp theo, chúng ta sẽ điều chỉnh lựa chọn để lấy metadata của EC2

![2-image](/images/2-preparation/2-6-7-setup-metadata-for-prod-ec2.png)

Bước còn lại cũng giống y hệt với `dev-ec2`. Tới đây thì chúng ta có thể đảm bảo được là các máy EC2 đã có thể làm việc với nhau và sử dụng các dịch vụ cần thiết ổn định.

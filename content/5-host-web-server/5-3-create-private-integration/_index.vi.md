+++
title = "Tạo private integration với VPC Link"
date = 2024
weight = 3
chapter = false
pre = "5.3. "
+++

#### Tạo VPC Link

Trong bước này, chọn **VPC Link** ở bên thanh mục lục bên trái. Ấn **Create** để tạo mới

**INSERT IMAGE HERE**

VPC này sẽ có một số thông tin như

- Choose a VPC link version: chọn **VPC link for HTTP APIs**
- Name: `private-nlb`
- VPC: **production-vpc**

**INSERT IMAGE HERE**

Tiếp theo

- Subnet: chọn subnet mà NLB nằm ở trong đó.
- Security group: chọn `imga-nlb`
- Ấn **Create** để tạo

**INSERT IMAGE HERE**

{{% notice note %}}
Ở đây, chúng ta có thể cấu hình yêu cầu người dùng được gửi tới (hay gói tin) một cách tự do hơn khi có thể được tuỳ chọn các subnet mà yêu cầu đó được gửi tới. Trên thực tế, khi thêm target vào trong target group và cả việc chọn subnet trong VPC Link, thì có nghĩa là hệ thống giúp chúng ta cấu hình định tuyến tới các subnets, targes cho các routers, thiết bị.
{{% /notice %}}

Sau khi tạo xong, chúng ta sẽ phải đợi cho ENI (Elastic Network Interface) được khởi tạo.

**INSERT IMAGE HERE**

{{% notice note %}}
VPC Link phải được khởi tạo ENI xong mới có thể tạo được tích hợp
{{% /notice %}}

#### Tạo Routes

Khi VPC Link khởi tạo ENI xong, thì chúng ta sẽ tiến hành tạo Route

- Chọn mục **Routes**
- Ấn **Create**

**INSERT IMAGE HERE**

Tiếp theo, Route này sẽ có các thông tin như sau

- Method: **ANY**
- Path: `/{proxy+}`

**INSERT IMAGE HERE**

{{% notice note %}}
Để tạo Route, thì chúng ta cần phải biết Method và đường dẫn, tương ứng với tài nguyên mà hệ thống của mình cho phép. Ở trong bài này, chúng ta sẽ cấu hình với Method là Any, nghĩa là chấp nhận mọi phương thức HTTP và Path là /{proxy+} cũng đồng nghĩa với việc chấp nhận mọi đường dẫn ở sau URL cơ sở.
{{% /notice %}}

#### Kết hợp VPC Link và Route

Chọn **Integration**, ấn **Create and attach an integration**

**INSERT IMAGE HERE**

Trong màn hình tạo, chúng ta sẽ điền một số thông tin như bên dưới

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Khi tạo xong, chúng ta sẽ có thông tin của integration như thế này

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Thiết lập CORS (Cross-origin Resource Sharing)

Để ứng dụng web có thể gửi yêu cầu được tới API Gateway, thì chúng ta cần phải thiết lập CORS

- Trong giao diện của **imga-api**, ở mục bên trái, chọn **CORS** trong **Develop**
- Ấn **Configure** để bắt đầu cấu hình

**INSERT IMAGE HERE**

Ở đây chúng ta cần sẽ cấu hình 2 thông tin

- Access-Control-Allow-Origin: \*
- Access-Control-Allow-Methods: \*

Và lưu thay đổi

**INSERT IMAGE HERE**

{{% notice note %}}
Thông số **Access-Control-Allow-Origin** sẽ là **\*** để cấu hình nhanh, khi các bạn làm bài này, thì sau khi triển khai ứng dụng web với CloudFront xong thì về đây sửa lại thành URL của Distribution.
{{% /notice %}}

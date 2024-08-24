+++
title = "Tạo private integration với VPC Link"
date = 2024
weight = 3
chapter = false
pre = "5.3. "
+++

#### Tạo VPC Link

Trong bước này, chọn **VPC Link** ở bên thanh mục lục bên trái. Ấn **Create** để tạo mới

![5-host-web-server](/images/5-host-web-server/5-3-1-vpc-link-page.png)

VPC này sẽ có một số thông tin như

- Choose a VPC link version: chọn **VPC link for HTTP APIs**
- Name: `private-nlb`
- VPC: **production-vpc**

![5-host-web-server](/images/5-host-web-server/5-3-2-setup-vpc-link.png)

Tiếp theo

- Subnet: chọn subnet mà NLB nằm ở trong đó.
- Security group: chọn `imga-nlb`
- Ấn **Create** để tạo

![5-host-web-server](/images/5-host-web-server/5-3-3-setup-and-create-vpc-link.png)

{{% notice note %}}
Ở đây, chúng ta có thể cấu hình yêu cầu người dùng được gửi tới (hay gói tin) một cách tự do hơn khi có thể được tuỳ chọn các subnet mà yêu cầu đó được gửi tới. Trên thực tế, khi thêm target vào trong target group và cả việc chọn subnet trong VPC Link, thì có nghĩa là hệ thống giúp chúng ta cấu hình định tuyến tới các subnets, targes cho các routers, thiết bị.
{{% /notice %}}

Sau khi tạo xong, chúng ta sẽ phải đợi cho ENI (Elastic Network Interface) được khởi tạo.

![5-host-web-server](/images/5-host-web-server/5-3-4-check-result.png)

{{% notice note %}}
VPC Link phải được khởi tạo ENI xong mới có thể tạo được tích hợp
{{% /notice %}}

#### Tạo Routes

Khi VPC Link khởi tạo ENI xong, thì chúng ta sẽ tiến hành tạo Route

- Chọn mục **Routes**
- Ấn **Create**

![5-host-web-server](/images/5-host-web-server/5-3-5-route-page.png)

Tiếp theo, Route này sẽ có các thông tin như sau

- Method: **ANY**
- Path: `/{proxy+}`

![5-host-web-server](/images/5-host-web-server/5-3-6-setup-route.png)

{{% notice note %}}
Để tạo Route, thì chúng ta cần phải biết Method và đường dẫn, tương ứng với tài nguyên mà hệ thống của mình cho phép. Ở trong bài này, chúng ta sẽ cấu hình với Method là Any, nghĩa là chấp nhận mọi phương thức HTTP và Path là /{proxy+} cũng đồng nghĩa với việc chấp nhận mọi đường dẫn ở sau URL cơ sở.
{{% /notice %}}

#### Kết hợp VPC Link và Route

Chọn **Integration**, ấn **Create and attach an integration**

![5-host-web-server](/images/5-host-web-server/5-3-7-integration-page.png)

Trong màn hình tạo, chúng ta sẽ điền một số thông tin như bên dưới

![5-host-web-server](/images/5-host-web-server/5-3-8-setup-integration.png)
![5-host-web-server](/images/5-host-web-server/5-3-9-setup-and-create-integration.png)

Khi tạo xong, chúng ta sẽ có thông tin của integration như thế này

![5-host-web-server](/images/5-host-web-server/5-3-10-check-integration.png)
![5-host-web-server](/images/5-host-web-server/5-3-11-check-api.png)

#### Thiết lập CORS (Cross-origin Resource Sharing)

Để ứng dụng web có thể gửi yêu cầu được tới API Gateway, thì chúng ta cần phải thiết lập CORS

- Trong giao diện của **imga-api**, ở mục bên trái, chọn **CORS** trong **Develop**
- Ấn **Configure** để bắt đầu cấu hình

![5-host-web-server](/images/5-host-web-server/5-3-12-cors-page.png)

Ở đây chúng ta cần sẽ cấu hình 2 thông tin

- Access-Control-Allow-Origin: \*
- Access-Control-Allow-Methods: \*

Và lưu thay đổi

![5-host-web-server](/images/5-host-web-server/5-3-13-save-cors-setup-change.png)

{{% notice note %}}
Thông số **Access-Control-Allow-Origin** sẽ là **\*** để cấu hình nhanh, khi các bạn làm bài này, thì sau khi triển khai ứng dụng web với CloudFront xong thì về đây sửa lại thành URL của Distribution.
{{% /notice %}}

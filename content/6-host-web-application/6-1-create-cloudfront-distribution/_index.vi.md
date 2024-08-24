+++
title = "Tạo bản phân phối trong CloudFront"
date = 2024
weight = 1
chapter = false
pre = "6.1. "
+++

#### Thiết lập CloudFront

Trong giao diện chính

- Tìm `CloudFront`
- Chọn **CloudFront**

![6-host-web-application](/images/6-host-web-application/6-1-1-search-cloudfront.png)

Chúng ta sẽ thấy giao diện **Distribution**, ấn vào Create distribution

![6-host-web-application](/images/6-host-web-application/6-1-2-distribution-page.png)

Ở đây chúng ta sẽ có một số thông tin

- Origin: là endpoint của S3 Bucket mà đang giữ nội dung của ứng dụng web (trong bài này là `imga-website`)
- Name: sẽ được tự động thêm, hoặc chúng ta cũng có thể đặt một cái tên khác ở đây
- Origin access:
  - Chọn **Legacy access identities**
  - Ấn tạo một OAI mới (Origin Accesss Identity) vì S3 Bucket cần biết principal nào đang truy cập tới tài nguyên bên trong nó, nên ở đây mình sẽ phải tạo OAI, để tí nữa mình sẽ phải cài đặt resource-based policy.
  - Chọn tiếp **Yes, update the bucket policy**

![6-host-web-application](/images/6-host-web-application/6-1-3-setup-distribution.png)

Tiếp theo, chúng ta sẽ để lại các cấu hình này như mặc định

![6-host-web-application](/images/6-host-web-application/6-1-4-setup-distribution.png)

Và các cấu hình này nữa

![6-host-web-application](/images/6-host-web-application/6-1-5-setup-distribution.png)

Ở mục **Web Application Firewall (WAF)**, chúng ta sẽ tắt tính năng tường lửa cho web ở đây, vì trong bài này chúng ta sẽ không dùng tới nó. Ở dưới phần **Settings**

- Price class: chọn Use all edge locations (phân phối tới mọi Edge Location, cho trải nghiệm tốt nhất).
- Default root object: `index.html`
- Các cấu hình còn lại để như mặc định

![6-host-web-application](/images/6-host-web-application/6-1-6-setup-distribution.png)

Sau khi tạo xong thì chúng ta có thể thấy bản phân phối này đang được triển khai lên các Edge Location

![6-host-web-application](/images/6-host-web-application/6-1-7-check-result.png)

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

**INSERT IMAGE HERE**

Chúng ta sẽ thấy giao diện **Distribution**, ấn vào Create distribution

**INSERT IMAGE HERE**

Ở đây chúng ta sẽ có một số thông tin

- Origin: là endpoint của S3 Bucket mà đang giữ nội dung của ứng dụng web (trong bài này là `imga-website`)
- Name: sẽ được tự động thêm, hoặc chúng ta cũng có thể đặt một cái tên khác ở đây
- Origin access:
  - Chọn **Legacy access identities**
  - Ấn tạo một OAI mới (Origin Accesss Identity) vì S3 Bucket cần biết principal nào đang truy cập tới tài nguyên bên trong nó, nên ở đây mình sẽ phải tạo OAI, để tí nữa mình sẽ phải cài đặt resource-based policy.
  - Chọn tiếp **Yes, update the bucket policy**

**INSERT IMAGE HERE**

Tiếp theo, chúng ta sẽ để lại các cấu hình này như mặc định

**INSERT IMAGE HERE**

Và các cấu hình này nữa

**INSERT IMAGE HERE**

Ở mục **Web Application Firewall (WAF)**, chúng ta sẽ tắt tính năng tường lửa cho web ở đây, vì trong bài này chúng ta sẽ không dùng tới nó. Ở dưới phần **Settings**

- Price class: chọn Use all edge locations (phân phối tới mọi Edge Location, cho trải nghiệm tốt nhất).
- Default root object: `index.html`
- Các cấu hình còn lại để như mặc định

**INSERT IMAGE HERE**

Sau khi tạo xong thì chúng ta có thể thấy bản phân phối này đang được triển khai lên các Edge Location

**INSERT IMAGE HERE**

Sang tab **Origins**, mở rộng cột Origin access, chúng ta có thể thấy được chuối cuối cùng sau dấu **/**. Sao chép lại chuỗi đó để dùng sau.

**INSERT IMAGE HERE**

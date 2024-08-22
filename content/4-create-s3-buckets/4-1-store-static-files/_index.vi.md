+++
title = "S3 Bucket lưu trữ các tệp tĩnh"
date = 2024
weight = 1
chapter = false
pre = "4.1. "
+++

Trong bài này, ứng dụng của chúng ta sẽ là ứng dụng web, nên khi người dùng cuối truy cập vào trang web của chúng ta thì trình duyệt của họ sẽ tải các nội dung của ứng dụng web thông qua CloudFront, đó là lý do vì sao mà chúng ta phải cấu hình S3 cho ứng dụng web ở trong bước này để làm **Origin** cho CloudFront.

#### Tạo S3 Bucket

Trong màn hình giao diện chính của console

- Tìm `S3`
- Chọn **S3**
- Ấn **Create bucket**

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

S3 Bucket này sẽ được tạo ở trong Region `ap-southeast-1`, Bucket này sẽ có một số thông tin như sau

- Name: `imga-website`
- Object Ownership: vì là private bucket, nên chúng ta sẽ chọn **ACLs disable**.

**INSERT IMAGE HERE**

- Block Public Access settings for this bucket: tích vào **Block all public access**
- Bucket versioning: Enable (vì chúng ta có thể có nhiều bản cập nhật cho ứng dụng)

**INSERT IMAGE HERE**

- Encryption type: Server-side encryption with Amazon S3 managed keys (SSE-S3) (mặc định)
- Bucket key: Disable

**INSERT IMAGE HERE**

Sau khi tạo xong thì chúng ta có thể xem lại

**INSERT IMAGE HERE**

#### Mở tính năng Static website hosting

Giờ chúng ta sẽ vào bên trong Bucket này, vào trong tab **Properties**

**INSERT IMAGE HERE**

Kéo xuống dưới cùng, tới mục **Static website hosting**, ấn **Edit**

**INSERT IMAGE HERE**

Chúng ta sẽ cấu hình như hình bên dưới

**INSERT IMAGE HERE**

Và xác nhận. Khi mở tính năng này, thì mình có thể thấy ở trong phần **Properties** như sau

**INSERT IMAGE HERE**

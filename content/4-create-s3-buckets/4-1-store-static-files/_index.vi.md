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

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-1-search-s3.png)
![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-2-s3-page.png)

S3 Bucket này sẽ được tạo ở trong Region `ap-southeast-1`, Bucket này sẽ có một số thông tin như sau

- Name: `imga-website`
- Object Ownership: vì là private bucket, nên chúng ta sẽ chọn **ACLs disable**.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-3-setup-s3-bucket-for-website.png)

- Block Public Access settings for this bucket: tích vào **Block all public access**
- Bucket versioning: Enable (vì chúng ta có thể có nhiều bản cập nhật cho ứng dụng)

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-4-setup-s3-bucket-for-website.png)

- Encryption type: Server-side encryption with Amazon S3 managed keys (SSE-S3) (mặc định)
- Bucket key: Disable

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-5-setup-and-create-website-bucket.png)

Sau khi tạo xong thì chúng ta có thể xem lại

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-6-website-bucket-is-created.png)

#### Mở tính năng Static website hosting

Giờ chúng ta sẽ vào bên trong Bucket này, vào trong tab **Properties**

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-7-website-bucket-properties.png)

Kéo xuống dưới cùng, tới mục **Static website hosting**, ấn **Edit**

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-8-edit-static-website-hosting.png)

Chúng ta sẽ cấu hình như hình bên dưới

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-9-setup-static-website-hosting.png)

Và xác nhận. Khi mở tính năng này, thì mình có thể thấy ở trong phần **Properties** như sau

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-10-check-result.png)

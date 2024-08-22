+++
title = "S3 Bucket lưu ảnh từ người dùng cuối"
date = 2024
weight = 2
chapter = false
pre = "4.2. "
+++

Trên thực tế, chúng ta sẽ cần lưu lại những tấm ảnh cần thiết của người dùng (nếu họ cho phép) để dùng cho việc kiểm thử thuật toán xử lý ảnh để xem hoạt động có đúng hay không. Trong phần này chúng ta sẽ tạo một S3 Bucket để lưu ảnh từ người dùng cuối.

#### Tạo S3 Bucket

Giống với việc tạo S3 Bucket để lưu website (không mở tính năng **Static website hosting**), vào trong giao diện của S3

- Ấn **Create bucket**

Chúng ta sẽ thiết lập S3 bucket này với các thông tin

- Name: `imga-images`
- Object Ownership: ACLs disable

**INSERT IMAGE HERE**

- Tích vào **Block all public access**

**INSERT IMAGE HERE**

Ở bước này cũng tương tự, dùng kiểu mã hoá mặc định và tắt Bucket key

**INSERT IMAGE HERE**

Ấn **Create bucket** và giờ chúng ta đã có 2 S3 Buckets

**INSERT IMAGE HERE**

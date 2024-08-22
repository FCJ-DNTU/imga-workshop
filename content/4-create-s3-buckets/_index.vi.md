+++
title = "Tạo các S3 Buckets"
date = 2024
weight = 4
chapter = false
pre = "4. "
+++

Trong bài này, chúng ta cần phải tạo 2 S3 Bucket để

- Lưu bản đóng gói của ứng dụng web được đóng gói từ Github.
- Lưu ảnh của người dùng tải (dùng cho việc cải thiện thuật toán xử lý ảnh sau này)

Cả hai S3 Buckets này đều private, nghĩa là không cho phép yêu cầu dữ liệu từ S3 ở bên ngoài, chỉ được phép truy cập từ các dịch vụ, người dùng ở trong nền tảng đám mây của chúng ta.

#### Nội dung

1. [Tạo S3 Bucket để lưu ứng dụng web](4-1-store-static-files)
2. [Tạo S3 Bucket để lưu ảnh](4-2-store-images-from-users)

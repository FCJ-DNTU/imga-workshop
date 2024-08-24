+++
title = "Triển khai ứng dụng web"
date = 2024
weight = 3
chapter = false
pre = "6.3. "
+++

Trên lý thuyết, chỉ cần đưa được dữ liệu web lên S3 Bucket là người dùng có thể truy cập được thông qua CloudFront. Giờ chúng ta sẽ triển khai tự động lên S3 Bucket.

#### Tải về mã nguồn ứng dụng

Vào trong respository mà từ đầu chúng ta đã sao chép vào trong tài khoản cá nhân, tiến hành tải mã nguồn của dự án này về như cách mà chúng ta làm ở trong máy EC2

![6-host-web-application](/images/6-host-web-application/6-3-1-clone-folked-repo.png)

Khi đã sao chép xong, thì mở dự án với VSCode, vào trong tệp sau để sửa lại endpoint của API. Sửa lại thành endpoint của API Gateway

![6-host-web-application](/images/6-host-web-application/6-3-2-setup-endpoint.png)

#### Tạo access key

Trước khi tạo workflow thì mình sẽ cần phải có một IAM User nào đó uỷ quyền co Runner để có thể thực hiện được. Có một số cách như

- Tạo IAM Role có quyền truy cập vào S3, gán Role đó cho EC2 (nằm trong VPC có S3 Endpoint) và thay đổi Runner thành EC2 đó
- Một IAM User nào đó có quyền truy cập vào S3 Bucket, và chính user này sẽ cấp quyền của User đó cho AWS CLI nằm trong Runner với Access Key Id và Serect Access Key.

Ở đây chúng ta sẽ dùng cách 2

Trong giao diện chính của **IAM**, chọn Users

![6-host-web-application](/images/6-host-web-application/6-3-3-iam-page.png)

Trong danh sách User, chọn một người dùng có quyền truy cập vào S3 Bucket

![6-host-web-application](/images/6-host-web-application/6-3-4-select-user.png)

Trong trang thông tin của người dùng này, mình sẽ tạo một access key mới

![6-host-web-application](/images/6-host-web-application/6-3-5-select-create-access-key.png)

Ở đây, chúng ta sẽ chọn trường hợp sử dụng là **Other**, rồi ân **Next**

![6-host-web-application](/images/6-host-web-application/6-3-6-select-use-case.png)

Tiếp theo các bạn có thể nhập mô tả hoặc bỏ quả, sau đó ấn **Create access key**

![6-host-web-application](/images/6-host-web-application/6-3-7-describe.png)

Sau khi tạo xong, các bạn nên tải về để dùng sau

![6-host-web-application](/images/6-host-web-application/6-3-8-key-created.png)

### Triển khai

Khi đã có được Access Key và Serect Access Key, thì giờ chúng ta sẽ tiến hành thiết lập các thông số Serect tương ứng cho workflow. Truy cập vào repository

- Mở tab **Settings**
- Xổ mục **Serects and variables** xuống và chọn **Actions**

![6-host-web-application](/images/6-host-web-application/6-3-9-create-secret.png)

Ấn **New repository serect** để tiến cài đặt các thông số này. Vì ở đây là thông tin mật, nên tôi sẽ không cài đặt ở đây, nhưng có 4 thống số mà chúng ta cần phải cài.

- `AWS_BUCKET`: tên của bucket lưu trữ nội dung của ứng dụng web, tuỳ vào các bạn đặt tên là gì, còn trong bài này thì S3 Bucket đó tên là `imga-website`.
- `AWS_KEY_ID`: là Access Key
- `AWS_SECRET_ACCESS_KEY`: là Secret Access Key
- `AWS_REGION`: là mã region, trong bài này là `ap-southeast-1`, Singapore.

Sau khi thiết lập xong, chúng ta sẽ có các secret như này

![6-host-web-application](/images/6-host-web-application/6-3-10-check-secrets.png)

Trước khi có thể chạy được workflow, thì chúng ta phải vào trong **Actions**, ấn **I understand my workflows, go ahead and enable them** để mở workflow.

![6-host-web-application](/images/6-host-web-application/6-3-11-allow-github-actions.png)

Giờ thì tiến hành đẩy những thay đổi trong mã nguồn lên `main` branch của dự án thôi, khi đẩy xong thì Github sẽ kích hoạt workflow.

![6-host-web-application](/images/6-host-web-application/6-3-12-push-code-to-trigger-workflow.png)

Workflow sẽ chạy như thế này

![6-host-web-application](/images/6-host-web-application/6-3-13-workflow-is-running.png)
![6-host-web-application](/images/6-host-web-application/6-3-14-workflow-runs-successfully.png)

Khi chạy xong, chúng ta vào trong S3 Bucket chứa website để kiểm tra, và thấy được là dữ liệu website cần thiết đã được tải lên đầy đủ.

![6-host-web-application](/images/6-host-web-application/6-3-15-check-result.png)

Sao chép URL trong distribution để kiểm tra kết quả

![6-host-web-application](/images/6-host-web-application/6-3-16-copy-url-of-distribution.png)

Kết quả

![6-host-web-application](/images/6-host-web-application/6-3-17-our-website.png)

Vậy thì chúng ta đã hoàn thành được các công việc cấu hình và triển khai ứng dụng, giờ thì là lúc kiểm tra xem ứng dụng của chúng ta có hoạt động ổn định hay không.

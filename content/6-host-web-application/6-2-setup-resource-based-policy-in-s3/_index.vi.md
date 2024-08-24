+++
title = "Tạo resource-based policy trong S3"
date = 2024
weight = 2
chapter = false
pre = "6.2. "
+++

#### Cấp quyền truy cập vào S3 Bucket cho CloudFront

Sang tab **Origins**, mở rộng cột Origin access, chúng ta có thể thấy được chuối cuối cùng sau dấu **/**, sao chép lại.

![6-host-web-application](/images/6-host-web-application/6-2-1-view-distribution-origin-info.png)

Quay trở lại S3, vào trong Bucket `imga-website`, trong tab **Permissions**, ở phần Bucket Policy

![6-host-web-application](/images/6-host-web-application/6-2-2-setup-resource-based-policy-in-website-bucket.png)

Nếu như policy đã được tạo sẵn trong quá trình thiết lập CloudFront thì chúng ta không cần phải làm nữa, nhưng trong trường hợp chưa có thì chúng ta buộc phải thêm. Khi đó ấn **Edit**, chúng ta sẽ vào giao diện chỉnh sửa policy như thế này

![6-host-web-application](/images/6-host-web-application/6-2-3-add-policy-and-apply.png)

Bạn có thể lấy mẫu ở dưới này

```json
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E3H1YR9ZE7FBTA"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::imga-website/*"
    }
  ]
}
```

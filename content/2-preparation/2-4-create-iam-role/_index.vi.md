+++
title = "Tạo IAM Role"
date = 2024
weight = 4
chapter = false
pre = "2.4. "
+++

IAM Role rất được khuyến khích sử dụng vì dễ quản lý và có thời hạn sử dụng. Trong bài này chúng ta sẽ tạo 2 IAM Roles cho mỗi EC2 để có quyền truy cập vào các dịch vụ mong muốn là S3 và ECR.

Với EC2 ở môi trường phát triển, nó có quyền:

- Đẩy, kéo docker image từ ECR
- Đọc, ghi, xóa objects trong S3

Với EC2 ở môi trường sản phẩm, nó có quyền:

- Kéo docker image từ ECR
- Đọc, ghi, xóa objects trong S3

Như thế thì chúng ta sẽ cần các policies để:

- Đẩy docker image lên ECR, cùng với quyền lấy mã xác thực từ ECR
- Kéo docker image từ ECR, cùng với quyền lấy mã xác thực từ ECR
- Đọc, ghi, xóa objects trong S3

{{% notice note %}}
Vì docker sẽ đẩy và kéo docker image lên trên 1 private registry, mà trong bài này, chúng ta dùng ECR là một registry có 1 private repository nên docker cần phải có được credential để có thể đây và kéo được các docker image lên và từ ECR. Trong khi cấu hình IAM Policies, thì chúng ta sẽ thêm quyền lấy mã xác thực.
{{% /notice %}}

#### Tạo quyền truy cập ECR cho IAM Role

Ở trang chủ:

- Tìm `IAM`
- Chọn **IAM**

![2-image](/images/2-preparation/2-4-1-search-iam.png)

Trong trang chủ của IAM, thì chúng ta sẽ:

- Chọn **Policies**
- Ấn **Create policy**

![2-image](/images/2-preparation/2-4-2-create-policy.png)

Trong **Select a service**, chúng ta sẽ:

- Tìm "`Elastic Container Registry`
- Chọn **Elastic Container Registry**

![2-image](/images/2-preparation/2-4-3-search-ecr.png)

Tiếp theo là chúng ta sẽ chọn một số quyền trong **List** và **Read** như trong ảnh. Và tích vào **Any in this account** ở phần Resources (Specific).

![2-image](/images/2-preparation/2-4-3-setup-read-ecr-permission.png)

Sau đó, nhập một số thông tin cho policy

- Name: `ReadECRRepositoryContent`
- Description: `Allow pull images, describe repositories`
- Kiểm tra lại thông tin và ấn **Create policy**

![2-image](/images/2-preparation/2-4-4-create-read-ecr-policy.png)

Tương tự, giờ mình sẽ tạo một policy khác cho dịch vụ ECR với các quyền **Write**

![2-image](/images/2-preparation/2-4-5-setup-write-ecr-permission.png)

Các thông tin

- Name: `WriteECRRepositoryContent`
- Description: `Allow push and delete images`
- Kiểm tra lại thông tin và ấn **Create policy**

![2-image](/images/2-preparation/2-4-6-create-write-ecr-policy.png)

#### Tạo quyền truy cập S3 cho IAM Role

Tiếp tục, trong giao diện thêm policy

- Tìm `S3`
- Chọn **S3**
- Ấn **Next**

![2-image](/images/2-preparation/2-4-7-search-s3-permission.png)

Tiếp theo là chúng ta sẽ thêm các quyền **List**, **Read**, **Write** như sau
![2-image](/images/2-preparation/2-4-8-setup-s3-list-permission.png)
![2-image](/images/2-preparation/2-4-9-setup-s3-get-permission.png)
![2-image](/images/2-preparation/2-4-10-setup-s3-write-permission.png)

Trong **Resources**, chọn **Specific** và tích vào Any với **bucket** và **object**.

![2-image](/images/2-preparation/2-4-11-setup-s3-resources.png)

Tiếp theo, mình sẽ thiết lập một số thông tin cho policy này

- Name: `RWDS3Objects`
- Description: `Allow read, write and delete Objects in S3 Bucket`
- Kiểm tra lại thông tin và ấn **Create policy**

![2-image](/images/2-preparation/2-4-12-create-s3-policy.png)

Trong danh sách policy, ở phần **Filter by Type**, chọn **Customer managed** để kiểm tra

![2-image](/images/2-preparation/2-4-13-check-policy.png)

#### Tạo IAM Role cho EC2 ở môi trường phát triển

Sau khi tạo xong các policies, thì giờ chúng ta sẽ gán cho các IAM Role, đầu tiên là cho EC2 trong môi trường phát triển. Trong giao diện IAM

- Chọn **Roles**
- Ấn **Create role**

![2-image](/images/2-preparation/2-4-14-roles-page.png)

Tiếp theo, trong phần **Select trusted entity**

- Chọn **AWS Service**
- Use case
  - Service or use case: EC2
  - Use case: EC2

![2-image](/images/2-preparation/2-4-15-setup-dev-role.png)

Trong phần **Add permissions**

- Chọn tất cả policies mà mình vừa tạo hồi nãy
- Ấn **Next**

![2-image](/images/2-preparation/2-4-16-add-policies-to-dev-role.png)

Tên của Role là `DevEC2` và tạo Role

![2-image](/images/2-preparation/2-4-17-setup-dev-role-info.png)
![2-image](/images/2-preparation/2-4-18-check-and-create-dev-role.png)

#### Tạo IAM Role cho EC2 ở môi trường sản phẩm

Tương tự giống với các bước đầu tạo Role cho EC2 trong môi trường phát triển, nhưng quyền trong role này sẽ khác đi một xíu

- Trong **Add permissions**
- Chọn 2 policies là `ReadECRRepositoryContent` và `RWDS3Object`
- Ấn **Next**

![2-image](/images/2-preparation/2-4-19-add-policies-to-prod-role.png)

Tên của Role là `ProdEC2` và tạo Role

![2-image](/images/2-preparation/2-4-20-setup-prod-role-info.png)
![2-image](/images/2-preparation/2-4-21-check-and-create-prod-role.png)

Cuối cùng là kiểm tra lại 2 IAM Roles mà chúng ta mới tạo

![2-image](/images/2-preparation/2-4-22-check-roles.png)

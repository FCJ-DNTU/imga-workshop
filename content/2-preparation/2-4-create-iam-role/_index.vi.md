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
  - Đẩy docker image lên ECR
  - Kéo docker image từ ECR
  - Đọc, ghi, xóa objects trong S3

#### Tạo quyền truy cập ECR cho IAM Role
Ở trang chủ:
  - Tìm `IAM`
  - Chọn **IAM**

**INSERT IMAGE HERE**

Trong trang chủ của IAM, thì chúng ta sẽ:
  - Chọn **Policies**
  - Ấn **Create policy**

**INSERT IMAGE HERE**

Trong **Select a service**, chúng ta sẽ:
  - Tìm "`Elastic Container Registry`
  - Chọn **Elastic Container Registry**

**INSERT IMAGE HERE**

Tiếp theo là chúng ta sẽ chọn một số quyền trong **List** và **Read** như trong ảnh. Và tích vào **Any in this account** ở phần Resources (Specific).

**INSERT IMAGE HERE**

Sau đó, nhập một số thông tin cho policy
  - Name: `ReadECRRepositoryContent`
  - Description: `Allow pull images, describe repositories`
  - Kiểm tra lại thông tin và ấn **Create policy**

**INSERT IMAGE HERE**

Tương tự, giờ mình sẽ tạo một policy khác cho dịch vụ ECR với các quyền **Write**

**INSERT IMAGE HERE**

Các thông tin
  - Name: `WriteECRRepositoryContent`
  - Description: `Allow push and delete images`
  - Kiểm tra lại thông tin và ấn **Create policy**

**INSERT IMAGE HERE**

#### Tạo quyền truy cập S3 cho IAM Role
Tiếp tục, trong giao diện thêm policy
  - Tìm `S3`
  - Chọn **S3**
  - Ấn **Next**

**INSERT IMAGE HERE**

Tiếp theo là chúng ta sẽ thêm các quyền **List**, **Read**, **Write** như sau
**INSERT IMAGE HERE**
**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Trong **Resources**, chọn **Specific** và tích vào Any với **bucket** và **object**.

**INSERT IMAGE HERE**

Tiếp theo, mình sẽ thiết lập một số thông tin cho policy này
  - Name: `RWDS3Objects`
  - Description: `Allow read, write and delete Objects in S3 Bucket`
  - Kiểm tra lại thông tin và ấn **Create policy**

**INSERT IMAGE HERE**

Trong danh sách policy, ở phần **Filter by Type**, chọn **Customer managed** để kiểm tra

**INSERT IMAGE HERE**

#### Tạo IAM Role cho EC2 ở môi trường phát triển
Sau khi tạo xong các policies, thì giờ chúng ta sẽ gán cho các IAM Role, đầu tiên là cho EC2 trong môi trường phát triển. Trong giao diện IAM
  - Chọn **Roles**
  - Ấn **Create role**

**INSERT IMAGE HERE**

Tiếp theo, trong phần **Select trusted entity**
  - Chọn **AWS Service**
  - Use case
    - Service or use case: EC2
    - Use case: EC2

**INSERT IMAGE HERE**

Trong phần **Add permissions**
  - Chọn tất cả policies mà mình vừa tạo hồi nãy
  - Ấn **Next**

**INSERT IMAGE HERE**

Tên của Role là `DevEC2` và tạo Role

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Tạo IAM Role cho EC2 ở môi trường sản phẩm
Tương tự giống với các bước đầu tạo Role cho EC2 trong môi trường phát triển, nhưng quyền trong role này sẽ khác đi một xíu
  - Trong **Add permissions**
  - Chọn 2 policies là `ReadECRRepositoryContent` và `RWDS3Object`
  - Ấn **Next**

**INSERT IMAGE HERE**

Tên của Role là `ProdEC2` và tạo Role

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Cuối cùng là kiểm tra lại 2 IAM Roles mà chúng ta mới tạo

**INSERT IMAGE HERE**
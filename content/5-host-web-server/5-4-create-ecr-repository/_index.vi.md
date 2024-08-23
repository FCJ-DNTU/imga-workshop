+++
title = "Tạo một private repository trên ECR"
date = 2024
weight = 4
chapter = false
pre = "5.4. "
+++

Trước khi mà chúng ta có thể đẩy docker image lên được ECR, thì chúng ta sẽ cần phải tạo một repository trên đó, và repository này là riêng tư => cần có xác thực và được uỷ quyền.

#### Tạo private repository

Trên màn hình chính

- Tìm `ECR`
- Chọn **Elastic Container Registry**

**INSERT IMAGE HERE**

- Ấn **Create** để bắt đầu tạo

**INSERT IMAGE HERE**

Trong này, chúng ta sẽ điền một số thông tin như sau

- Repository name: `imga/server`
- Image tag mutability: **Immutable** (các tag của docker image sẽ không có thể được ghi đè, điều này giúp cho chúng ta có thể quản lý được phiên bản của docker image)

**INSERT IMAGE HERE**

Ở trong Encryption settings

- Chọn **AES-256**

**INSERT IMAGE HERE**

Sau khi tạo xong, ở trong mục Private Registry thì chúng ta có thể thấy được repository chúng vừa mới tạo được liệt kê ở đây

**INSERT IMAGE HERE**

Vào trong repository này thì chúng ta sẽ không thấy image nào ở trong này cả.

**INSERT IMAGE HERE**

Ấn vào View push commands, thì chúng ta sẽ thấy chỉ dẫn để đẩy một docker image lên trên ECR

**INSERT IMAGE HERE**

Bao gồm là việc lấy thông tin để đăng nhập với docker, cùng với đó là endpoint của repository. Tiếp theo là build image, sau đó là gắn tag và cuối cùng là đẩy image lên đúng với repository.

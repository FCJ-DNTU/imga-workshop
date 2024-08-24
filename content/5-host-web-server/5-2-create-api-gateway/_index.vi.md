+++
title = "Tạo API Gateway"
date = 2024
weight = 2
chapter = false
pre = "5.2. "
+++

#### Tạo API Gateway

Trong giao diện chính

- Tìm `API Gateway`
- Chọn **API Gateway**

![5-host-web-server](/images/5-host-web-server/5-2-1-search-api-gw.png)

- Ở đây, chúng ta sẽ tạo API Type là **HTTP**

![5-host-web-server](/images/5-host-web-server/5-2-2-build-http-api.png)

- Name: `imga-api`

![5-host-web-server](/images/5-host-web-server/5-2-3-setup-api.png)

Chúng ta sẽ tạo routes sau, nên giờ sẽ bỏ qua

![5-host-web-server](/images/5-host-web-server/5-2-4-configure-routes.png)

Tiếp theo, API Gateway nó cần biết được là chúng ta đang triển khai ở giai đoạn nào, ở đây sẽ để theo mặc định. API Gateway sẽ thêm tên giai đoạn sau URL cơ sở

![5-host-web-server](/images/5-host-web-server/5-2-5-define-stages.png)

Cuối cùng xem lại cấu hình và ấn **Create**

![5-host-web-server](/images/5-host-web-server/5-2-6-review-and-create.png)

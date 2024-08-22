+++
title = "Triển khai máy chủ cho web"
date = 2024
weight = 5
chapter = false
pre = "5. "
+++

#### Triển khai web server

Để người dùng cuối có thể thực hiện được chức năng thông qua ứng dụng web, thì chúng ta cần phải thiết lập một máy chủ cho ứng dụng web này, nó có nhiệm vụ là xử lý yêu cầu từ người dùng và thực hiện thực thi các chương trình python để xử lý việc trích xuất dữ liệu, sau đó máy chủ sẽ tạo tệp Excel và cho phép người dùng tải về.

#### Nội dung

1. [Tạo Network Load Balancer](5-1-create-nlb)
2. [Tạo API Gateway](5-2-create-api-gateway)
3. [Tạo tích hợp giữa NLB và API Gateway](5-3-create-private-integration)
4. [Tạo ECR Repository](5-4-create-ecr-repository)
5. [Đẩy Docker Image lên ECR](5-5-push-docker-image-to-ecr)
6. [Triển khai web server](5-6-deploy-web-server)

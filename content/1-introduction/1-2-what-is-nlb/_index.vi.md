+++
title = "Network Load Balancer là gì?"
date = 2024
weight = 2
chapter = false
pre = "1.2. "
+++

#### Khái niệm cơ bản
Cân bằng tải là tính năng giúp phân chia đều các lưu lượng mạng, yêu cầu tới các mục tiêu khác nhau. Vì là tính năng, nên nó hoạt động ở tầng logic, có thể được cung cấp bởi một máy chủ nào đó hoặc thậm chí là một tính năng riêng biệt được một thiết bị riêng để quản lý, thiết bị này được gọi là bộ cân bằng tải.

Trên AWS, có 3 loại cân bằng tải. Các loại này có các thành phần khác nhau, mục tiêu phần lớn là giống (nhưng vẫn khác) và quan trọng nhất là yếu tố quyết định để chuyển gói tin cũng khác nhau. Trong đó:
- Application Load Balancer: là bộ cân bằng tải mà trong đó nó sẽ dựa vào request từ người dùng, và chuyển tới mục tiêu là một máy chủ hoặc một container nào đó. Hoạt động ở tầng 7 trong mô hình mạng OSI.
- Network Load Balancer: là bộ cân bằng tải mà trong đó nó sẽ dựa vào các thông tin ở trong gói tin thay vì là yêu cầu, và chuyển tới mục tiêu là một máy chủ, container, hoặc thậm chí là một Load Balancer khác. Hoạt động ở tầng 3 trong mô hình mạng OSI.
- Gateway Load Balancer: là bộ cân bằng tải mà nó sẽ có cơ chế chuyển gói tin như hai loại trên, nhưng mục tiêu của bộ cân bằng tải này thì nó rộng hơn, như là có thể đi tới VPC nào đó, tới môi trường on-premise. Hoạt động ở cả tầng 7 và tầng 3 trong mô hình mạng OSI.

#### Nhóm mục tiêu
Bộ cân bằng tải sẽ lấy thông tin của các mục tiêu trong cùng một nhóm, từ đó mà nó có thể chuyển tiếp các gói tin tới một trong các mục tiêu khác nhau trong một nhóm.

Trong bài này thì mục tiêu của NLB sẽ là máy chủ EC2. Và mình sẽ dùng NLB để kết nối với API Gateway thông qua VPC Link.

#### Kiểm tra sức khỏe của mục tiêu
Bộ cân bằng tải cần phải biét được là các mục tiêu mà nó cần chuyển tiếp gói tin đến có còn hoạt động không? Khi này thì bộ cân bằng tải sẽ gửi một yêu cầu tới máy chủ trong mục tiêu đó hoặc chính máy chủ (nếu máy chủ là mục tiêu), trong trường hợp bộ cân bằng tải không nhận được phản hồi thì nó sẽ bỏ mục tiêu đó hoặc "quên" mục tiêu đó để không gửi gói tin tới.
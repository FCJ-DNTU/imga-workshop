+++
title = "Network Load Balancer là gì?"
date = 2024
weight = 2
chapter = false
pre = "1.2. "
+++

![elastic-load-balancing](/images/elastic-load-balancing.png)

#### Khái niệm cơ bản

Cân bằng tải là tính năng giúp phân chia đều các lưu lượng mạng, yêu cầu tới các mục tiêu khác nhau. Vì là tính năng, nên nó hoạt động ở tầng logic, có thể được cung cấp bởi một máy chủ nào đó hoặc thậm chí là một tính năng riêng biệt được một thiết bị riêng để quản lý, thiết bị này được gọi là bộ cân bằng tải.

Trên AWS, có 3 loại cân bằng tải. Các loại này có các thành phần khác nhau, mục tiêu phần lớn là giống (nhưng vẫn khác) và quan trọng nhất là yếu tố quyết định để chuyển gói tin cũng khác nhau. Trong đó:

- **Application Load Balancer**: là bộ cân bằng tải mà trong đó nó sẽ dựa vào request từ người dùng, và chuyển tới mục tiêu là một máy chủ hoặc một container nào đó. Hoạt động ở tầng 7 trong mô hình mạng OSI.
- **Network Load Balancer**: là bộ cân bằng tải mà trong đó nó sẽ dựa vào các thông tin ở trong gói tin thay vì là yêu cầu, và chuyển tới mục tiêu là một máy chủ, container, hoặc thậm chí là một Load Balancer khác. Hoạt động ở tầng 3 trong mô hình mạng OSI.
- **Gateway Load Balancer**: là bộ cân bằng tải mà nó sẽ có cơ chế chuyển gói tin như hai loại trên, nhưng mục tiêu của bộ cân bằng tải này thì nó rộng hơn, như là có thể đi tới VPC nào đó, tới môi trường on-premise. Hoạt động ở cả tầng 7 và tầng 3 trong mô hình mạng OSI.

#### Nhóm mục tiêu

Bộ cân bằng tải sẽ lấy thông tin của các mục tiêu trong cùng một nhóm, từ đó mà nó có thể chuyển tiếp các gói tin tới một trong các mục tiêu khác nhau trong một nhóm.

Trong bài này thì mục tiêu của NLB sẽ là máy chủ EC2. Và mình sẽ dùng NLB để kết nối với API Gateway thông qua VPC Link.

#### Kiểm tra sức khỏe của mục tiêu

Bộ cân bằng tải cần phải biét được là các mục tiêu mà nó cần chuyển tiếp gói tin đến có còn hoạt động không? Khi này thì bộ cân bằng tải sẽ gửi một yêu cầu tới máy chủ trong mục tiêu đó hoặc chính máy chủ (nếu máy chủ là mục tiêu), trong trường hợp bộ cân bằng tải không nhận được phản hồi thì nó sẽ bỏ mục tiêu đó hoặc "quên" mục tiêu đó để không gửi gói tin tới.

Trong bài này, mình sẽ dùng Network Load Balancer, đặt ở trong Private VPC, nó sẽ là thành phần trung gian chuyển tiếp các yêu cầu (gói tin) của người dùng (Web app) từ API Gateway tới phần Web server ở trong Private VPC.

![network-load-balancer](/images/network-load-balancer.png)

Network Load Balancer nó sẽ không chú ý tới giao thức, yêu cầu của gói tin, mà nó chỉ quan tâm tới địa chỉ đích ở trong gói tin đó. Nên các Target ở trong NLB sẽ nhận được gói tin nhanh hơn một chút so với ALB. Trong bài workshop này, Target hiện tại chỉ có duy nhất một EC2 Instance, trên thực tế, khi ứng dụng có nhiều người dùng hơn thì chỉ với 1 EC2 Instance sẽ không thể chịu tải được nhiều yêu cầu của nhiều người dùng.

![single_ec2_vi](/images/1-introduction/single_ec2_vi.png)

Vì thế, mình sẽ có 2 giải pháp:

- Thêm cứng các số lượng EC2 Instance ở trong hạ tầng. Tuy nhiên, với cách này thì khi lưu lượng người dùng giảm đi, mình sẽ cần phải tắt một EC2 đi và khi lưu lượng tăng lên thì mình sẽ tự tay bật lại, rất tốn thời gian.
- Dùng Auto Scaling Group, với dịch vụ này, thì LB sẽ tự động thêm EC2 Instance vào trong hạ tầng, số lượng sẽ phù hợp với các yêu cầu được gửi tới, sao cho hệ thống của chúng ta có thể chịu tải được.

![auto_scaling_group_vi](/images/1-introduction/auto_scaling_group_vi.png)

Khi đó, NLB sẽ phân phối đều các gói tin tới đều cho từng Instance trong Group.

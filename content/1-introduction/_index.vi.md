+++
title = "Giới thiệu"
date = 2024
weight = 1
chapter = false
pre = "1. "
+++

#### Tổng quan

Trong bài workshop này, chúng ta sẽ triển khai một ứng dụng với mục đích là giúp cho mọi người có thể chuyển đổi được từ dữ liệu bảng ở trong ảnh thành một tệp tin Excel. Ứng dụng sẽ được chia làm 2 phần chính:

- **FrontEnd**: là ứng dụng người dùng cuối sẽ sử dụng để thực hiện yêu cầu chuyển đổi của họ.
- **BackEnd**: trong backend thì nó lại bao gồm 2 phần nhỏ hơn
  - **Web server**: web server là thành phần chung gian, nó là nơi sẽ tiếp nhận các yêu cầu từ người dùng và sau đó là thực thi các script trong python program để tiến hành các tính năng mục tiêu. Khi chương trình python trả về lại cho web server, thì web server sẽ phản hồi lại cho người dùng.
  - **Python program**: là thành phần chịu trách nhiệm cho việc thực hiện chức năng mục tiêu trong ứng dụng. Sau khi nó thực hiện xong thì sẽ trả về lại kết quả cho web server, khi này thì web server sẽ chịu trách nhiệm tiếp việc còn lại.

Giới thiệu sơ ứng dụng của chúng ta sơ qua là thế, phần sau thì mình sẽ nói rõ hơn. Trong bài workshop này, thì sẽ dùng các dịch vụ của AWS và triển khai ở trên đám mây, kết hợp với Github để quản lý source.

Đây là kiến trúc đầy đủ trong hạ tầng của chúng ta:
![architecture](/images/1-introduction/architecture.png)

#### Giải thích về hạ tầng

Trong bài, các bạn sẽ để ý là chúng ta có 2 VPC khác nhau: một là VPC cho môi trường production và hai là VPC cho môi trường development. Mỗi một VPC sẽ có các vai trò khác nhau.

- Với Development VPC: trong VPC này, thì mọi người trong nhóm phát triển sẽ dùng để thực hiện các công việc phát triển ứng dụng, như là training, thử nghiệm thuật toán mới, ... Nó tương đương với việc là một nhóm phát triển đang làm việc trong cùng một gian phòng ở môi trường on-premise.
  - Theo lý thuyết, trong VPC này thì mình cũng sẽ có một module về python để có thể thử nghiệm thuật toán mới trong ứng dụng. Khi đó chúng ta sẽ cần VPC này có thể kết nối tới một S3 Bucket. Bucket này sẽ chịu trách nhiệm để lưu trữ những tấm ảnh mà người dùng đã gửi lên.
  - Cũng theo lý thuyết, mặc dù là VPC cho môi trường phát triển, nó sẽ "mở" hơn so với VPC cho môi trường sản phẩm, nhưng không đồng nghĩa với việc là có có thể truy cập bởi tất cả mọi người. Nhưng trong bài này mình sẽ mở nó r với internet và chỉ giới hạn truy cập lại với Security Group. Trên thực tế thì chúng ta cần thêm NACL, cùng với đó là kết nối VPN để đảm bảo cho việc bảo mật kết nối của cả team cũng như là hệ thống.
- Với Production VPC: trong VPC này, thì chỉ có một số ít người có thể đụng tới, đa phần là những người làm ở công việc triển khai và vận hành. Nó sẽ là VPC mà phần backend trong hệ thống ứng dụng của chúng ta xử lý công việc.

Trong bài này, chúng ta sẽ triển khai các dịch vụ mà hạ tầng có, khi đó chúng ta có thể học được:

- Cách thiết lập một hạ tầng đơn giản để triển khai một ứng dụng.
- Cách dùng Github Actions cùng với Gitflow.
- Cách tích hợp API Gateway với VPC thông qua VPC Link.
- Cách triển khai một private backend mà ứng dụng web có thể giao tiếp được thông qua API Gateway.
- Cách triển khai một web tĩnh, thậm trí là SPA (Single Page Application) với S3 và CloudFront.
- Sử dụng cơ bản ECR để làm Docker Image Registry.
- Triển khai ứng dụng với Docker.
- Hiểu được về bash script cũng như là docker (cái này yêu cầu bạn phải đọc kĩ ở phần sau)

Từ đó mà chúng ta có thể hiểu hơn về các dịch vụ của AWS.

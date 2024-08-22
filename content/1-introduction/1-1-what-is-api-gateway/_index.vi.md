+++
title = "API Gateway là gì?"
date = 2024
weight = 1
chapter = false
pre = "1.1. "
+++

#### Khái niệm cơ bản

Trong hệ thống của chúng ta, không chỉ có APIs / Endpoints từ máy chủ web chính, mà hệ thống của chúng ta còn có các APIs / Endpoints từ các máy chủ khác trong hệ thống, hoặc là các APIs / Endpoints từ các dịch vụ của AWS khác. Và chúng ta muốn mở các APIs / Endpoints này cho người dùng cuối, các ứng dụng bên thứ ba, hay chính hệ thống của chúng ta sử dụng. Khi đó thì chúng ta sẽ cần tới một dịch vụ để quản lý tập trung tất cả các APIs / Endpoints này về một dịch vụ duy nhất.

API Gateway còn giúp cho chúng ta bảo mật hệ thống bằng cách dùng cơ chế xác thực từ một dịch vụ khác hoặc là ở một bên thứ ba cũng như là bảo mật chính API, khi có thể ngăn chặn các cuộc tấn công nguy hại từ internet.

Để hiểu rõ hơn về bài workshop này, chúng ta sẽ đi sơ qua một số khái niệm ở bên dưới.

#### Integration

API Gateway là một trung tâm quản lý các APIs / Endpoints, khi đó thì chúng ta cần phải cho dịch vụ này biết là nó sẽ quản lý những APIs / Endpoints nào bằng cách là chúng ta sẽ phải tích hợp, ráp các APIs / Endpoints vào cho API Gateway với thành phần được gọi là Interagtion.

Có 2 loại integration là Public Integration và Private Integration. Public Integration là một tích mở mở, mà trong đó APIs nó cũng có thể truy cập được từ Internet / VPC khác / bên thứ ba; Private Integration là một tích hợp đóng, mà trong đó APIs chỉ có thể dùng được nội bộ ở trong chính VPC đó mà không thể đi tới bất cứ đâu. Thông thường thì chúng ta sẽ dùng tới Private Integration.

#### Method & Integration request / response

Vì quản lý tập trung các APIs / Endpoints, nên sẽ có một số tình huống như sau

- Cấu trúc dữ liệu được gửi từ ứng dụng khách và cấu trúc dữ liệu mà các máy chủ mong muốn nhận được có thể sẽ khác nhau.
- Cấu trúc dữ liệu từ một yêu cầu của ứng dụng khách có thể được chuyển tới 2 máy chủ khác nhau, trong đó có một máy chủ nhận cấu trúc khác.
- Có nhiều ứng dụng khách sử dụng chung một máy chủ, nhưng mỗi ứng dụng khách sẽ có các cấu trúc dữ liệu khác nhau.

Từ đó mình có khái niệm `method request` và `integration request`. Trong đó:

- Method request: được ứng dụng khách định nghĩa.
- Integration request: sẽ chuẩn hóa các cấu trúc dữ liệu đó, sao cho máy bên trong có thể đọc được

Ở chiều ngược lại cũng thế, khi mà máy chủ phản hồi, thì cấu trúc dữ liệu từ phản hồi có thể sẽ không khớp với ứng dụng khách, cho nên mình có thêm khái niệm `method response` và `integration response`. Trong đó:

- Method response: được ứng dụng khách nhận lại.
- Integration response: được định nghĩa bởi máy chủ.

![api_gateway_flow-vi](/images/1-introduction/api_gateway_flow-vi.png)

#### VPC Link

Là một tính năng dùng "private link", giúp cho API Gateway có thể kết nối được tới một Private VPC thông qua một đường mạng riêng.

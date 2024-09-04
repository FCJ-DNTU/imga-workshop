+++
title = "CloudFront và S3 là gì?"
date = 2024
weight = 3
chapter = false
pre = "1.3. "
+++

#### Khái niệm cơ bản

Trong AWS, thì mỗi EC2 sẽ được đi cùng với một EBS (trong trường hợp khác thì nhiều EC2 có thể kết nối tới EBS). Khi đó để một EC2 A khác có thể dùng được các tệp tin, truy cập vào tài nguyên của EC2 B nào đó thì chúng ta buộc phải dùng phương thức khác, vì EC2 A đó không thể kết nối trực tiếp tới EBS của EC2 B để lấy dữ liệu được.

Khi đó chúng ta có một giải pháp khác gọi là S3, S3 cũng là một kho chứ dữ liệu, nhưng nó không nằm trong cùng một vùng sẵn sàng với EC2, mà được đặt ở chỗ khác vì tính sẵn sàng cao và an toàn dữ liệu. Khi đó thì nhiều EC2 có thể chia sẽ tài nguyên với nhau. Có thể là dữ liệu của một trang web tĩnh.

Trong trường hợp chúng ta triển khai một ứng dụng web với S3, nhưng chúng ta có lượng lớn khách hàng đang sống ở nửa vòng bên kia thế giới, khi đó thì chúng ta cần tới Content Delivery Network để có thể giúp cho người dùng ở đó truy cập nhanh hơn. Khi đó, chúng ta sẽ dùng CloudFront.

#### CloudFront

![cloudfront](/images/cloudfront.png)

CloudFront sẽ cần một nguồn dữ liệu, gọi là Origin để nó có thể tạo các bản phân phối dựa trên dữ liệu gốc từ Origin. Khi tạo xong thì CloudFront sẽ phân phối dữ liệu của ứng dụng web đó tới các Edge Locations cần triển khai, quản lý các bản phân phối đó.

Để có thể triển khai nhanh, thì CloudFront sẽ áp dụng cơ chế lưu bộ nhớ đệm trên bản phân phối đó, khi quá thời hạn (thường là một ngày) thì CloudFront sẽ về lại Origin để yêu cầu dữ liệu mới, nếu như không có gì mới thì CloudFront cập nhật lại thời hạn cho bản phân phối đó.

#### S3 với CloudFront

![s3_bucket](/images/s3_bucket.png)

Khi S3 dùng với CloudFront, thì S3 sẽ cần phải chặn các truy cập công cộng, và mở chức năng host ứng dụng web tĩnh. Và để CloudFront có thể truy cập vào được S3, thì ở phía CloudFront sẽ cần phải cài OAI để S3 có thể xác thực được CloudFront với resource-based policy. Ngoài ra chúng ta có thể quản lý vòng đời cũng như là phiên bản của dữ liệu được lưu trong S3, kết hợp tính năng này chúng ta sẽ quản lý tốt bộ nhớ đêm của bản phân phối trên CloudFront.

Trong bài này, chúng ta sẽ có 2 buckets được dùng cho 2 mục đích khác nhau:

- Bucket để lưu trữ hình ảnh của người dùng.
- Bucket để lưu trữ nội dung của Website, được dùng với CloudFront.

Tuy là có 2 S3 Buckets, nhưng cả 2 Bucket này để là private Buckets, không cho phép các truy cập công cộng có thể tới các objects ở trong 2 Buckets.

Như vậy, để CloudFront có thể lấy được object ở trong Bucket Website, thì chúng ta cần phải thiết lập resource-base policy (là một dạng policy đi kèm với tài nguyên của AWS, nó sẽ quyết định xem là Principal nào sẽ có thể access được, với những quyền hạn gì, cũng như là những giới hạn truy cập). Ngoài ra, để mà S3 có thể biết được là CloudFront có phải đang truy cập hay không, thì CloudFront cần phải tạo OAI (Origin Access Identify), giống như kiểu mình sẽ đăng ký định danh, và gán cho resource đó, S3 sẽ dựa vào định danh để để cho phép resource này có được phép truy cập vào hay không.

![s3_bucket_web_vi](/images/s3_bucket_web_vi.png)

Còn lại, để Webserver có thể tải ảnh được lên trên S3, thì cần phải có IAM Role với các quyền cần thiết để có thể tải được image lên trên S3.

![s3_bucket_image_vi](/images/s3_bucket_images_vi.png)

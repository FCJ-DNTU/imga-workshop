+++
title = "Triển khai web server"
date = 2024
weight = 6
chapter = false
pre = "5.6. "
+++

#### Kéo docker image từ ECR

Ở trong bước trước, chúng ta đã đẩy docker image lên trên ECR, bây giờ chúng ta sẽ kéo docker image từ trên ECR về để tiến hành xây dựng docker container.

Kết nối SSH lại với máy EC2 trong môi trường sản phẩm từ máy EC2 trong môi trường phát triển

**INSERT IMAGE HERE**

Để có thể kéo được docker image về thì chúng ta sẽ phải có được URI của docker image, vào trong phần chi tiết của docker image ở trong repository trên ECR và sao chép URI

**INSERT IMAGE HERE**

Tiến hành đăng nhập, giống với lệnh ở bước trước

**INSERT IMAGE HERE**

Và docker image đã được kèo về hoàn tất

#### Triển khai

Sau khi kéo về rồi, thì giờ chúng ta sẽ khởi động docker container từ docker image này.

**INSERT IMAGE HERE**

Ở đây, sẽ có nhiều bước cần chúng ta phải xác nhận là có (yes) và đến bước ở dưới hình, các bạn sẽ điền thông tin như là

- Please select geographic area in which you live. ... chọn **5**
- Please select the city or region corresponding to your time zone ... chọn **70**

**INSERT IMAGE HERE**

Script sẽ chạy một hồi lâu nữa và chúng ta cần sẽ phải xác nhận thêm một vài lần nữa. Khi tải xong hết thì web server sẽ được khởi động với **pm2**

**INSERT IMAGE HERE**

#### Kiểm tra

Lúc này, khi mà chúng ta vào xem trạng thái của target trong Load Balancer `imga-nlb` thì chúng ta sẽ thấy là target (EC2 môi trường sản phẩm) đã đủ điều kiện với trạng thái là **Healthy**

**INSERT IMAGE HERE**

Vào API Gateway và lấy đường dẫn ra để kiểm tra, chúng ta sẽ được kết quả

**INSERT IMAGE HERE**

{{% notice note %}}
Sỡ dĩ API có thể kiểm thử bằng cách request thông qua server là do chúng ta đã thiết lập **Access-Control-Allow-Origin** là **\***
{{% /notice %}}

Như vậy thì web server của chúng ta đã đi vào hoạt động.

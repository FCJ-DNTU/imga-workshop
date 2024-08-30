+++
title = "Đẩy docker image lên ECR"
date = 2024
weight = 5
chapter = false
pre = "5.5. "
+++

Ở thì chúng ta sẽ đến với phần đóng gói mã nguồn thành docker image. Nhưng trước khi đóng gói thì chúng ta phải sửa đổi lại một số thông tin để cài đặt trước.

#### Cấu hình biến trong bash script

Chúng ta có một file bash script ở trong thư mục `nodejs/scripts/start.sh`, như đã nói ở phần trước thì kịch bản này có nhiệm vụ là setup các biến môi trường và khởi động Node Server dựa vào và sử dụng các biến môi trường đó.

Đầu tiên chúng ta kết nối SSH lại với máy EC2 trong môi trường sản phẩm

- Vào trong thư mục `imga/backend`, mã nguồn của backend của dự án
- Tiếp theo là gõ lệnh `vim nodejs/scripts/start.sh` để chúng ta có mở text editor với tệp này bằng VIM

![5-host-web-server](/images/5-host-web-server/5-5-1-prepare-to-build.png)

Trong đây, có một số biến môi trường như là

- NVM_DIR: dùng để xác định script của nvm, node và npm
- PYTHON_PATH: là đường dẫn tuyệt đối từ root tới home tới python trong môi trường ảo. Môi trường ảo của Python được cài đặt ở trong các script trước.
- TEMP_PATH: là đường dẫn tuyệt đối tới thư mục tạm, để chứa kết quả trả về cho người dùng.
- UPLOADS_PATH: là dường dẫn tuyệt đối tới thư mục mà ảnh của người dùng sẽ được upload ở đây. Backend sẽ lấy ảnh ở trong này và tải lên S3 Bucket.

Trong đó, chúng ta có `AWS_REGION` (là Region mà các S3 Buckets được đặt) và `BUCKET_NAME` (tên của Bucket chứa ảnh) cần phải được chỉnh sửa lại cho phù hợp. Khi chỉnh sửa xong thì

- Ấn **ESC** để quay về Normal Mode
- Ẩn tổ hợp **Shift + ;** để mở Command
- Gõ **:wq** để lưu và thoát

![5-host-web-server](/images/5-host-web-server/5-5-2-setup-env-in-script.png)

#### Build docker image

Theo như các hướng dẫn của lệnh push ở trên mà chúng ta xem hồi nãy, thì đầu tiên phải đăng nhập vào trong Docker với credential lấy từ trên ECR thông qua lệnh `aws ecr get-login-password`

![5-host-web-server](/images/5-host-web-server/5-5-3-login-to-docker.png)

Sau khi đăng nhập được rồi thì chúng ta tiến hành đóng gói thành Docker image

![5-host-web-server](/images/5-host-web-server/5-5-4-build-docker-image.png)

Kiểm tra lại image đã được build chưa với lệnh `docker image ls` và cuối cùng là đẩy image lên trên repository mà chúng ta tạo ở bước trước

![5-host-web-server](/images/5-host-web-server/5-5-5-push-docker-image-to-ecr.png)

Vào trong repository đó để kiểm tra

![5-host-web-server](/images/5-host-web-server/5-5-6-check-docker-image.png)

Như vậy thì hiện tại docker image đã tồn tại ở trong private repository của chúng ta, bước tiếp theo chúng ta sẽ triển khai web server.

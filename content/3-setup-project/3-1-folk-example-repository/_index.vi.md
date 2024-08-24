+++
title = "Sao chép một dự án mẫu"
date = 2024
weight = 1
chapter = false
pre = "3.1. "
+++

{{% notice note %}}
Để tiếp tục, bạn nên có một tài khoản github và có cài đặt git ở trong máy tính cá nhân.
{{% /notice %}}

#### Tạo một repository ở trên Github

Trên thực tế, các ứng dụng của chúng ta sẽ được quản lý với các trình quản lý mã nguồn như Github, Gitlab hoặc bất kì trình quản lý nào đó khác, vì thế trong bài này chúng ta sẽ sao chép lại một dự án mẫu để coi nhưng là dự án thật của chúng ta.

Trong bài này chúng ta sẽ thực hiện với Github, chúng ta sẽ vào mã nguồn dự án đó thông qua đường dẫn này `https://github.com/FCJ-DNTU/imga`.

![3-setup-project](/images/3-setup-project/3-1-1-folk-repository.png)

Trên màn hình, chúng ta ấn vào nút Fork. Và điền các thông tin cần thiết

![3-setup-project](/images/3-setup-project/3-1-2-create-folk.png)

Sau đó là ấn **Create fork**, và chúng ta đã có được bản sao của dự án này ở trong tài khoản Github.

![3-setup-project](/images/3-setup-project/3-1-3-folked-repository.png)

Dự án này sẽ được sao chép về máy vi tính trong local và máy chủ EC2 trong môi trường phát triển, để thực hiện các công việc phát triển.

+++
title = "Store images from users"
date = 2024
weight = 2
chapter = false
pre = "4.2. "
+++

In practice, we will need to store necessary images from users (if they allow) to test the image processing algorithm to ensure it works correctly. In this section, we will create an S3 Bucket to store images from end users.

#### Creating an S3 Bucket

Similar to creating the S3 Bucket for storing the website (without enabling the **Static website hosting** feature), go to the S3 interface:

- Click **Create bucket**

We will configure this S3 bucket with the following details:

- Name: `imga-images`
- Object Ownership: ACLs disable

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-11-setup-s3-bucket-for-images.png)

- Check **Block all public access**

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-12-setup-s3-bucket-for-images.png)

In this step, use the default encryption type and disable the Bucket key, similar to before.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-13-setup-and-create-images-bucket.png)

Click **Create bucket**, and now we have 2 S3 Buckets.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-14-check-buckets.png)

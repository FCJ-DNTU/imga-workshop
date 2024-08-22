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

**INSERT IMAGE HERE**

- Check **Block all public access**

**INSERT IMAGE HERE**

In this step, use the default encryption type and disable the Bucket key, similar to before.

**INSERT IMAGE HERE**

Click **Create bucket**, and now we have 2 S3 Buckets.

**INSERT IMAGE HERE**

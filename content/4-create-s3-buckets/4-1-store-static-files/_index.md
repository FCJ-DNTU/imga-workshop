+++
title = "Store static files"
date = 2024
weight = 1
chapter = false
pre = "4.1. "
+++

In this guide, our application will be a web application, so when the end user accesses our website, their browser will load the web application's content through CloudFront. That's why we need to configure S3 for the web application in this step to serve as the **Origin** for CloudFront.

#### Creating an S3 Bucket

In the main console interface:

- Search for `S3`
- Select **S3**
- Click **Create bucket**

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-1-search-s3.png)
![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-2-s3-page.png)

This S3 Bucket will be created in the `ap-southeast-1` Region. The bucket will have the following details:

- Name: `imga-website`
- Object Ownership: Since this is a private bucket, we will select **ACLs disable**.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-3-setup-s3-bucket-for-website.png)

- Block Public Access settings for this bucket: Check **Block all public access**
- Bucket versioning: Enable (as we may have multiple updates for the application)

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-4-setup-s3-bucket-for-website.png)

- Encryption type: Server-side encryption with Amazon S3 managed keys (SSE-S3) (default)
- Bucket key: Disable

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-5-setup-and-create-website-bucket.png)

After creation, we can review the settings.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-6-website-bucket-is-created.png)

#### Enabling Static Website Hosting

Now, we will enter this bucket, go to the **Properties** tab.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-7-website-bucket-properties.png)

Scroll to the bottom to find **Static website hosting**, and click **Edit**.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-8-edit-static-website-hosting.png)

We will configure it as shown in the image below.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-9-setup-static-website-hosting.png)

Then, confirm the configuration. After enabling this feature, we can see the following in the **Properties** section.

![4-create-s3-buckets](/images/4-create-s3-buckets/4-1-10-check-result.png)

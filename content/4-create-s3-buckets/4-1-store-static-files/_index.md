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

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

This S3 Bucket will be created in the `ap-southeast-1` Region. The bucket will have the following details:

- Name: `imga-website`
- Object Ownership: Since this is a private bucket, we will select **ACLs disable**.

**INSERT IMAGE HERE**

- Block Public Access settings for this bucket: Check **Block all public access**
- Bucket versioning: Enable (as we may have multiple updates for the application)

**INSERT IMAGE HERE**

- Encryption type: Server-side encryption with Amazon S3 managed keys (SSE-S3) (default)
- Bucket key: Disable

**INSERT IMAGE HERE**

After creation, we can review the settings.

**INSERT IMAGE HERE**

#### Enabling Static Website Hosting

Now, we will enter this bucket, go to the **Properties** tab.

**INSERT IMAGE HERE**

Scroll to the bottom to find **Static website hosting**, and click **Edit**.

**INSERT IMAGE HERE**

We will configure it as shown in the image below.

**INSERT IMAGE HERE**

Then, confirm the configuration. After enabling this feature, we can see the following in the **Properties** section.

**INSERT IMAGE HERE**

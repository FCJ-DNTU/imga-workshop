+++
title = "Create S3 Buckets"
date = 2024
weight = 4
chapter = false
pre = "4. "
+++

In this guide, we need to create 2 S3 Buckets to:

- Store the packaged web application, which is built from GitHub.
- Store images uploaded by users (used for improving the image processing algorithm later).

Both of these S3 Buckets are private, meaning they do not allow external requests for data from S3, and can only be accessed by services and users within our cloud platform.

#### Table of Contents

1. [Create an S3 Bucket to store the web application](4-1-store-static-files)
2. [Create an S3 Bucket to store user-uploaded images](4-2-store-images-from-users)

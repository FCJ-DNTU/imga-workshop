+++
title = "Create distribution in CloudFront"
date = 2024
weight = 1
chapter = false
pre = "6.1. "
+++

#### Set Up CloudFront

In the main interface:

- Search for `CloudFront`.
- Select **CloudFront**.

**INSERT IMAGE HERE**

You will see the **Distribution** interface. Click **Create distribution**.

**INSERT IMAGE HERE**

Here, we need to fill in a few details:

- **Origin**: This is the endpoint of the S3 Bucket that holds the web application content (in this case, `imga-website`).
- **Name**: It will be automatically generated, or you can assign a custom name here.
- **Origin access**:
  - Select **Legacy access identities**.
  - Click to create a new OAI (Origin Access Identity), as the S3 Bucket needs to know which principal is accessing its resources. Here, we create an OAI so that we can later configure the resource-based policy.
  - Then, select **Yes, update the bucket policy**.

**INSERT IMAGE HERE**

Next, leave the following configurations as default.

**INSERT IMAGE HERE**

And these configurations as well.

**INSERT IMAGE HERE**

In the **Web Application Firewall (WAF)** section, turn off the firewall feature since we won't be using it in this workshop. Under the **Settings** section:

- **Price class**: Choose "Use all edge locations" (to distribute to all Edge Locations for optimal performance).
- **Default root object**: Set to `index.html`.
- Leave the remaining configurations as default.

**INSERT IMAGE HERE**

Once created, you will see that the distribution is being deployed to the Edge Locations.

**INSERT IMAGE HERE**

In the **Origins** tab, expand the **Origin access** column. You will see a string after the final **/**. Copy this string for later use.

**INSERT IMAGE HERE**

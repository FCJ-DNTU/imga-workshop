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

![6-host-web-application](/images/6-host-web-application/6-1-1-search-cloudfront.png)

You will see the **Distribution** interface. Click **Create distribution**.

![6-host-web-application](/images/6-host-web-application/6-1-2-distribution-page.png)

Here, we need to fill in a few details:

- **Origin**: This is the endpoint of the S3 Bucket that holds the web application content (in this case, `imga-website`).
- **Name**: It will be automatically generated, or you can assign a custom name here.
- **Origin access**:
  - Select **Legacy access identities**.
  - Click to create a new OAI (Origin Access Identity), as the S3 Bucket needs to know which principal is accessing its resources. Here, we create an OAI so that we can later configure the resource-based policy.
  - Then, select **Yes, update the bucket policy**.

![6-host-web-application](/images/6-host-web-application/6-1-3-setup-distribution.png)

Next, leave the following configurations as default.

![6-host-web-application](/images/6-host-web-application/6-1-4-setup-distribution.png)

And these configurations as well.

![6-host-web-application](/images/6-host-web-application/6-1-5-setup-distribution.png)

In the **Web Application Firewall (WAF)** section, turn off the firewall feature since we won't be using it in this workshop. Under the **Settings** section:

- **Price class**: Choose "Use all edge locations" (to distribute to all Edge Locations for optimal performance).
- **Default root object**: Set to `index.html`.
- Leave the remaining configurations as default.

![6-host-web-application](/images/6-host-web-application/6-1-6-setup-distribution.png)

Once created, you will see that the distribution is being deployed to the Edge Locations.

![6-host-web-application](/images/6-host-web-application/6-1-7-check-result.png)

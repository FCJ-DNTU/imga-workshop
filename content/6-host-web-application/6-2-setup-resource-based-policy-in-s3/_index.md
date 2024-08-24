+++
title = "Setup resource-based policy in S3"
date = 2024
weight = 2
chapter = false
pre = "6.2. "
+++

#### Grant Access to the S3 Bucket for CloudFront

In the **Origins** tab, expand the **Origin access** column. You will see a string after the final **/**, copy it.

![6-host-web-application](/images/6-host-web-application/6-2-1-view-distribution-origin-info.png)

Go back to S3 and open the `imga-website` Bucket. In the **Permissions** tab, under the Bucket Policy section:

![6-host-web-application](/images/6-host-web-application/6-2-2-setup-resource-based-policy-in-website-bucket.png)

If the policy was automatically created during the CloudFront setup, no further action is needed. However, if no policy exists, we will need to add one manually. Click **Edit** to open the policy editing interface like this:

![6-host-web-application](/images/6-host-web-application/6-2-3-add-policy-and-apply.png)

You can use the following sample policy:

```json
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E3H1YR9ZE7FBTA"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::imga-website/*"
    }
  ]
}
```

+++
title = "What are CloudFront and S3?"
date = 2024
weight = 3
chapter = false
pre = "1.3. "
+++

#### Basic Concepts

In AWS, each EC2 instance is typically associated with an EBS (Elastic Block Store) volume (in some cases, multiple EC2 instances can connect to an EBS volume). If EC2 instance A needs to access files or resources on EC2 instance B, a different method must be used because EC2 instance A cannot directly connect to the EBS volume of EC2 instance B to retrieve data.

In this scenario, an alternative solution is S3 (Simple Storage Service), which is also a data storage service. However, unlike EBS, S3 is not located in the same availability zone as the EC2 instance; instead, it is positioned elsewhere to ensure high availability and data security. This allows multiple EC2 instances to share resources, such as static website data.

If we deploy a web application using S3, but a significant portion of our users are located on the other side of the world, we need a Content Delivery Network (CDN) to help users in that region access the content faster. In this case, we will use CloudFront.

#### CloudFront

CloudFront requires a data source, known as an Origin, to create distributions based on the original data from the Origin. Once created, CloudFront distributes the web application’s data to the necessary Edge Locations and manages these distributions.

To enable faster deployment, CloudFront uses a caching mechanism on the distribution. After the cache expires (usually after one day), CloudFront will request fresh data from the Origin. If no new data is available, CloudFront will reset the expiration time for the distribution.

#### S3 with CloudFront

When using S3 with CloudFront, S3 must block public access and enable the hosting of static web applications. For CloudFront to access S3, CloudFront needs to configure an OAI (Origin Access Identity) so that S3 can authenticate CloudFront using a resource-based policy. Additionally, we can manage the lifecycle and versioning of data stored in S3. By combining this feature, we can effectively manage the cache of the distribution on CloudFront.

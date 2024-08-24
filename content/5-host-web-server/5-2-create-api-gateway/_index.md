+++
title = "Create API Gateway"
date = 2024
weight = 2
chapter = false
pre = "5.2. "
+++

#### Create API Gateway

In the main interface:

- Search for `API Gateway`
- Select **API Gateway**

![5-host-web-server](/images/5-host-web-server/5-2-1-search-api-gw.png)

- Here, we will create an API of type **HTTP**

![5-host-web-server](/images/5-host-web-server/5-2-2-build-http-api.png)

- Name: `imga-api`

![5-host-web-server](/images/5-host-web-server/5-2-3-setup-api.png)

We will create the routes later, so for now, skip this step.

![5-host-web-server](/images/5-host-web-server/5-2-4-configure-routes.png)

Next, the API Gateway needs to know which stage we are deploying. For now, we'll leave it as default. The API Gateway will append the stage name to the base URL.

![5-host-web-server](/images/5-host-web-server/5-2-5-define-stages.png)

Finally, review the configuration and click **Create**.

![5-host-web-server](/images/5-host-web-server/5-2-6-review-and-create.png)

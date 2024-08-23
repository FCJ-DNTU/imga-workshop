+++
title = "Create a private repository in ECR"
date = 2024
weight = 4
chapter = false
pre = "5.4. "
+++

Before we can push a Docker image to ECR, we need to create a repository. This repository will be private, requiring authentication and authorization.

#### Create a Private Repository

In the main interface:

- Search for `ECR`.
- Select **Elastic Container Registry**.

**INSERT IMAGE HERE**

- Click **Create** to start creating the repository.

**INSERT IMAGE HERE**

Here, we'll fill in some information:

- **Repository name**: `imga/server`
- **Image tag mutability**: Select **Immutable** (this prevents Docker image tags from being overwritten, helping us manage image versions).

**INSERT IMAGE HERE**

In the **Encryption settings**:

- Select **AES-256**.

**INSERT IMAGE HERE**

After creation, under **Private Registry**, you will see the repository we just created listed.

**INSERT IMAGE HERE**

If you go into this repository, you won't see any images yet.

**INSERT IMAGE HERE**

Click **View push commands**, and you will see instructions on how to push a Docker image to ECR.

**INSERT IMAGE HERE**

This includes commands for logging into Docker, obtaining the repository endpoint, building the image, tagging it, and finally pushing the image to the repository.

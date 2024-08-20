+++
title = "What is Network Load Balancer?"
date = 2024
weight = 2
chapter = false
pre = "1.2. "
+++

#### Basic Concepts
Load balancing is a feature that helps evenly distribute network traffic and requests to different targets. Since it is a feature, it operates at the logic layer, and can be provided by a server or even as a separate feature managed by a dedicated device, known as a load balancer.

On AWS, there are three types of load balancers. These types have different components, mostly similar (but still different) targets, and most importantly, the criteria for packet forwarding also differ. They are:
- **Application Load Balancer**: A load balancer that forwards requests based on the user’s request to a target, such as a server or a container. It operates at Layer 7 of the OSI network model.
- **Network Load Balancer**: A load balancer that forwards requests based on information in the packet rather than the request, to a target such as a server, container, or even another load balancer. It operates at Layer 3 of the OSI network model.
- **Gateway Load Balancer**: A load balancer that can forward packets like the two types above, but its targets are broader, such as a VPC or an on-premises environment. It operates at both Layer 7 and Layer 3 of the OSI network model.

#### Target Groups
The load balancer gathers information about the targets within the same group, allowing it to forward packets to one of the different targets in a group.

In this case, the target of the NLB will be the EC2 server. We will use the NLB to connect to the API Gateway through a VPC Link.

#### Health Checks for Targets
The load balancer needs to know whether the targets it forwards packets to are still operational. The load balancer sends a request to the target server or directly to the server (if the server is the target). If the load balancer does not receive a response, it will remove or "forget" that target to avoid forwarding packets to it.
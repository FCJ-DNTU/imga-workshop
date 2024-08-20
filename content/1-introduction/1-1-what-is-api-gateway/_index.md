+++
title = "What is API Gateway?"
date = 2024
weight = 1
chapter = false
pre = "1.1. "
+++

#### Basic Concepts
In our system, not only do we have APIs/Endpoints from the main web server, but we also have APIs/Endpoints from other servers in the system, or from other AWS services. We want to expose these APIs/Endpoints to end-users, third-party applications, or our own system. In this case, we need a service to centrally manage all these APIs/Endpoints into a single service.

API Gateway also helps secure the system by using authentication mechanisms from another service or a third-party, as well as securing the API itself by preventing harmful attacks from the internet.

To better understand this workshop, we will briefly go through some concepts below.

#### Integration
API Gateway acts as a central management hub for APIs/Endpoints. Therefore, we need to let this service know which APIs/Endpoints it will manage by integrating these APIs/Endpoints into the API Gateway with a component called Integration.

There are two types of integration: Public Integration and Private Integration. Public Integration is an open integration where the APIs can be accessed from the Internet/other VPCs/third parties; Private Integration is a closed integration where the APIs can only be used internally within the same VPC and cannot go anywhere else. Typically, we will use Private Integration.

#### Method & Integration request/response
Since we are centrally managing APIs/Endpoints, there are some scenarios such as:

- The data structure sent from the client application and the data structure that the servers expect to receive may differ.
- The data structure from a client application's request may be forwarded to two different servers, each receiving a different structure.
- Multiple client applications may use the same server, but each client application will have different data structures.

From there, we have the concepts of method request and integration request. Specifically:
- Method request: defined by the client application.
- Integration request: normalizes those data structures so that the internal server can read them.

Similarly, when the server responds, the response data structure may not match the client application, so we also have the concepts of method response and integration response. Specifically:
- Method response: received by the client application.
- Integration response: defined by the server.

![api_gateway_flow-en](/images/1-introduction/api_gateway_flow-en.png)

#### VPC Link
It is a feature using "private link" that allows API Gateway to connect to a Private VPC through a private network link.
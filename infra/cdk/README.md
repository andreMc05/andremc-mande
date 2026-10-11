# AWS CDK (deferred)

Stacks planned:

- **data-stack** — DynamoDB (contact submissions, project changelog events, shop order events)
- **api-stack** — Lambda + API Gateway (if/when traffic moves off Vercel Route Handlers)
- **assets-stack** — S3 / CloudFront if needed

v1 contact API uses **Vercel Route Handlers** in `apps/web`. Scaffold CDK when that surface needs DynamoDB or webhooks.

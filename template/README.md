# Twitter/GKE Demo
This example provide a simple integration between [RELE.AI](https://rele.ai) and [Twitter](https://twitter.com) to showcase an API Integration and deployment to [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine).

## Authenticate with RELE.AI
To get access to RELE.AI, run the command below and follow the instructions on the webpage.

```bash
rb auth:login
```

## Prepare environment
Install node dependencies

```bash
npm install
```

Export RELE.AI's app credentials

```bash
# get credentials and export them to the .env file
rb app:tokens | grep "APP_" >> .env
```

## Local Development
To start a local development server, run:

```bash
# from the project root directory
npm run dev
```

## GKE Deployment
To deploy the project to GKE, run:

```bash
# from the project root directory
rb deploy:user
```

# WhatsApp Usage
1. Send to RELE.AI's WhatsApp number the new tweet command `/new-tweet`

2. Once RELE.AI requested the tweet content reply back with the tweet you want to publish

3. RELE.AI will send back a confirmation that the tweet is published.

You can go to your Twitter account and see the your tweet :-)

# Support
If you have any questions, please reach out to our [support team](mailto:support@rele.ai)

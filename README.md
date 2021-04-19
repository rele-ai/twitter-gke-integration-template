# Twitter/GKE Integration Demo

This template provides an example for an integration between [RELE.AI](https://rele.ai) and [Twitter](https://twitter.com) running on top of [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine).

## Requirements
- Google Cloud Account
- `gcloud`
- Twitter Credentials (with read/write permissions)
- Kubectl
- Terraform (We recommend [tfenv](https://github.com/tfutils/tfenv))
- [RELE.AI CLI](https://github.com/rele-ai/cli) (version 0.1.15 and above)

## Usage
Initiate a project using this template by running the `rb create` command:

```
rb create rb-twitter -t rele-ai/twitter-gke-integration-template#main
```

<!-- ### GKE Access
To provide access to GKE, export an appropriate service to your `GOOGLE_APPLICATION_CREDENTIALS`

```bash
export GOOGLE _APPLICATION_CREDENTIALS=[PATH TO SERVICE ACCOUNT FILE]
```

### Twitter Access
To provide access to a twitter account export your twitter API KEY to`TWITTER_API_KEY`

```bash
export TWITTER_API_KEY=[YOUR TWITTER API KEY]
``` -->

### Install Dependencies
Install local dependencies:

```bash
# From the project root directory
npm install
```

### Local development
To run a local server, run:

```bash
# From the project root directory
npm run dev
```

### Deployment
To deploy the server to GKE

```bash
# From the project root directory
npm run deploy
```


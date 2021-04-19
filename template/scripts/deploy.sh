#!/bin/bash

# global variables
WORKING_DIR=$(pwd)
PROJECT_ID={{ GOOGLE_PROJECT_ID }}

# load .env
set -o allexport; source .env; set +o allexport

# initiate terraform and provision GKE cluster
cd $WORKING_DIR/terraform
terraform init
terraform apply -auto-approve
cd $WORKING_DIR

# connect to gke cluster
gcloud container clusters \
	get-credentials releai-twitter \
	--region us-central1 \
	--project $PROJECT_ID

# build docker image
if [[ $(uname -m) == 'arm64' ]]; then
	docker buildx \
		build --platform=linux/amd64,linux/arm64,linux/arm/v7 \
		. -t gcr.io/$PROJECT_ID/releai-twitter \
		--build-arg TWITTER_CONSUMER_KEY=$TWITTER_CONSUMER_KEY \
		--build-arg TWITTER_CONSUMER_SECRET=$TWITTER_CONSUMER_SECRET \
		--build-arg TWITTER_ACCESS_TOKEN_KEY=$TWITTER_ACCESS_TOKEN_KEY \
		--build-arg TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET \
		--build-arg APP_ID=$APP_ID \
		--build-arg APP_HASH=$APP_HASH \
		--push
else
	docker build . -t releai-twitter \
		--build-arg TWITTER_CONSUMER_KEY=$TWITTER_CONSUMER_KEY \
		--build-arg TWITTER_CONSUMER_SECRET=$TWITTER_CONSUMER_SECRET \
		--build-arg TWITTER_ACCESS_TOKEN_KEY=$TWITTER_ACCESS_TOKEN_KEY \
		--build-arg TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET \
		--build-arg APP_ID=$APP_ID \
		--build-arg APP_HASH=$APP_HASH

	# push docker to GCR
	docker tag releai-twitter gcr.io/$PROJECT_ID/releai-twitter
	docker push gcr.io/$PROJECT_ID/releai-twitter
fi


# login to GCR
cat $GOOGLE_APPLICATION_CREDENTIALS | docker login -u _json_key --password-stdin https://gcr.io

# copy docker configs to k8s
kubectl create secret generic regcred \
	--from-file=.dockerconfigjson=$HOME/.docker/config.json \
	--type=kubernetes.io/dockerconfigjson

# let kubectl use the service account to pull images
kubectl create secret docker-registry gcr-json-key \
	--docker-server=gcr.io \
	--docker-username=_json_key \
	--docker-password="$(cat $GOOGLE_APPLICATION_CREDENTIALS)" \
	--docker-email=support@rele.ai

# update default service account
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "gcr-json-key"}]}'

# apply k8s configurations
kubectl apply -f "$WORKING_DIR/k8s/twitter-app.yaml"

# update configs with latest cluster host
CLUSTER_HOST=$(kubectl get service releai-twitter | awk  '{print $4}' | grep -v IP)

# replace placeholder with cluster host
sed -i'.bkp' "s/PLACEHOLDER_BASE_URL/$CLUSTER_HOST/g" "$WORKING_DIR/configs/app.yaml"

# apply changes
rb apply -f "$WORKING_DIR/configs/app.yaml"

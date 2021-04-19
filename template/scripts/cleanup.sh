#!/bin/bash

# global variables
WORKING_DIR=$(pwd)

# initiate terraform and provision GKE cluster
cd $WORKING_DIR/terraform
terraform destroy -auto-approve
cd $WORKING_DIR

# clean releai configurations
rb workflow:deactivate publish_tweet -d user
rb delete -f "$WORKING_DIR/configs"

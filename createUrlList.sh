#!/bin/bash

# This script creates a list of URLs of md files.
# The list is saved in a file named posts/url.json

# Create the posts directory if it does not exist
mkdir -p posts

# Create the url.json file
echo "[" > posts/url.json

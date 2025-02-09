#!/bin/bash
sudo docker build --build-arg PORT=8080 -t \"sysvisionz\" . && rm -r certs
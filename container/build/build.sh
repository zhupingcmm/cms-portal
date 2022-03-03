!#/bin/bash

# build ui image
docker build -t pingzhu/cms-portal-ui:1.0.2 -f ui/Dockerfile .

# build portal image
docker build -t pingzhu/cms-portal-ui:1.0.0 -f Dockerfile .
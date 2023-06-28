FROM node:18.6-slim

LABEL maintainer="DocNetwork <webteam@docnetwork.org>"

ARG codeArtifactToken

WORKDIR /dn-dev-availability-service

COPY . /dn-dev-availability-service/


RUN npm config set registry=https://dn-878788551012.d.codeartifact.us-east-1.amazonaws.com/npm/dn-npm-public/
RUN npm config set //dn-878788551012.d.codeartifact.us-east-1.amazonaws.com/npm/dn-npm-public/:always-auth=true
RUN npm config set //dn-878788551012.d.codeartifact.us-east-1.amazonaws.com/npm/dn-npm-public/:_authToken="${codeArtifactToken}"

RUN npm ci --omit=dev --ignore-scripts


ENTRYPOINT [ "npm", "run", "start" ]


# roughly based on https://github.com/BretFisher/node-docker-good-defaults
FROM node:6-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# install dumb-init
RUN apk add --no-cache wget ca-certificates \
    && update-ca-certificates \
    && wget -O /sbin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 \
    && chmod +x /sbin/dumb-init \
    && apk del wget ca-certificates \
    && rm -rf /var/cache

# install dependencies
WORKDIR /opt
COPY package.json /opt
RUN npm install && npm cache clean
ENV PATH /opt/node_modules/.bin:$PATH

# copy app
WORKDIR /opt/app
COPY . /opt/app

ARG VERSION
ARG VCS_URL
ARG VCS_REF
ARG BUILD_DATE

# http://label-schema.org/rc1/ metadata
LABEL maintainer="sitcomlab" \
    org.label-schema.vendor="sitcom" \
    org.label-schema.url="https://github.com/sitcomlab/Ethics-app" \
    org.label-schema.name="Ethics-app" \
    org.label-schema.description="Ethics-application for the approval of user-studies" \
    org.label-schema.version=$VERSION \
    org.label-schema.vcs-url=$VCS_URL \
    org.label-schema.vcs-ref=$VCS_REF \
    org.label-schema.build-date=$BUILD_DATE \
    org.label-schema.docker.schema-version="rc1"

ENTRYPOINT ["/sbin/dumb-init", "--"]
CMD [ "node", "server.js" ]
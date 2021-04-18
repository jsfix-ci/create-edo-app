FROM node:14.16.0-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN apk add --no-cache git && npm ci

CMD ["node", "src/index.js"]

USER node

HEALTHCHECK --interval=2m --timeout=10s --retries=5 \
  CMD node ./src/healthcheck.mjs

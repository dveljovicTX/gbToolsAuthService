FROM node:16-alpine
RUN apk update && apk add dumb-init

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

RUN addgroup -g 11130 gb-bid-priority
RUN adduser -D -H -u 11130 -G gb-bid-priority gb-bid-priority

USER gb-bid-priority

CMD [ "node", "dist/server.js"]
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

EXPOSE 3000
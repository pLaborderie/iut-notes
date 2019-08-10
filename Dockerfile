# Installing nodejs
FROM node:10-alpine
RUN apk add --no-cache --virtual .gyp python make g++

# Installing app
COPY . /app
WORKDIR /app/frontend
RUN npm install --production && apk del .gyp
RUN npm run build
RUN mv build ../

# Running server
WORKDIR /app
ENTRYPOINT ["/bin/bash", "-c", "node index.js"]
# Installing nodejs
FROM node:10-alpine
RUN apk --no-cache add --virtual native-deps \
  make python gcc g++
RUN apk add postgresql-dev
# Add support for https on wget
RUN apk update && apk add --no-cache wget && apk --no-cache add openssl wget && apk add ca-certificates && update-ca-certificates
# Add phantomjs
RUN wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C / \
  && npm config set user 0 \
  && npm install -g phantomjs-prebuilt
# Add fonts required by phantomjs to render html correctly
RUN apk add --update ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family && rm -rf /var/cache/apk/*

# Installing app
COPY . /app
WORKDIR /app
RUN npm install
WORKDIR /app/frontend
RUN npm install --production
RUN npm run build
RUN mv build ../
RUN apk del native-deps
WORKDIR /app
CMD ["node", "index.js"]
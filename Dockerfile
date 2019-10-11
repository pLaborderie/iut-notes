# Installing nodejs
FROM node:10-alpine
RUN apk --no-cache add --virtual native-deps \
  make python gcc g++
RUN apk add postgresql-dev
# Fix for phantomjs
RUN wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C /

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
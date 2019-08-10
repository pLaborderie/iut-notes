# Installing nodejs
FROM node:alpine
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

# Installing app
COPY . /app
WORKDIR /app/frontend
RUN npm install --production
RUN npm run build
RUN mv build ../

# Running server
WORKDIR /app
ENTRYPOINT ["/bin/bash", "-c", "node index.js"]
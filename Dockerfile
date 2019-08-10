# Installing nodejs
FROM node:10-alpine
RUN apk --no-cache add --virtual native-deps \
  make python gcc postgresql-dev g++

# Installing app
COPY . /app
WORKDIR /app/frontend
RUN npm install --production
RUN npm run build
RUN mv build ../
WORKDIR /app
RUN npm install --production
RUN apk del native-deps
ENTRYPOINT ["/bin/bash", "-c", "node index.js"]
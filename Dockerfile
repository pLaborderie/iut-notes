# Installing nodejs
FROM node:10-alpine
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python libpq && \
  npm install --quiet node-gyp -g

# Installing app
COPY . /app
WORKDIR /app/frontend
RUN npm install --production && apk del native-deps
RUN npm run build
RUN mv build ../
WORKDIR /app
RUN npm install --production
ENTRYPOINT ["/bin/bash", "-c", "node index.js"]
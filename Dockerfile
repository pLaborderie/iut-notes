# Installing nodejs
FROM node:10-alpine
RUN apk --no-cache add --virtual native-deps \
  make python gcc g++
RUN apk add postgresql-dev

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
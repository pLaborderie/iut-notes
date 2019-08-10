# Installing nodejs
FROM ubuntu:18.04
RUN apt-get update && apt-get install -y curl && apt-get install -y libfontconfig
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# Installing app
COPY . /app
WORKDIR /app/frontend
RUN npm install --production
RUN npm run build
RUN mv build ../

# Running server
WORKDIR /app
ENTRYPOINT ["/bin/bash", "-c", "node index.js"]
# Installing nodejs
FROM ubuntu:16.04
RUN apt-get update && apt-get install -y curl && apt-get install -y libfontconfig
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# Adding env variables
ENV NODE_ENV="PRODUCTION"
ENV PORT="4000"
ENV FOREST_ENV_SECRET="57480dedc567cabdd1c9fd1bbc0858abef25612985baa804091f6b2ce69d1532"
ENV FOREST_AUTH_SECRET="6a3b123e69f8b7561f23f71bfa43a59c82d1525fbb63b903"
ENV PG_DATABASE="iut_notes"
ENV PG_USERNAME="plaborderie"
ENV PG_PASSWORD="Broubrou_64480"
ENV PG_HOST="iut-notes.cxsgolo16pau.eu-west-1.rds.amazonaws.com"

# Installing app
COPY . /app
WORKDIR /app/frontend
RUN npm install --production
RUN npm run build
RUN mv build ../

# Running server
WORKDIR /app
ENTRYPOINT ["/bin/bash", "-c", "node index.js"]
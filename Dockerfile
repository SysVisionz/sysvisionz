ARG PORT

FROM node:latest

USER root

RUN ["cp" "/etc/letsencrypt/live/sysvisionz.com/*" "./certs/sysvisionz.com/"]

COPY /certs/ /var/www/html/certs/sysvisionz.com
COPY package.json package-lock.json src server-ts .eslintrc.json tsconfig.json /var/www/html/sysvisionz.com/
COPY package.json package-lock.json src server-ts .eslintrc.json tsconfig.json /var/www/html/sysvisionz.com2/

WORKDIR /src

COPY .npmrc-prod ./.npmrc
COPY .env-prod ./.env

RUN npm ci
RUN npm run build
RUN rm -rf ./src ./server-ts
RUN npm run start port=$PORT

EXPOSE $PORT
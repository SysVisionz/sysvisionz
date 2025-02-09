ARG PORT

FROM node:latest
WORKDIR /src
copy /etc/letsencrypt/live/sysvisionz.com /var/www/html/certs/sysvisionz.com

COPY package.json package-lock.json src server-ts ./eslintrc.json tsconfig.json ./
COPY .npmrc-prod ./.npmrc
COPY .env-prod ./.env

RUN npm ci
RUN npm run build
RUN rm -rf ./src ./server-ts
RUN npm run start port=$PORT
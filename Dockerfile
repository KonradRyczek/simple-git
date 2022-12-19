FROM node:16-bullseye AS development

WORKDIR /var/www/simple-git/server

COPY server/package.json ./
COPY server/yarn.lock ./
COPY server/prisma ./prisma/

RUN yarn install

COPY server/ .

RUN yarn build

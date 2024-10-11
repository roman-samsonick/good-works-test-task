FROM node:18-alpine

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 4000
CMD yarn run start:prod

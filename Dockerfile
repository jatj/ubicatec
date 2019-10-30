FROM node:10
ARG ENV

WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD npm run start:prod

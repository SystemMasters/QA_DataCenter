FROM node:14.17

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD node server/index.js



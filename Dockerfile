FROM node:14-alpine as base

COPY . /

EXPOSE 5000

ENV NODE_ENV=production

RUN npm install

CMD ["npm", "start"]

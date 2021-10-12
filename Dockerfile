#FROM node:14-alpine as base

FROM 727792597635.dkr.ecr.us-east-1.amazonaws.com/imagegold:latest as base

COPY . /

EXPOSE 5000

ENV NODE_ENV=production

RUN npm install

CMD ["npm", "start"]

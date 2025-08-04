FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# ci ka mtlb hai clean install jo exact version hai tmhare package.json usme kr dega.
RUN npm ci  

COPY . .








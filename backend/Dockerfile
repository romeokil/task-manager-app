FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# install including dev dependencies (for nodemon)
RUN npm install --include=dev

COPY . .

EXPOSE 8000

CMD ["nodemon", "index.js"]

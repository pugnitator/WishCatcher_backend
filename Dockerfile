FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /app/public
COPY ./public /app/public

EXPOSE 3000

CMD ["node", "index.js"]
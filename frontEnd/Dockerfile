FROM node:17-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm install --save --legacy-peer-deps

RUN npm config set legacy-peer-deps true

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
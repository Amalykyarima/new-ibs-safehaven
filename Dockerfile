# Step 1

FROM node:18.16-alpine as compile-image

WORKDIR /app

COPY package.json package*.json ./

RUN npm install --force

COPY . ./

RUN npm run build:production

CMD ["node", "server.js"]

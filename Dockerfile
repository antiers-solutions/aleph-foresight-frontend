FROM node:18.19.0

WORKDIR /src

COPY . .
# COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm run build


EXPOSE 3000

CMD ["npm","run","start"]


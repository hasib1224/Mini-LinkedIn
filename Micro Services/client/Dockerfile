FROM node:18-alpine

WORKDIR /mini-linkedin/frontend

COPY package.json .

RUN npm install -g nodemon 

RUN npm install

COPY . .

CMD ["nodemon", "npm", "start"] 
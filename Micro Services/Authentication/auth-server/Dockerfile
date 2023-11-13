FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /mini-linkedin/authentication

COPY . .

RUN npm install 

CMD ["npm", "run", "start"]
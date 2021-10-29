FROM node:16

ENV NODE_ENV=production
  
WORKDIR /usr/src/app

COPY . .

RUN npm ci 

ENV DEBUG=playground:*

CMD ["npm", "start"]
FROM node 

WORKDIR /backend

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 5001

CMD [ "npm","start:dev" ]





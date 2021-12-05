FROM node

WORKDIR /dist

COPY package.json /dist

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"] 
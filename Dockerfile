FROM node
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app
COPY package-lock.json /home/app

COPY /db/01-init.sql /docker-entrypoint-initdb.d/


RUN npm ci

COPY . /home/app

RUN npm run build

CMD ["npm", "run", "dev"]
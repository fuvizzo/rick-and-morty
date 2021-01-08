FROM node:12.18-alpine as base
RUN npm i npm@latest typescript ts-node -g
RUN mkdir -p /usr/src/node_app
WORKDIR /usr/src/node_app 

FROM base as prod
ENV NODE_ENV=production 

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent

ENV PATH /usr/src/node_app/node_modules/.bin:$PATH 

WORKDIR /usr/src/node_app/react-app  

COPY . . 

RUN npm run build

USER node

CMD node .

FROM base as dev
ENV NODE_ENV=development 

COPY package.json  ./

RUN npm install

RUN  npm link ts-node

ENV PATH /usr/src/node_app/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR /usr/src/node_app/react-app 
COPY . .  

CMD ["npm", "start"]

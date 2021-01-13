FROM node:14

EXPOSE 3001

# Use latest version of npm
RUN npm i npm@latest -g

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

# copy in our source code last, as it changes the most
WORKDIR /opt
COPY . .

CMD [ "node", "app/index.js" ]
FROM whastings/node_with_nvm:latest

RUN mkdir /app

# Install dependencies.
WORKDIR /
ADD ./package.json package.json
RUN npm config set registry http://registry.npmjs.org/ # TODO: Why won't https work?
RUN npm install

# Start app.
WORKDIR /app
ENTRYPOINT ["node", "keystone.js"]

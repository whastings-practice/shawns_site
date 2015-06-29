FROM whastings/node_with_nvm:latest

RUN mkdir /app

# Install dependencies.
WORKDIR /
RUN npm config set registry http://registry.npmjs.org/ # TODO: Why won't https work?
# Global node modules:
RUN npm install -g gulp
# Core node dependencies (for caching):
RUN npm install \
  async@0.9.x \
  bootstrap-sass@3.3.x \
  cloudinary@1.0.x \
  dotenv@1.1.x \
  express-handlebars@1.1.x \
  handlebars@2.0.x \
  jquery@2.1.x \
  keystone@0.3.x \
  moment@2.8.x \
  node-sass@2.1.x \
  node-sass-middleware@0.5.x \
  underscore@1.8.x
# Other node dependencies:
ADD ./package.json package.json
RUN npm install

# Start app.
WORKDIR /app
ENTRYPOINT ["npm", "start"]

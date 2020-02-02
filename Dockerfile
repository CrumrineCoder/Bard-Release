FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . /usr/src/app

RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
EXPOSE 3000
CMD ["webpack-dev-server --mode development --devtool inline-source-map --hot"]
#CMD ["ls"]
#CMD [ "node", "src/server/index.js" ]
#CMD [ "npm", "run", "build" ]
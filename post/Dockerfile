FROM node:16.14.0
WORKDIR /app
RUN npm install -g npm@8.5.5
COPY ./package.json .
ARG NODE_ENV
RUN bash -c " if [ '${NODE_ENV}' = 'development' ]; then npm install; else npm install --only-production; fi"
COPY . .
CMD [ "npm", "start" ]
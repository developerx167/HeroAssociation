FROM node:16.14.0
WORKDIR /app
COPY ./package.json .
ARG NODE_ENV
RUN bash -c " if [ '${NODE_ENV}' = 'development' ]; then npm install; else npm install --only-production; fi "
COPY . .
CMD [ "npm", "start" ]
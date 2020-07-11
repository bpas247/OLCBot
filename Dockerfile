FROM node:12-alpine3.12
ARG DATABASE_URL

COPY . .

RUN yarn

CMD ["yarn", "test"]

FROM node:16 AS build-stage

ENV NODE_ENV=production

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
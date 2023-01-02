ARG REACT_APP_API_BASE_URL 
ARG REACT_APP_BASE_URL 
ARG REACT_APP_CLIENT_ID 
ARG REACT_APP_SERVER_SOCKET_URL

FROM node:14.7-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build -e REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL -e REACT_APP_BASE_URL=$REACT_APP_BASE_URL -e REACT_APP_CLIENT_ID=$REACT_APP_CLIENT_ID -e REACT_APP_SERVER_SOCKET_URL=$REACT_APP_SERVER_SOCKET_URL

FROM nginx:1.19-alpine
 
COPY --from=build /app/build /usr/share/nginx/html
FROM node:14.18.0 AS compile-front-hidro

WORKDIR /opt/ng
COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx AS nginx-hidro

COPY --from=compile-front-hidro /opt/ng/dist/ /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM node:14.16.0-alpine as build
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --prod

FROM nginx:latest
RUN chmod -R 777 /var/cache/
RUN chmod -R 777 /var/run/
#Add a user To avoid the interactive questions by adduser: --disabled-password --gecos ''
RUN adduser --disabled-password --gecos '' yoda
#Run Container as nonroot
USER yoda

COPY --from=build /app/dist/frontend  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80



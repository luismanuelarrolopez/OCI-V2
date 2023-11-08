FROM node:14-slim as build-stage
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --legacy-peer-deps
RUN npm install @swimlane/ngx-charts@19.0.1 --legacy-peer-deps
COPY . .
RUN ["npm", "run", "build-prod"]

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
RUN mkdir /usr/share/nginx/html/OficinaControlInterno
COPY --from=build-stage /usr/src/app/dist/apps/control-interno/index.html /usr/share/nginx/html/index.html
COPY --from=build-stage /usr/src/app/dist/apps/control-interno /usr/share/nginx/html/OficinaControlInterno/
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

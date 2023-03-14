FROM node:18.15.0-slim as angular-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY shared ./../shared
COPY client ./
RUN npm run release

FROM node:18.15.0-slim as server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY shared ./../shared
COPY server ./
RUN npm run build

FROM zenika/alpine-chrome:with-node
USER root
WORKDIR /app/server
COPY --from=angular-build /app/client/dist ./../client/dist
COPY --from=server-build /app/shared/*.js ./../shared/
COPY --from=server-build /app/server/package*.json ./
COPY --from=server-build /app/server/*.js ./
RUN npm install --omit=dev
EXPOSE 8080
CMD ["npm", "run", "start"]
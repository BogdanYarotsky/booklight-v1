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

FROM node:18.15.0-slim
WORKDIR /app/server
COPY --from=server-build /app/shared/*.js ./../shared/
COPY --from=server-build /app/server/*.js ./
COPY --from=server-build /app/server/package*.json ./
COPY --from=angular-build /app/client/dist ./../client/dist
RUN npm install --production

ENV IS_DOCKER true
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8080
CMD ["npm", "run", "start"]
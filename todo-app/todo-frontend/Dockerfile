FROM node:20 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm run build

RUN npm install -g serve
CMD ["serve", "dist"]

FROM build-stage as test-stage 

RUN npm ci

USER node

COPY . .

RUN npm run test
FROM node:18-alpine AS builder
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /server
COPY --from=builder /server/dist ./dist
COPY package*.json ./
RUN npm install --only=production
EXPOSE 4000

ENV PORT=""
ENV DB_URI=""
ENV DB_NAME=""
ENV JWT_SECRECT_ACCESS_TOKEN=""
ENV JWT_SECRECT_REFRESH_TOKEN=""

CMD [ "node","./dist/api/index.js" ]

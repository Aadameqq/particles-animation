FROM node:18-alpine AS builder

WORKDIR /home/app

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine AS runtime

WORKDIR /home/app

RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

COPY --from=builder /home/app/dist ./

USER app

EXPOSE 8080

CMD ["npx","http-server"]

FROM node:22-bookworm-slim

WORKDIR /app

# Dependencies required to build native Node modules such as better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/data

EXPOSE 3000

ENV NODE_ENV=development

CMD ["sh", "-c", "npm run db:seed && npm run dev -- --hostname 0.0.0.0 --port 3000"]
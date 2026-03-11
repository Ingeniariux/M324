# -------------------------
# 1️⃣ Build Stage
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /my-agenda-app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -------------------------
# 2️⃣ Production Stage
# -------------------------
FROM nginx:alpine

# Copy from the correct output directory (docs instead of build)
COPY --from=builder /my-agenda-app/docs /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# DEV
FROM node:18-alpine as dev
RUN apk add --no-cache libc6-compat
WORKDIR /usr/code/src
ENV NODE_ENV dev
RUN addgroup --system --gid 1001 nonroot
RUN adduser --system --uid 1001 nonroot
COPY --chown=nonroot:nonroot . .
RUN npm ci

USER nonroot

# PROD - BUILD
FROM node:18-alpine as build
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nonroot
RUN adduser --system --uid 1001 nonroot
COPY --chown=nonroot:nonroot --from=dev /app/node_modules ./node_modules
COPY --chown=nonroot:nonroot . .
RUN npm ci
RUN npm run build && npm prune --production
USER nonroot

# PROD - SERVER
FROM node:18-alpine as prod
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nonroot
RUN adduser --system --uid 1001 nonroot
COPY --chown=nonroot:nonroot --from=build /app/dist dist
COPY --chown=nonroot:nonroot --from=build /app/node_modules node_modules
USER nonroot
CMD ["node", "dist/main.js"]

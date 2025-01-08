FROM node:20.12-slim AS build

COPY . /frontend
WORKDIR /frontend

RUN npm install -g bun
RUN bun install --frozen-lockfile
RUN chmod +x ./crack.sh
RUN ./crack.sh
RUN bun run build

FROM node:20.12-slim

COPY --from=build /frontend/.output /frontend/.output

WORKDIR /frontend

RUN npm install -g bun

ENV NITRO_HOST=0.0.0.0 NITRO_PORT=3000

CMD ["bun", ".output/server/index.mjs"]
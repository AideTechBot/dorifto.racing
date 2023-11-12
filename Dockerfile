FROM oven/bun:debian
RUN apt-get update && apt-get install -y ffmpeg=7:4.3.6-0+deb11u1

WORKDIR /app

COPY package.json bun.lockb tsconfig.json ./
COPY src ./src
COPY songs ./songs
COPY public ./public
RUN mkdir ./temp

RUN bun install --frozen-lockfile

RUN cp node_modules/htmx.org/dist/htmx.min.js ./public/

EXPOSE 3000

CMD bun run start 

FROM node:14.16.1
WORKDIR /app
RUN ["mkdir", "dist"]
RUN ["mkdir", "server"]
COPY ./dist/* /app/dist
COPY ./server /app/server
EXPOSE 3001
CMD ["sh", "-c", "server/start.sh"]
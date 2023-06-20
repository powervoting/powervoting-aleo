FROM alpine:3.12
RUN mkdir "/app"
WORKDIR "/app"
EXPOSE 80
COPY proposals /app/app
ENTRYPOINT ["./app"]

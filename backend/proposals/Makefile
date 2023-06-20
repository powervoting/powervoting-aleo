GOPATH:=$(shell go env GOPATH)
BIN=proposals
NAME=proposals
VERSION=latest

.PHONY: proto
proto:
	@oapi-codegen  --config api/config.yaml api/openapi.json

.PHONY: build
build:
	@CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $(BIN) *.go
	@DOCKER_BUILDKIT=1 docker build -t $(NAME):$(VERSION) .
	@DOCKER_COMPOSE=3 docker-compose up -d



FROM alpine:latest

RUN apk --update --no-cache add sudo bash nano wget curl docker python \
    && apk add --no-cache --virtual=.build-dependencies py-pip python-dev libffi-dev openssl-dev gcc libc-dev make \
    && pip install docker-compose \
    && wget -q https://github.com/ahoy-cli/ahoy/releases/download/2.0.0/ahoy-bin-`uname -s`-amd64 -O /usr/local/bin/ahoy \
    && chmod +x /usr/local/bin/ahoy \
    && apk del .build-dependencies
FROM mongo

RUN apt-get update && apt-get install -y dos2unix

ARG USERNAME
ARG PASSWORD
ARG DATABASE

ENV USERNAME ${USERNAME}
ENV PASSWORD ${PASSWORD}
ENV DATABASE ${DATABASE}

COPY init.sh /docker-entrypoint-initdb.d/init.sh
RUN dos2unix /docker-entrypoint-initdb.d/init.sh

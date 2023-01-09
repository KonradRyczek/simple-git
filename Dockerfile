FROM node:16-bullseye AS development

# ARG to avoid prompts when installing dependencies
ARG DEBIAN_FRONTEND=noninteractive
# Replace below file names with your own keys:
ARG GIT_PUBLIC_KEY="id_rsa.pub"
ARG SSH_PUBLIC_KEY="ssh-key.pub"
ARG GIT_PRIVATE_KEY="id_rsa"

RUN apt-get update 
RUN apt-get install -y sudo git python2 python-setuptools sudo openssh-server


COPY sshd_config /etc/ssh/sshd_config
COPY $SSH_PUBLIC_KEY /tmp/$SSH_PUBLIC_KEY
COPY $GIT_PUBLIC_KEY /tmp/$GIT_PUBLIC_KEY
COPY $GIT_PRIVATE_KEY /root/.ssh/$GIT_PRIVATE_KEY

RUN chmod 700 /root/.ssh 
RUN chmod 600 /root/.ssh/$GIT_PRIVATE_KEY


# ssh user:
RUN useradd -rm -d /home/test -s /bin/bash -g root -G sudo test \
    && echo 'test:test' | chpasswd

# gitosis user:
RUN adduser \
    --system \
    --shell /bin/sh \
    --gecos 'git version control' \
    --group \
    --disabled-password \
    --home /srv/simple-git.com \
    git


# ssh user setup:
WORKDIR /home/test
RUN mkdir .ssh && chmod 700 .ssh 
RUN touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
RUN cat /tmp/$SSH_PUBLIC_KEY >> /home/test/.ssh/authorized_keys
RUN chown -R test /home/test


# gitosis setup
WORKDIR /tmp
RUN git clone https://github.com/tv42/gitosis.git
RUN cd gitosis \
    && python2 setup.py install
# must run as git user
USER git
RUN gitosis-init < /tmp/$GIT_PUBLIC_KEY
USER root
WORKDIR /srv/simple-git.com
RUN chown -R git /srv
RUN chmod 700 .ssh 
RUN chmod 600 .ssh/authorized_keys

RUN rm /tmp/$SSH_PUBLIC_KEY
RUN rm /tmp/$GIT_PUBLIC_KEY

RUN service ssh start


WORKDIR /var/www/simple-git/client

COPY /client/package*.json ./
COPY /client/yarn.lock ./
RUN yarn install

COPY /client .

WORKDIR /var/www/simple-git/server


COPY server/package.json ./
COPY server/yarn.lock ./
COPY server/prisma ./prisma/

RUN yarn install

COPY server/ .

RUN yarn build


EXPOSE 22
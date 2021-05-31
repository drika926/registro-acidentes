# Registro de Acidentes

## Build Setup

```bash
# init submodule and update
$ git submodule update --init --recursive

# enter in submodule
$ cd vuedocker

# create .env
$ cp env-example .env

# up all containers
$ docker-composer up -d workspace

# enter in container workspace
$ docker-compose exec workspace bash

# install dependencies
$ yarn install

# create .env 
$ cp .env.production 

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

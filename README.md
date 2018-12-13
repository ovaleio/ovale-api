# Start in prod with forever

````
NODE_ENV=production forever start bin/www
````

# Change config for database 

For development and for production

In `server/config/config.json`

## Install
```npm install && npm install -g sequelize-cli```

## Migrate
```sequelize db:migrate```

## API

see https://documenter.getpostman.com/view/737476/RzZ6Gzhv#947a84b8-b281-41be-ad77-03b93174742c

#generate key
``
mkdir key
openssl genrsa -out key/private.key 4096
openssl rsa -in key/private.key -pubout -outform PEM -out public.key
``
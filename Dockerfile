FROM sitespeedio/node:ubuntu-22.04-nodejs-18.18.0

# set application working diretory
WORKDIR /urs/src/app


# Cpy files 
COPY . .


#Run application 
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=15s --retries=3 CMD curl --fail http://localhost:CMD/bin/bash
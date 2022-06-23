FROM node:16 as development

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .

RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps

EXPOSE 4200 49153

CMD ng serve --host 0.0.0.0 --poll 1
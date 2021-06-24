# Ecommerce-web

### Heroku Set-up

` 
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "cd client && yarn start",
    "server-install" : "yarn add",
    "client-install" : "cd client && yarn add",
    "install-all": "concurrently \"yarn server-install\" \"yarn client-install\"",
    "dev": "concurrently \"yarn server\" \"yarn client\"",
    "heroku-postbuild" : "cd client && yarn add && yarn build"
  },
`
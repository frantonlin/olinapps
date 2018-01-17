# OlinApps
An attempt to remake [OlinApps](http://www.olinapps.com/) from the ground up, using [React](https://facebook.github.io/react/), [Material-UI](http://www.material-ui.com/), [Redux](https://redux.js.org/), [Node.js](https://nodejs.org/), and [PostgreSQL](https://www.postgresql.org/). OlinApps is a central hub with links to useful Olin apps and resources. Additionally, it previously acted as a platform and base for other Olin-connected apps, such as FlyOlinFly.


## Setup
1. Clone the repo to your computer
2. In a terminal, `cd` to the root directory of olinapps
3. Run `npm install` to install all dependencies for both the client and server.
4. Setup the environment variables in `server/.env` (see `server/.env.template`)
5. In order for the application to function properly, a PostgreSQL database will need to be setup with a user that can create and delete tables. Run `node ./server/db/resetTables` to create the necessary tables and then `node ./server/db/insertDefaults` to insert a default set of data into the database
6. Start the application by running `npm start`
7. Go to http://localhost:3000/ in a browser and the app should be running (the API should be located on port 3001)

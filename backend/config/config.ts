const commonConfig = {
  "username": process.env["DATABASE_USER"] || "contact_tracker",
  "password": process.env["DATABASE_PASSWORD"] || null,
  "host": process.env["DATABASE_HOST"] || "localhost",
  "logging": false,
  "dialect": "mysql"
}


const config = {
  "development": {
    "database": "Contact_Tracker_Dev",
    ...commonConfig
  },
  "production": {
    "database": "Contact_Tracker_Prod",
    ...commonConfig
  }
}
export = config;

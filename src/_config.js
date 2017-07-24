const config = {}

config.postgresURI = {
  development: 'postgres://postgres:postgres@localhost:5432/api_development',
  test: 'postgres://postgres:postgres@localhost:5432/api_test',
  production: process.env['DATABASE_URL']
}

config.domainName = {
  development: 'dev.shintech.ninja',
  production: 'shintech.ninja'
}

config.sslPath = '/etc/letsencrypt/live/'

config.mysqlDB = {
  development: {
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
  },
  test: {
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
  },
  production: {
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
  }
}

export default config

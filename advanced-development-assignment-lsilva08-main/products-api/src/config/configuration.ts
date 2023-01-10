export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '1234',
    name: process.env.DATABASE_NAME || 'products_api',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  },
  google: {
    project: process.env.PROJECT_ID || 'ad-assignment-2021-334714',
  },
});

export const config = {
  port: process.env.PORT || 3000,
  pg: {
    host: "dpg-d3cpm5ali9vc73dq00kg-a.oregon-postgres.render.com",
    database: "restaurante_ordenes_db_eqoj",
    user: "restaurante_ordenes_db_eqoj_user",
    password: "fyHYXNz2YFdNlHZ1S6OWWk3AOG9N1dLI",
    port: 5432,
    ssl: { rejectUnauthorized: false }
  },
  schema: 'public',
  corsOrigins: []
};

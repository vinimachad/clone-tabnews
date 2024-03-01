import { Client, QueryConfig } from 'pg'

async function query(query: string | QueryConfig<any[]>) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    ssl: getSSLValues()
  })

  try {
    await client.connect()
    return await client.query(query)
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    await client.end()
  }
}

export default {
  query: query
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return { ca: process.env.POSTGRES_CA }
  }

  return process.env.NODE_ENV === 'development' ? false : true
}

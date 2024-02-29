import { Client, QueryConfig } from 'pg'

async function query(query: string | QueryConfig<any[]>) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER
  })
  await client.connect()
  try {
    return await client.query(query)
  } catch (error) {
    console.log('-> query error:', error)
  } finally {
    await client.end()
  }
}

export default {
  query: query
}

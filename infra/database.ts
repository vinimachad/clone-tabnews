import { Client } from 'pg'

async function query(query: string) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    password: 'local_password',
    database: 'tabnews-db',
    user: 'vinimachad'
  })
  await client.connect()
  const result = await client.query(query)
  await client.end()
  return result
}

export default {
  query: query
}

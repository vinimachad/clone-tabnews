import database from 'infra/database'
import { NextApiRequest, NextApiResponse } from 'next'

export interface APIStatusResponseBody {
  updated_at: string
  dependencies?: {
    database: {
      max_connections: number
      opened_connections: number
      bd_version: number
    }
  }
}

export default async function status(req: NextApiRequest, res: NextApiResponse) {
  const databaseName = process.env.POSTGRES_DB
  const maxConnections = await database.query('SHOW max_connections')
  const bdVersion = await database.query('SHOW server_version')
  const openedConnections = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1`,
    values: [databaseName]
  })

  const maxConnectionsParsed = maxConnections.rows[0].max_connections
  const bdVersionParsed = bdVersion.rows[0].server_version
  const openedConnectionsParsed = openedConnections.rows[0].count

  const responseBody: APIStatusResponseBody = {
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        bd_version: Number(bdVersionParsed),
        max_connections: Number(maxConnectionsParsed),
        opened_connections: openedConnectionsParsed
      }
    }
  }

  res.status(200).json(responseBody)
}

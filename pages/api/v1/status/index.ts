import database from 'infra/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function status(req: NextApiRequest, res: NextApiResponse) {
  const result = await database.query('SELECT 1 + 1 as sum;')
  console.log(result)
  res.status(200).json({ status: 'ok' })
}

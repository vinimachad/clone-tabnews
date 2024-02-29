test('GET /status should return status 200 with correct response', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status')
  const data = await response.json()
  expect(response.status).toBe(200)
  expect(data).toEqual({ status: 'ok' })
})

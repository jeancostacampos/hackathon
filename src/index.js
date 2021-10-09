require('dotenv').config()
const express = require('express')
const axios = require('axios')

const AWS_IP = '3.238.232.253'
const PORT = 5000
const { TELEGRAM_API_TOKEN, NGROK_SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`
const URI = `/webhook/${TELEGRAM_API_TOKEN}`
const WEBHOOK_URL =
  (process.env.NODE_ENV === 'production'
    ? `http://${AWS_IP}:${PORT}`
    : NGROK_SERVER_URL) + URI

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const init = () => axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)

const respondMsg = async (chat_id, text) =>
  await axios.post(`${TELEGRAM_API}/sendMessage`, { chat_id, text })

app.post(URI, async (req, res) => {
  const chatId = req.body.message.chat.id
  const text = req.body.message.text

  console.log(
    `${req.body.message.chat.first_name} ${req.body.message.chat.last_name} diz:`,
    text
  )

  await respondMsg(chatId, text)

  return res.send()
})

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
  init()
    .then(res => {
      console.log(res.data.description)
    })
    .catch(err => {
      console.log('Webhook error!!!')
      console.log(err)
    })
})

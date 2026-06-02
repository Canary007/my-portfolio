import { GoogleGenerativeAI } from '@google/generative-ai'
import { SYSTEM_PROMPT } from '../src/data/systemPrompt.js'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' })
  }

  try {
    const apiKey = process?.env?.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({
        error:
          'Server misconfigured: GEMINI_API_KEY is missing. Add it to your local env and redeploy.',
      })
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    // Gemini requires the first history item to be a user message.
    // Our UI may include a leading assistant greeting, so drop any leading non-user entries.
    while (history.length > 0 && history[0]?.role !== 'user') history.shift()

    const latestMessage = messages[messages.length - 1].content
    const chat = model.startChat({ history })
    let lastError
    for (const delayMs of [0, 400, 900]) {
      if (delayMs) await sleep(delayMs)
      try {
        const result = await chat.sendMessage(latestMessage)
        const reply = result.response.text()
        return res.status(200).json({ reply })
      } catch (e) {
        lastError = e
        if (e?.status !== 503) break
      }
    }
    throw lastError

  } catch (error) {
    console.error('Gemini API error:', error)

    const status = typeof error?.status === 'number' ? error.status : 500
    const reason = error?.errorDetails?.[0]?.reason
    if (reason === 'API_KEY_INVALID') {
      return res.status(401).json({
        error:
          'Invalid GEMINI_API_KEY. Create a new API key in Google AI Studio and update your environment variable.',
      })
    }

    if (status === 404) {
      return res.status(502).json({
        error:
          'Gemini model not found for this API/project. Update the model name (e.g. gemini-3.5-flash) or list available models for your key.',
      })
    }

    if (status === 503) {
      return res.status(503).json({
        error:
          'Gemini is temporarily overloaded (503). Please retry in a few seconds.',
      })
    }

    return res
      .status(status === 400 ? 400 : 500)
      .json({ error: 'Something went wrong. Please try again.' })
  }
}


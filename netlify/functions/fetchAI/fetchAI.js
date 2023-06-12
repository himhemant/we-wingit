// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const handler = async (event) => {
  try {
    const response = await openai.createCompletion({
      model: 'davinci:ft-personal-2023-06-09-10-01-43',
      prompt: event.body,
      max_tokens: 500,
      presence_penalty: 0,
      frequency_penalty: 0.3,
      temperature: 0,
      stop: ['\n', '->']
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
            reply: response.data
        }
      ),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

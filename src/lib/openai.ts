import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateRecipes = async (ingredients: string[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional chef. Given a list of ingredients, generate 3 recipes that can be made using only those ingredients. 
          For each recipe, provide:
          - Title
          - Description
          - Preparation time (in minutes)
          - Number of servings
          - Difficulty level (Easy, Medium, Hard)
          - List of ingredients (only from the provided list)
          - Step-by-step instructions (4 steps max)
          
          Format the response as a JSON array of objects with these keys:
          title, description, time, servings, difficulty, ingredients, instructions`
        },
        {
          role: "user",
          content: `Ingredients: ${ingredients.join(', ')}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('No response from AI')
    
    // Extract JSON from the response
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Error generating recipes:', error)
    throw error
  }
}
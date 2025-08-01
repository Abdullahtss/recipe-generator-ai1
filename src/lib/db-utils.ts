import { dbConnect } from '@/lib/db';
import Recipe from '@/models/Recipe';

export const saveRecipe = async (recipeData: {
  userId: string;
  title: string;
  description: string;
  time: string;
  servings: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}) => {
  try {
    await dbConnect();
    
    const recipe = new Recipe({
      userId: recipeData.userId,
      title: recipeData.title,
      description: recipeData.description,
      time: recipeData.time,
      servings: recipeData.servings,
      difficulty: recipeData.difficulty,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions
    });
    
    return await recipe.save();
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
};
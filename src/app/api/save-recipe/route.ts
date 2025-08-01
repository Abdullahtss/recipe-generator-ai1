import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Recipe from '@/models/Recipe';

export async function POST(request: NextRequest) {
  try {
    const recipeData = await request.json();
    
    await dbConnect();
    
    const recipe = new Recipe({
      userId: recipeData.userId || 'anonymous',
      title: recipeData.title,
      description: recipeData.description,
      time: recipeData.time,
      servings: recipeData.servings,
      difficulty: recipeData.difficulty,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      savedAt: new Date()
    });
    
    const savedRecipe = await recipe.save();
    
    return NextResponse.json({ 
      success: true, 
      recipe: savedRecipe 
    });
    
  } catch (error) {
    console.error('Error saving recipe:', error);
    return NextResponse.json(
      { error: 'Failed to save recipe' },
      { status: 500 }
    );
  }
}
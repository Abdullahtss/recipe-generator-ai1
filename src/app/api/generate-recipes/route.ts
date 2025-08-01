import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Recipe from '@/models/Recipe';

export async function POST(request: NextRequest) {
  try {
    // Connect to database first
    await dbConnect();
    
    const body = await request.json();
    const { ingredients } = body;
    
    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: 'Invalid ingredients format' },
        { status: 400 }
      );
    }

    // Save to database (example)
    const newRecipe = new Recipe({
      title: `${ingredients[0]} Delight`,
      description: `Featuring ${ingredients.join(', ')}`,
      time: "30 mins",
      servings: "4",
      difficulty: "Easy",
      ingredients: [...ingredients, "Salt", "Pepper", "Oil"],
      instructions: [
        "Heat oil in a large pan",
        `Add ${ingredients.join(', ')}`,
        "Cook for 20 minutes",
        "Season and serve"
      ]
    });

    await newRecipe.save();

    return NextResponse.json({
      success: true,
      recipe: newRecipe,
      message: 'Recipe saved to database'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
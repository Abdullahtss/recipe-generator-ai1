import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working',
    status: 'OK'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients } = body;
    
    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: 'Invalid ingredients' },
        { status: 400 }
      );
    }

    const recipes = {
      recipes: [
        {
          name: `${ingredients[0]} Stir Fry`,
          description: `Delicious stir fry with ${ingredients.join(', ')}`,
          time: "25 mins",
          servings: "4",
          difficulty: "Easy",
          ingredients: [...ingredients, "Oil", "Salt", "Pepper"],
          instructions: [
            "Heat oil in pan",
            `Add ${ingredients.join(', ')}`,
            "Cook for 20 minutes",
            "Season and serve"
          ]
        },
        {
          name: `${ingredients[0]} Bowl`,
          description: "Nutritious bowl with your ingredients",
          time: "20 mins",
          servings: "2",
          difficulty: "Easy",
          ingredients: [...ingredients, "Lemon", "Herbs"],
          instructions: [
            "Prepare ingredients",
            "Mix in bowl",
            "Add seasonings",
            "Serve fresh"
          ]
        }
      ]
    };

    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
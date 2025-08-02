'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeCard from '@/components/RecipeCard';
import { IRecipe } from '@/models/Recipe';

const FLOATING_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: 10 + Math.random() * 20,
  delay: Math.random() * 5,
  scale: 0.5 + Math.random() * 1.5,
  emoji: ['🍎', '🍕', '🍔', '🥦', '🍓', '🥑'][Math.floor(Math.random() * 6)]
}));

export default function RecipeResultsClient() {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ingredients = searchParams.get('ingredients')?.split(',') || [];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError('');

        if (ingredients.length === 0) {
          setError('Please add some ingredients first');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/generate-recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredients }),
        });

        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setRecipes(data.recipes.map((r: any) => ({
          title: r.name || 'Untitled Recipe',
          description: r.description || '',
          time: r.time || 'Not specified',
          servings: r.servings || 'Not specified',
          difficulty: r.difficulty || 'Medium',
          ingredients: r.ingredients || [],
          instructions: r.instructions || []
        })));

      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setRecipes([{
          title: "Emergency Recipe",
          description: "Quick meal with your ingredients",
          time: "15 mins",
          servings: "2",
          difficulty: "Easy",
          ingredients: ingredients,
          instructions: [
            "Combine all ingredients",
            "Cook for 10 minutes",
            "Season and serve"
          ]
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams]);

  const handleSaveRecipe = async (recipe: IRecipe) => {
    try {
      const response = await fetch('/api/save-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to save recipe');
      }

      alert('Recipe saved successfully!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save recipe');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_ITEMS.map((item) => (
          <div
            key={item.id}
            className="absolute text-4xl opacity-20"
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              animation: `float ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`,
              transform: `scale(${item.scale})`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
      `}</style>

      <header className="bg-white shadow-sm border-b relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Recipe Generator</h1>
          <button 
            onClick={() => window.history.back()}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            ← Back
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recipe Results</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Ingredients:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {ingredients.map((ingredient, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full border">
                  {ingredient.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-red-800 mb-2">⚠️ Error</h4>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating recipes...</p>
          </div>
        )}

        {!loading && recipes.length > 0 && (
          <div className="space-y-6">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                <RecipeCard recipe={recipe} />
                <button
                  onClick={() => handleSaveRecipe(recipe)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  💾 Save Recipe
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && recipes.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600">No recipes found. Try different ingredients.</p>
          </div>
        )}
      </div>
    </div>
  );
}

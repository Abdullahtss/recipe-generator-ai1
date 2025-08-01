import { getSavedRecipes } from '@/lib/db';
import RecipeCard from '@/components/RecipeCard';

export default async function SavedRecipesPage() {
  const savedRecipes = await getSavedRecipes();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe Generator</h1>
      <h2 className="text-2xl font-semibold text-green-600 mb-6">Saved Recipes</h2>
      <p className="mb-8">Your favorite recipes collection ({savedRecipes.length} recipes)</p>
      
      <div className="space-y-8">
        {savedRecipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
            <p className="text-sm text-gray-500 mt-2">{recipe.savedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
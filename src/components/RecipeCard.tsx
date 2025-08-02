import { IRecipe } from '@/models/Recipe';

interface RecipeCardProps {
  recipe: IRecipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">{recipe.title}</h3> {/* Fixed line */}
      <p className="text-gray-600 mb-4">{recipe.description}</p>

      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 border border-gray-400 rounded"></div>
          <span>{recipe.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center text-white">✓</div>
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 border border-gray-400 rounded"></div>
          <span>{recipe.difficulty}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Ingredients:</h4>
        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient, idx) => (
            <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1">
          {recipe.instructions.slice(0, 3).map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
        {recipe.instructions.length > 3 && (
          <button className="text-green-600 hover:underline mt-2">
            View full recipe...
          </button>
        )}
      </div>
    </div>
  );
}

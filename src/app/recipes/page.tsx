import { Suspense } from 'react';
import RecipeResultsClient from './RecipeResultsClient';

export default function RecipesPage() {
  return (
    <Suspense fallback={<div className="text-center p-12">Loading...</div>}>
      <RecipeResultsClient />
    </Suspense>
  );
}

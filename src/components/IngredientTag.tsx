// src/components/IngredientTag.tsx
import { FaTimes } from 'react-icons/fa'

export default function IngredientTag({ 
  ingredient, 
  onRemove 
}: {
  ingredient: string
  onRemove: (ing: string) => void
}) {
  return (
    <span className="bg-teal-100 text-teal-800 rounded-full px-4 py-2 flex items-center">
      {ingredient}
      <button 
        onClick={() => onRemove(ingredient)}
        className="ml-2 text-teal-700 hover:text-teal-900"
      >
        <FaTimes size={14} />
      </button>
    </span>
  )
}
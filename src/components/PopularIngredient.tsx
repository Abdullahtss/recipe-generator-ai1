import React from 'react';

interface PopularIngredientProps {
  name: string;
  onClick: (name: string) => void;
}

const PopularIngredient: React.FC<PopularIngredientProps> = ({ name, onClick }) => {
  return (
    <button
      onClick={() => onClick(name)}
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors"
    >
      {name}
    </button>
  );
};

export default PopularIngredient;
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InputIngredientsPage() {
  const [ingredients, setIngredients] = useState<string[]>(['Chicken', 'Rice', 'Carrots']);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleGenerateRecipes = () => {
    router.push(`/recipes?ingredients=${ingredients.join(',')}`);
  };

  const handlePopularIngredientClick = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const popularIngredients = ['Tomatoes', 'Onions', 'Garlic', 'Pasta', 'Cheese', 'Bread', 'Eggs', 'Milk'];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-spin" style={{animationDuration: '8s'}}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-purple-400 opacity-30 animate-pulse transform rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-4 border-cyan-400 opacity-40 animate-bounce rounded-full"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Recipe Generator
          </h1>
          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
              <span>🏠</span>
              Home
            </button>
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <span>🤍</span>
              Saved (0)
            </button>
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <span>👤</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Recipe Generator
            </span>
          </h2>
          <p className="text-white/80 text-lg">Add your available ingredients and we&apos;ll suggest delicious recipes</p>
        </div>

        {/* Your Ingredients Section */}
        <div className="bg-white/15 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8 shadow-2xl hover:bg-white/20 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-2xl">🥘</span>
            Your Ingredients
          </h3>
          
          {/* Input Field */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add an ingredient..."
                className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
              />
            </div>
            <button 
              onClick={handleAddIngredient}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center transform hover:scale-105 shadow-lg"
            >
              <span className="text-xl">+</span>
            </button>
          </div>

          {/* Ingredient Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {ingredients.map((ingredient, index) => (
              <div 
                key={ingredient} 
                className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/30 hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-200 transform hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span>{ingredient}</span>
                <button 
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="text-white/80 hover:text-white text-lg leading-none hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateRecipes}
            disabled={ingredients.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 ${
              ingredients.length > 0 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                : 'bg-white/20 cursor-not-allowed'
            }`}
          >
            <span className="text-xl">🔍</span>
            Generate Recipes ({ingredients.length} ingredients)
          </button>
        </div>

        {/* Popular Ingredients Section */}
        <div className="bg-white/15 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl hover:bg-white/20 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            Popular Ingredients
          </h3>
          <div className="flex flex-wrap gap-3">
            {popularIngredients.map((item, index) => (
              <button
                key={item}
                onClick={() => handlePopularIngredientClick(item)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
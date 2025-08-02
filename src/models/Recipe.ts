import mongoose from 'mongoose';

export interface IRecipe {
  userId?: string;
  title: string;
  description: string;
  time: string;
  servings: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  savedAt?: Date;
}

const RecipeSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  time: String,
  servings: String,
  difficulty: String,
  ingredients: [String],
  instructions: [String],
  savedAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export default Recipe;

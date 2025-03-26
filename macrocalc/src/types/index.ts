export interface Ingredient {
  id: string;
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  servingSize: number;
  servingUnit: 'g' | 'ml' | 'oz' | 'cup';
}

export interface Meal {
  id: string;
  name: string;
  ingredients: Array<{
    ingredient: Ingredient;
    amount: number;
  }>;
  totalMacros: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
} 
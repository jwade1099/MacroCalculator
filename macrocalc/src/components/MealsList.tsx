'use client';

import { useMeals } from '@/context/MealsContext';

export default function MealsList() {
  const { meals } = useMeals();

  if (meals.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-500 text-center">
            No meals added yet. Click the &quot;Add Meal&quot; button to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div key={meal.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{meal.name}</h3>
            <div className="flex gap-4">
              <span className="text-sm text-gray-600">
                {Math.round(meal.totalMacros.calories)} cal
              </span>
              <span className="text-sm text-gray-600">
                P: {Math.round(meal.totalMacros.protein)}g
              </span>
              <span className="text-sm text-gray-600">
                C: {Math.round(meal.totalMacros.carbs)}g
              </span>
              <span className="text-sm text-gray-600">
                F: {Math.round(meal.totalMacros.fats)}g
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            {meal.ingredients.map(({ ingredient, amount }) => (
              <div key={ingredient.id} className="flex justify-between text-sm text-gray-600">
                <span>{ingredient.name}</span>
                <span>{amount}{ingredient.servingUnit}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 
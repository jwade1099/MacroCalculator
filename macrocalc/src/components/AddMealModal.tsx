'use client';

import { useState } from 'react';
import { useMeals } from '@/context/MealsContext';
import { Ingredient } from '@/types';

// This is temporary sample data - you might want to fetch this from an API or database
const SAMPLE_INGREDIENTS: Ingredient[] = [
  {
    id: '1',
    name: 'Chicken Breast',
    protein: 31,
    carbs: 0,
    fats: 3.6,
    calories: 165,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '2',
    name: 'Brown Rice',
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    calories: 111,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '3',
    name: 'Salmon',
    protein: 25.4,
    carbs: 0,
    fats: 13.4,
    calories: 208,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '4',
    name: 'Avocado',
    protein: 2,
    carbs: 8.5,
    fats: 15,
    calories: 160,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '5',
    name: 'Sweet Potato',
    protein: 1.6,
    carbs: 20.1,
    fats: 0.1,
    calories: 86,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '6',
    name: 'Egg',
    protein: 6.3,
    carbs: 0.6,
    fats: 5.3,
    calories: 78,
    servingSize: 50,
    servingUnit: 'g',
  },
  {
    id: '7',
    name: 'Greek Yogurt',
    protein: 10,
    carbs: 3.6,
    fats: 0.4,
    calories: 59,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '8',
    name: 'Quinoa',
    protein: 4.4,
    carbs: 21.3,
    fats: 1.9,
    calories: 120,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '9',
    name: 'Broccoli',
    protein: 2.8,
    carbs: 6.6,
    fats: 0.4,
    calories: 34,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '10',
    name: 'Almonds',
    protein: 21.2,
    carbs: 21.7,
    fats: 49.4,
    calories: 579,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '11',
    name: 'Olive Oil',
    protein: 0,
    carbs: 0,
    fats: 100,
    calories: 884,
    servingSize: 100,
    servingUnit: 'ml',
  },
  {
    id: '12',
    name: 'Whole Milk',
    protein: 3.2,
    carbs: 4.8,
    fats: 3.6,
    calories: 64,
    servingSize: 100,
    servingUnit: 'ml',
  }
];

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMealModal({ isOpen, onClose }: AddMealModalProps) {
  const { addMeal } = useMeals();
  const [mealName, setMealName] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{ ingredient: Ingredient; amount: number }>>([]);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null);
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    if (currentIngredient && currentAmount > 0) {
      setSelectedIngredients(prev => [...prev, { ingredient: currentIngredient, amount: currentAmount }]);
      setCurrentIngredient(null);
      setCurrentAmount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mealName && selectedIngredients.length > 0) {
      addMeal({
        name: mealName,
        ingredients: selectedIngredients,
      });
      setMealName('');
      setSelectedIngredients([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-black">Add New Meal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Meal Name</label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Add Ingredients</label>
            <div className="flex gap-2">
              <select
                value={currentIngredient?.id || ''}
                onChange={(e) => setCurrentIngredient(SAMPLE_INGREDIENTS.find(i => i.id === e.target.value) || null)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              >
                <option value="" className="text-black">Select ingredient</option>
                {SAMPLE_INGREDIENTS.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id} className="text-black">
                    {ingredient.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={currentAmount || ''}
                onChange={(e) => setCurrentAmount(Number(e.target.value))}
                placeholder="Amount"
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-black mb-2">Selected Ingredients:</h3>
            <div className="space-y-2">
              {selectedIngredients.map(({ ingredient, amount }, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="text-black">{ingredient.name}</span>
                  <span className="text-black">{amount}{ingredient.servingUnit}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedIngredients(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Meal, Ingredient } from '@/types';

interface MealsContextType {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id' | 'totalMacros'>) => void;
  removeMeal: (id: string) => void;
  calculateDailyTotals: () => {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
}

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const calculateMealMacros = (ingredients: Array<{ ingredient: Ingredient; amount: number }>) => {
    return ingredients.reduce(
      (acc, { ingredient, amount }) => {
        const ratio = amount / ingredient.servingSize;
        return {
          protein: acc.protein + ingredient.protein * ratio,
          carbs: acc.carbs + ingredient.carbs * ratio,
          fats: acc.fats + ingredient.fats * ratio,
          calories: acc.calories + ingredient.calories * ratio,
        };
      },
      { protein: 0, carbs: 0, fats: 0, calories: 0 }
    );
  };

  const addMeal = useCallback((newMeal: Omit<Meal, 'id' | 'totalMacros'>) => {
    const totalMacros = calculateMealMacros(newMeal.ingredients);
    setMeals((prev) => [
      ...prev,
      {
        ...newMeal,
        id: crypto.randomUUID(),
        totalMacros,
      },
    ]);
  }, []);

  const removeMeal = useCallback((id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  }, []);

  const calculateDailyTotals = useCallback(() => {
    return meals.reduce(
      (acc, meal) => ({
        protein: acc.protein + meal.totalMacros.protein,
        carbs: acc.carbs + meal.totalMacros.carbs,
        fats: acc.fats + meal.totalMacros.fats,
        calories: acc.calories + meal.totalMacros.calories,
      }),
      { protein: 0, carbs: 0, fats: 0, calories: 0 }
    );
  }, [meals]);

  return (
    <MealsContext.Provider value={{ meals, addMeal, removeMeal, calculateDailyTotals }}>
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealsContext);
  if (context === undefined) {
    throw new Error('useMeals must be used within a MealsProvider');
  }
  return context;
} 
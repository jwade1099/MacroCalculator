'use client';

import { useMeals } from '@/context/MealsContext';

export function DailyMacros() {
  const { calculateDailyTotals } = useMeals();
  const totals = calculateDailyTotals();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Calories', value: `${Math.round(totals.calories)}`, color: 'bg-blue-100' },
        { label: 'Protein', value: `${Math.round(totals.protein)}g`, color: 'bg-red-100' },
        { label: 'Carbs', value: `${Math.round(totals.carbs)}g`, color: 'bg-green-100' },
        { label: 'Fats', value: `${Math.round(totals.fats)}g`, color: 'bg-yellow-100' },
      ].map((macro) => (
        <div
          key={macro.label}
          className={`${macro.color} rounded-lg p-6 shadow-sm`}
        >
          <h3 className="text-lg font-medium text-gray-700">{macro.label}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{macro.value}</p>
        </div>
      ))}
    </div>
  );
} 
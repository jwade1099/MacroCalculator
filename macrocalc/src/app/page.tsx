import { Meal } from '@/types';
import AddMealButton from '@/components/AddMealButton';
import MealsList from '@/components/MealsList';
import { DailyMacros } from '@/components/DailyMacros';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Macro Calculator
        </h1>
        
        <DailyMacros />
        
        <div className="mt-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">Your Meals</h2>
            <AddMealButton />
          </div>
          <MealsList />
        </div>
      </div>
    </main>
  );
}

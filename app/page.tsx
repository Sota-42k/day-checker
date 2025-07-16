"use client";

import { useState } from "react";

export default function Home() {
  const [inputDate, setInputDate] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current date for display
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDate) return;

    setIsLoading(true);
    
    try {
      // Try to parse the date - JavaScript Date constructor is quite flexible
      const dateObj = new Date(inputDate);
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        setResult("Please enter a valid date. Try formats like: 'July 16, 2025', '2025-07-16', or '07/16/2025'");
        return;
      }
      
      const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      const formattedDate = formatDate(dateObj);
      
      setResult(`${formattedDate} is a ${dayOfWeek}`);
    } catch (error) {
      setResult("Please enter a valid date. Try formats like: 'July 16, 2025', '2025-07-16', or '07/16/2025'");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputDate("");
    setResult(null);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setInputDate(today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Day Checker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter a date to find out what day it falls on
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="date" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Enter Date
              </label>
              <input
                type="text"
                id="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                placeholder="e.g., 2025-07-16, July 16, 2025, or 07/16/2025"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleTodayClick}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  Use today's date
                </button>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Supports various date formats
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading || !inputDate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
              >
                {isLoading ? "Checking..." : "Check Day"}
              </button>
              
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {result}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Built with Next.js and Tailwind CSS
        </div>
      </div>
    </div>
  );
}

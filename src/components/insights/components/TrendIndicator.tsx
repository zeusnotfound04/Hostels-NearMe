"use client"

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
  percentage?: boolean;
}

// Trend indicator component that shows up/down arrows based on trend
const TrendIndicator = ({ value, percentage = true }: TrendIndicatorProps) => {
  const isPositive = value >= 0;
  
  return (
    <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? (
        <TrendingUp className="mr-1 h-4 w-4" />
      ) : (
        <TrendingDown className="mr-1 h-4 w-4" />
      )}
      {Math.abs(value).toFixed(1)}{percentage ? '%' : ''}
    </div>
  );
};

export default TrendIndicator;
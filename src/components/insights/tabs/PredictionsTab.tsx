"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Target, Building2, ArrowUpRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import TrendIndicator from '../components/TrendIndicator';
import { PredictiveInsights, AdminInsights } from '../types';

interface PredictionsTabProps {
  predictiveInsights: PredictiveInsights;
  data: AdminInsights;
}

const PredictionsTab = ({ predictiveInsights, data }: PredictionsTabProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="grid gap-4 md:grid-cols-3"
    >
      <Card className="hover:shadow-lg transition-all border-l-4 border-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 text-yellow-500" />
            Predicted User Growth
          </CardTitle>
          <CardDescription>Next Month Projection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={predictiveInsights.predictedNextMonthUsers} />
              </div>
              <Badge variant="outline" className="mt-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 
                +{predictiveInsights.growthTrends.userGrowth.predicted} Users
              </Badge>
            </div>
            <TrendIndicator value={predictiveInsights.growthTrends.userGrowth.growthRate} />
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={predictiveInsights.growthTrends.userGrowth.trend}>
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#eab308" 
                  fill="url(#userColorGradient)" 
                  animationDuration={2000}
                />
                <defs>
                  <linearGradient id="userColorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all border-l-4 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 text-blue-500" />
            Predicted Bookings
          </CardTitle>
          <CardDescription>Next Month Forecast</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={predictiveInsights?.predictedNextMonthBookings ?? 0} />
              </div>
              <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +{(predictiveInsights?.growthTrends.bookingGrowth.predicted ?? 0) - (data?.confirmedBookings ?? 0)} Bookings
              </Badge>
            </div>
            <TrendIndicator value={predictiveInsights?.growthTrends.bookingGrowth.growthRate ?? 0} />
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={predictiveInsights.growthTrends.bookingGrowth.trend}>
                <Area 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3b82f6" 
                  fill="url(#bookingColorGradient)" 
                  animationDuration={2000}
                />
                <defs>
                  <linearGradient id="bookingColorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-all border-l-4 border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 text-purple-500" />
            Hostel Expansion
          </CardTitle>
          <CardDescription>Platform Growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={predictiveInsights?.predictedNextMonthHostels ?? 0} />
              </div>
              <Badge variant="outline" className="mt-2 bg-purple-50 text-purple-700 border-purple-200">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +{(predictiveInsights?.predictedNextMonthHostels ?? 0) - (data?.activeHostelsCount ?? 0)} Hostels
              </Badge>
            </div>
            <TrendIndicator value={predictiveInsights?.growthTrends.hostelExpansion.growthRate ?? 0} />
          </div>
          
          <div className="mt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current</span>
                <span>{data?.activeHostelsCount}</span>
              </div>
              <Progress value={data?.activeHostelsCount} max={predictiveInsights?.predictedNextMonthHostels} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Predicted</span>
                <span>{predictiveInsights?.predictedNextMonthHostels}</span>
              </div>
            </div>
          </div>
          
          {predictiveInsights.growthTrends.hostelExpansion.trend && (
            <div className="mt-4 pt-4 border-t">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={predictiveInsights.growthTrends.hostelExpansion.trend}>
                  <Area 
                    type="monotone" 
                    dataKey="hostels" 
                    stroke="#8b5cf6" 
                    fill="url(#hostelColorGradient)" 
                    animationDuration={2000}
                  />
                  <defs>
                    <linearGradient id="hostelColorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PredictionsTab;
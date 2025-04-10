"use client"

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { motion, useAnimationControls } from 'framer-motion';
import { AlertCircle, Calendar, RefreshCcw } from 'lucide-react';
import { 
  Alert as AlertComponent, 
  AlertDescription, 
  AlertTitle 
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

import { calculatePredictiveInsights } from './utils/calculations';
import { AdminInsights } from './types';
import AdminLoadingScreen from '../loading/AdminLoader';
import OverviewTab from './tabs/OverviewTab';
import PredictionsTab from './tabs/PredictionsTab';
import AnalyticsTab from './tabs/AnalyticsTab';

const AdminInsightsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const controls = useAnimationControls();
  
  const fetchInsights = async (): Promise<AdminInsights> => {
    const { data } = await axios.get('/api/insights');
    return data;
  };

  const { 
    data, 
    error, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery<AdminInsights>({
    queryKey: ['adminInsights'],
    queryFn: fetchInsights,
    refetchInterval: 300000,
  });

  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    if (data?.updatedAt) {
      setLastUpdated(new Date(data.updatedAt).toLocaleString());
    }
  }, [data?.updatedAt]);

  const predictiveInsights = useMemo(() => 
    data ? calculatePredictiveInsights(data) : null, 
    [data]
  );

  // Handle refresh with animation
  const handleRefresh = async () => {
    setRefreshing(true);
    await controls.start({
      rotate: 360,
      transition: { duration: 1 }
    });
    await refetch();
    setRefreshing(false);
  };
  
  if (isLoading) {
    return <AdminLoadingScreen />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AlertComponent variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Error Loading Insights</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load dashboard insights'}
          </AlertDescription>
        </AlertComponent>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="space-y-6 p-6 bg-white rounded-lg shadow-sm"
    >
      {/* Header with Refresh Button */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        className="flex justify-between items-center"
      >
        <div>
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Admin Dashboard
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Calendar className="inline-block w-4 h-4 mr-1" /> Last Updated: {lastUpdated}
          </motion.p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleRefresh}
                className="hover:bg-blue-50 transition-all"
                disabled={refreshing}
              >
                <motion.div animate={controls}>
                  <RefreshCcw className={`h-5 w-5 ${refreshing ? 'text-blue-400' : 'text-blue-600'}`} />
                </motion.div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          {data && <OverviewTab data={data} />}
        </TabsContent>
        
        {/* Predictions Tab */}
        <TabsContent value="predictions">
          {data && predictiveInsights && <PredictionsTab predictiveInsights={predictiveInsights} data={data} />}
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          {data && <AnalyticsTab data={data} />}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminInsightsDashboard;

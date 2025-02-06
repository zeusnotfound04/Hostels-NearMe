"use client"
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tooltip as ShadTooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  AlertCircle, 
  RefreshCcw, 
  TrendingUp, 
  Users, 
  Building2, 
  Activity, 
  Zap,
  Rocket,
  Target
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Type definition for AdminInsights
type AdminInsights = {
  id: string;
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalUsers: number;
  newUsersThisMonth: number;
  activeHostelsCount: number;
  bookingConversionRate: number;
  cancellationRate: number;
  avgBookingsPerUser: number;
  trendingHostelId: string | null;
  listHostelRequests: number;
  pendingRequests: number;
  cancelledRequests: number;
  createdAt: string;
  updatedAt: string;
};

const calculatePredictiveInsights = (data: AdminInsights) => {
  const predictNextMonthUsers = data.totalUsers + data.newUsersThisMonth;
  const predictNextMonthBookings = Math.round(
    data.confirmedBookings * (1 + data.bookingConversionRate)
  );
  
  const growthTrends = {
    userGrowth: {
      current: data.newUsersThisMonth,
      predicted: Math.round(predictNextMonthUsers - data.totalUsers),
      growthRate: ((predictNextMonthUsers - data.totalUsers) / data.totalUsers) * 100
    },
    bookingGrowth: {
      current: data.confirmedBookings,
      predicted: predictNextMonthBookings,
      growthRate: ((predictNextMonthBookings - data.confirmedBookings) / data.confirmedBookings) * 100
    },
    hostelExpansion: {
      current: data.activeHostelsCount,
      predicted: Math.round(data.activeHostelsCount * (1 + (data.listHostelRequests / 100))),
      growthRate: ((data.listHostelRequests / data.activeHostelsCount) * 100)
    }
  };

  return {
    predictedNextMonthUsers: predictNextMonthUsers,
    predictedNextMonthBookings: predictNextMonthBookings,
    growthTrends
  };
};
const AdminInsightsDashboard: React.FC = () => {
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

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <RefreshCcw className="w-12 h-12 animate-spin text-blue-500" />
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Error Loading Insights</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load dashboard insights'}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  // Prepare data for charts
  const bookingData = [
    { name: 'Confirmed', value: data?.confirmedBookings || 0 },
    { name: 'Cancelled', value: data?.cancelledBookings || 0 }
  ];

  const hostelRequestData = [
    { name: 'Pending', value: data?.pendingRequests || 0 },
    { name: 'Approved', value: data?.activeHostelsCount || 0 },
    { name: 'Cancelled', value: data?.cancelledRequests || 0 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6 bg-gray-50"
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </div>
        <TooltipProvider>
          <ShadTooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => refetch()}
                className="hover:bg-blue-50"
              >
                <RefreshCcw className="h-5 w-5 text-blue-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh Dashboard</p>
            </TooltipContent>
          </ShadTooltip>
        </TooltipProvider>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delayChildren: 0.3,
          staggerChildren: 0.2 
        }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold"
              >
                {data?.totalBookings}
              </motion.div>
              <Badge variant="secondary" className="mt-2">
                {data?.confirmedBookings} Confirmed
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold"
              >
                {data?.totalUsers}
              </motion.div>
              <Badge variant="secondary" className="mt-2">
                +{data?.newUsersThisMonth} New This Month
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
         <Card className="hover:shadow-lg transition-shadow">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Booking Conversion</CardTitle>
    <Rocket className="h-5 w-5 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-bold"
    >
      {((data?.bookingConversionRate ?? 0) * 100).toFixed(1)}%
    </motion.div>
    <Badge variant="secondary" className="mt-2">
      {((data?.cancellationRate ?? 0) * 100).toFixed(1)}% Cancellation
    </Badge>
  </CardContent>
</Card>
        </motion.div>
      </motion.div>

      {/* Predictive Insights Section */}
      {predictiveInsights && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <Card>
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
                    {predictiveInsights.predictedNextMonthUsers}
                  </div>
                  <Badge variant="outline" className="mt-2">
                    +{predictiveInsights.growthTrends.userGrowth.predicted} Users
                  </Badge>
                </div>
                <div className="text-green-600 flex items-center">
                  <TrendingUp className="mr-1" />
                  {predictiveInsights.growthTrends.userGrowth.growthRate.toFixed(1)}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
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
          {predictiveInsights?.predictedNextMonthBookings ?? 0}
        </div>
        <Badge variant="outline" className="mt-2">
          +{(predictiveInsights?.growthTrends.bookingGrowth.predicted ?? 0) - (data?.confirmedBookings ?? 0)} Bookings
        </Badge>
      </div>
      <div className="text-green-600 flex items-center">
        <TrendingUp className="mr-1" />
        {predictiveInsights?.growthTrends.bookingGrowth.growthRate.toFixed(1) ?? "0.0"}%
      </div>
    </div>
  </CardContent>
</Card>
          <Card>
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
          {predictiveInsights?.growthTrends.hostelExpansion.predicted ?? 0}
        </div>
        <Badge variant="outline" className="mt-2">
          +{(predictiveInsights?.growthTrends.hostelExpansion.predicted ?? 0) - (data?.activeHostelsCount ?? 0)} Hostels
        </Badge>
      </div>
      <div className="text-green-600 flex items-center">
        <TrendingUp className="mr-1" />
        {predictiveInsights?.growthTrends.hostelExpansion.growthRate.toFixed(1) ?? "0.0"}%
      </div>
    </div>
  </CardContent>
</Card>
        </motion.div>
      )}

      {/* Charts Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Booking Distribution</CardTitle>
            <CardDescription>Confirmed vs Cancelled Bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {bookingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hostel Requests Status</CardTitle>
            <CardDescription>Distribution of Hostel Listing Requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hostelRequestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {hostelRequestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminInsightsDashboard;
                  
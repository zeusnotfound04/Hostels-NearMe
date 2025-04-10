"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Users, Building2, Rocket, CheckCircle, XCircle, Clock, ArrowUpRight, PieChart as PieChartIcon } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import { AdminInsights } from '../types';

interface OverviewTabProps {
  data: AdminInsights;
}

const OverviewTab = ({ data }: OverviewTabProps) => {
  // Calculate booking efficiency metrics
  const bookingEfficiency = (data?.confirmedBookings || 0) / (data?.totalBookings || 1) * 100;
  const hostelsUtilization = 85; // Example value - could be calculated from actual data
  
  const bookingData = [
    { name: 'Confirmed', value: data?.confirmedBookings || 0, color: '#22c55e' },
    { name: 'Cancelled', value: data?.cancelledBookings || 0, color: '#ef4444' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {/* Total Bookings Card */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
        <Card className="hover:shadow-lg transition-all border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Activity className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data?.totalBookings || 0} />
            </div>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" /> {data?.confirmedBookings} Confirmed
              </Badge>
              <span className="text-sm text-muted-foreground">
                {((data?.confirmedBookings || 0) / (data?.totalBookings || 1) * 100).toFixed(0)}% Success Rate
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={bookingEfficiency} className="h-1" />
          </CardFooter>
        </Card>
      </motion.div>

      {/* Total Users Card */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
        <Card className="hover:shadow-lg transition-all border-l-4 border-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data?.totalUsers || 0} />
            </div>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                <ArrowUpRight className="w-3 h-3 mr-1" /> +{data?.newUsersThisMonth} New
              </Badge>
              <span className="text-sm text-muted-foreground">
                {((data?.newUsersThisMonth || 0) / (data?.totalUsers || 1) * 100).toFixed(1)}% Growth
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={(data?.newUsersThisMonth || 0) / (data?.totalUsers || 1) * 100} className="h-1" />
          </CardFooter>
        </Card>
      </motion.div>

      {/* Booking Conversion Card */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
        <Card className="hover:shadow-lg transition-all border-l-4 border-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booking Conversion</CardTitle>
            <Rocket className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((data?.bookingConversionRate ?? 0) * 100).toFixed(1)}%
            </div>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <XCircle className="w-3 h-3 mr-1" /> {((data?.cancellationRate ?? 0) * 100).toFixed(1)}% Cancellation
              </Badge>
              <span className="text-sm text-muted-foreground">
                {(data?.avgBookingsPerUser || 0).toFixed(2)} bookings/user
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={(data?.bookingConversionRate ?? 0) * 100} className="h-1" />
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Active Hostels Card */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
        <Card className="hover:shadow-lg transition-all border-l-4 border-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hostels</CardTitle>
            <Building2 className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data?.activeHostelsCount || 0} />
            </div>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Clock className="w-3 h-3 mr-1" /> {data?.pendingRequests} Pending
              </Badge>
              <span className="text-sm text-muted-foreground">
                {hostelsUtilization}%
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Progress value={hostelsUtilization} className="h-1" />
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Booking Distribution */}
      <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }} className="md:col-span-2 lg:col-span-2">
        <Card className="hover:shadow-lg transition-all h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PieChartIcon className="h-5 w-5 text-purple-500" />
                <CardTitle>Booking Distribution</CardTitle>
              </div>
              <Badge variant="outline">{data?.totalBookings} Total Bookings</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Confirmed vs Cancelled Bookings</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={bookingData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {bookingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default OverviewTab;
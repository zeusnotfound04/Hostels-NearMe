"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart, 
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Activity, Rocket, CheckCircle, BarChart2 } from 'lucide-react';
import { AdminInsights } from '../types';

interface AnalyticsTabProps {
  data: AdminInsights;
}

const AnalyticsTab = ({ data }: AnalyticsTabProps) => {
  const hostelRequestData = [
    { name: 'Pending', value: data?.pendingRequests || 0, color: '#f59e0b' },
    { name: 'Approved', value: data?.activeHostelsCount || 0, color: '#3b82f6' },
    { name: 'Cancelled', value: data?.cancelledRequests || 0, color: '#ef4444' }
  ];
  
  const performanceTrend = data?.historicalData?.map(item => ({
    name: item.month,
    bookings: item.bookings || 0,
    users: item.users || 0,
    confirmedBookings: item.confirmedBookings || 0,
    cancelledBookings: item.cancelledBookings || 0,
    conversionRate: item.conversionRate || 0
  })) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="grid gap-4 md:grid-cols-2"
    >
      <Card className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart2 className="h-5 w-5 text-blue-500" />
              <CardTitle>Hostel Requests Status</CardTitle>
            </div>
          </div>
          <CardDescription>Distribution of Hostel Listing Requests</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hostelRequestData} barGap={8} barCategoryGap={16}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Bar 
                dataKey="value" 
                animationDuration={2000}
                animationEasing="ease"
                radius={[4, 4, 0, 0]}
              >
                {hostelRequestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <CardTitle>Performance Trend</CardTitle>
            </div>
          </div>
          <CardDescription>Booking and User Growth Patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                name="Total Bookings"
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                name="Total Users"
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                animationDuration={2500}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* New Chart: Booking Conversion Over Time */}
      <Card className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-amber-500" />
              <CardTitle>Booking Conversion Trend</CardTitle>
            </div>
          </div>
          <CardDescription>Conversion Rate Over Time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="conversionRate" 
                name="Conversion Rate (%)"
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* New Chart: Booking Status Distribution Over Time */}
      <Card className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>Booking Status Distribution</CardTitle>
            </div>
          </div>
          <CardDescription>Confirmed vs Cancelled Over Time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Area
                type="monotone"
                dataKey="confirmedBookings"
                name="Confirmed Bookings"
                stackId="1"
                stroke="#22c55e"
                fill="url(#confirmedGradient)"
              />
              <Area
                type="monotone"
                dataKey="cancelledBookings"
                name="Cancelled Bookings"
                stackId="1"
                stroke="#ef4444"
                fill="url(#cancelledGradient)"
              />
              <defs>
                <linearGradient id="confirmedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="cancelledGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsTab;
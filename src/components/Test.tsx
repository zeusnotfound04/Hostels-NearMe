"use client"

import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PieElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PieElement, 
  Title, 
  Tooltip, 
  Legend
);

const AdminDashboard = () => {
  // Dummy Data
  const bookingMetrics = {
    totalBookings: 1200,
    activeBookings: 450,
    cancellationReasons: {
      labels: ['User Change of Plans', 'Payment Issues', 'Accommodation Unavailable'],
      data: [40, 25, 10]
    },
    bookingTrends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [200, 250, 300, 350, 400, 450]
    }
  };

  const userInsights = {
    totalUsers: 5000,
    newUsers: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [100, 150, 200, 250]
    },
    activeUsers: {
      active: 70,
      inactive: 30
    }
  };

  const hostelMetrics = {
    totalHostels: 50,
    hostelOccupancy: {
      labels: ['Sunset Hostel', 'Mountain View', 'City Center', 'Beach House'],
      data: [85, 65, 90, 75]
    },
    hostelPopularity: {
      labels: ['City Center', 'Mountain View', 'Sunset Hostel', 'Beach House'],
      data: [350, 250, 200, 150]
    }
  };

  // Chart Configuration Options
  const animationOptions = {
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutQuad',
        from: 1,
        to: 0,
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Booking Metrics Section */}
      <Card>
        <CardHeader>Total Bookings</CardHeader>
        <CardContent>
          <h2 className="text-3xl font-bold">{bookingMetrics.totalBookings}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Cancellation Reasons</CardHeader>
        <CardContent>
          <Pie 
            data={{
              labels: bookingMetrics.cancellationReasons.labels,
              datasets: [{
                data: bookingMetrics.cancellationReasons.data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
              }]
            }}
            options={{
              ...animationOptions,
              plugins: {
                legend: { position: 'bottom' }
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Booking Trends</CardHeader>
        <CardContent>
          <Line
            data={{
              labels: bookingMetrics.bookingTrends.labels,
              datasets: [{
                label: 'Bookings',
                data: bookingMetrics.bookingTrends.data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4
              }]
            }}
            options={{
              ...animationOptions,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </CardContent>
      </Card>

      {/* User Insights Section */}
      <Card>
        <CardHeader>Total Users</CardHeader>
        <CardContent>
          <h2 className="text-3xl font-bold">{userInsights.totalUsers}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Active Users Distribution</CardHeader>
        <CardContent>
          <Doughnut 
            data={{
              labels: ['Active', 'Inactive'],
              datasets: [{
                data: [userInsights.activeUsers.active, userInsights.activeUsers.inactive],
                backgroundColor: ['#28a745', '#dc3545']
              }]
            }}
            options={{
              ...animationOptions,
              plugins: {
                legend: { position: 'bottom' }
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Hostel Metrics Section */}
      <Card>
        <CardHeader>Hostel Occupancy</CardHeader>
        <CardContent>
          <Bar 
            data={{
              labels: hostelMetrics.hostelOccupancy.labels,
              datasets: [{
                label: 'Occupancy Rate (%)',
                data: hostelMetrics.hostelOccupancy.data,
                backgroundColor: '#007bff'
              }]
            }}
            options={{
              ...animationOptions,
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
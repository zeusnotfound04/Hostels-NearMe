"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, Users, Building2, TrendingUp, AlertCircle, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

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

// Fetch function
const fetchInsights = async (): Promise<AdminInsights> => {
    const { data } = await axios.get('/api/insights');
    return data;
  };

// Helper function to safely format percentages
const formatPercentage = (value: number | undefined): string => {
  if (typeof value !== 'number') return '0.0%';
  return `${(value * 100).toFixed(1)}%`;
};

// Helper function to safely format decimals
const formatDecimal = (value: number | undefined, decimals: number = 2): string => {
  if (typeof value !== 'number') return '0.00';
  return value.toFixed(decimals);
};

// Helper function to format date
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString();
};

export default function AdminInsightsDashboard() {
  const [lastUpdated, setLastUpdated] = useState<string>("");
  
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['adminInsights'],
    queryFn: fetchInsights,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Handle timestamp updates using useEffect
  useEffect(() => {
    if (data?.updatedAt) {
      setLastUpdated(formatDate(data.updatedAt));
    }
  }, [data?.updatedAt]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCcw className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load insights'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Insights</h2>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalBookings ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {data?.confirmedBookings ?? 0} confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              +{data?.newUsersThisMonth ?? 0} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hostels</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.activeHostelsCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {data?.listHostelRequests ?? 0} new requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(data?.bookingConversionRate)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(data?.cancellationRate)} cancellation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Statistics</CardTitle>
            <CardDescription>Detailed breakdown of booking status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Confirmed Bookings:</span>
                <span className="font-bold">{data?.confirmedBookings ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancelled Bookings:</span>
                <span className="font-bold">{data?.cancelledBookings ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Bookings/User:</span>
                <span className="font-bold">{formatDecimal(data?.avgBookingsPerUser)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hostel Requests</CardTitle>
            <CardDescription>Overview of hostel listing requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Requests:</span>
                <span className="font-bold">{data?.listHostelRequests ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Requests:</span>
                <span className="font-bold">{data?.pendingRequests ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancelled Requests:</span>
                <span className="font-bold">{data?.cancelledRequests ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
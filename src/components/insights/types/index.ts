import type { HistoricalDataPoint } from '@/actions/adminInsights/historicalInsights';

// Type definition for AdminInsights
export type AdminInsights = {
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
  historicalData?: HistoricalDataPoint[];
};

export type PredictiveInsights = {
  predictedNextMonthUsers: number;
  predictedNextMonthBookings: number;
  predictedNextMonthHostels: number;
  growthTrends: {
    userGrowth: {
      current: number;
      predicted: number;
      growthRate: number;
      trend: { month: string; users: number }[];
    };
    bookingGrowth: {
      current: number;
      predicted: number;
      growthRate: number;
      trend: { month: string; bookings: number; confirmedBookings?: number }[];
    };
    hostelExpansion: {
      current: number;
      predicted: number;
      growthRate: number;
      trend?: { month: string; hostels: number }[];
    };
  };
};
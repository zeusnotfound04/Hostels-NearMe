import { AdminInsights, PredictiveInsights } from '../types';

// Advanced predictive insights calculation based on historical trends
export const calculatePredictiveInsights = (data: AdminInsights): PredictiveInsights => {
  // Use historical data if available, otherwise use current data to predict
  const historicalData = data.historicalData || [];
  
  // Get the most recent months data for calculations
  const monthCount = historicalData.length;
  const hasHistory = monthCount > 1;
  
  // Check if we have historical data to make predictions
  if (hasHistory) {
    // Sort historical data chronologically if not already sorted
    const sortedHistory = [...historicalData].sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
    
    // Get last two months to calculate growth rate
    const lastMonth = sortedHistory[sortedHistory.length - 1];
    const secondLastMonth = sortedHistory[sortedHistory.length - 2];
    
    // Calculate growth rates from real data
    let userGrowthRate = 0;
    if (secondLastMonth.users && lastMonth.users && secondLastMonth.users > 0) {
      userGrowthRate = (lastMonth.users - secondLastMonth.users) / secondLastMonth.users;
    } else {
      // Fallback if historical data doesn't have user counts
      userGrowthRate = data.newUsersThisMonth / (data.totalUsers - data.newUsersThisMonth || 1);
    }
    
    // Calculate booking growth rate
    let bookingGrowthRate = 0;
    if (secondLastMonth.bookings && lastMonth.bookings && secondLastMonth.bookings > 0) {
      bookingGrowthRate = (lastMonth.bookings - secondLastMonth.bookings) / secondLastMonth.bookings;
    } else {
      // Fallback to conversion rate as growth indicator
      bookingGrowthRate = data.bookingConversionRate * 1.2; // Adjusted by 20% as a buffer
    }
    
    // Calculate hostel growth rate
    let hostelGrowthRate = 0;
    if (secondLastMonth.hostels && lastMonth.hostels && secondLastMonth.hostels > 0) {
      hostelGrowthRate = (lastMonth.hostels - secondLastMonth.hostels) / secondLastMonth.hostels;
    } else {
      // Fallback to request rate as growth indicator
      hostelGrowthRate = data.listHostelRequests / (data.activeHostelsCount || 1) / 10;
    }
    
    // Predict next month values based on actual growth rates
    const predictNextMonthUsers = Math.round(data.totalUsers * (1 + userGrowthRate));
    const predictNextMonthBookings = Math.round(data.confirmedBookings * (1 + bookingGrowthRate));
    const predictNextMonthHostels = Math.round(data.activeHostelsCount * (1 + hostelGrowthRate));
    
    // Return prediction data with real historical trends
    return {
      predictedNextMonthUsers: predictNextMonthUsers,
      predictedNextMonthBookings: predictNextMonthBookings,
      predictedNextMonthHostels: predictNextMonthHostels, 
      growthTrends: {
        userGrowth: {
          current: data.newUsersThisMonth,
          predicted: Math.round(predictNextMonthUsers - data.totalUsers),
          growthRate: userGrowthRate * 100,
          trend: historicalData.map(item => ({ 
            month: item.month,
            users: item.users || 0
          }))
        },
        bookingGrowth: {
          current: data.confirmedBookings,
          predicted: predictNextMonthBookings,
          growthRate: bookingGrowthRate * 100,
          trend: historicalData.map(item => ({ 
            month: item.month,
            bookings: item.bookings || 0,
            confirmedBookings: item.confirmedBookings || 0
          }))
        },
        hostelExpansion: {
          current: data.activeHostelsCount,
          predicted: predictNextMonthHostels,
          growthRate: hostelGrowthRate * 100,
          trend: historicalData.map(item => ({
            month: item.month,
            hostels: item.hostels || 0
          }))
        }
      }
    };
  } else {
    // Fallback to simpler calculation if no historical data available
    const userGrowthRate = data.newUsersThisMonth / (data.totalUsers - data.newUsersThisMonth || 1);
    const predictNextMonthUsers = Math.round(data.totalUsers * (1 + userGrowthRate));
    const predictNextMonthBookings = Math.round(data.confirmedBookings * (1 + data.bookingConversionRate * 1.2));
    const predictNextMonthHostels = Math.round(data.activeHostelsCount * (1 + (data.listHostelRequests / 100)));
    
    // Create synthetic historical data based on current values
    const syntheticUserTrend = [
      { month: 'Jan', users: Math.round(data.totalUsers * 0.7) },
      { month: 'Feb', users: Math.round(data.totalUsers * 0.8) },
      { month: 'Mar', users: Math.round(data.totalUsers * 0.9) },
      { month: 'Apr', users: data.totalUsers },
      { month: 'May', users: predictNextMonthUsers },
    ];
    
    const syntheticBookingTrend = [
      { month: 'Jan', bookings: Math.round(data.totalBookings * 0.6) },
      { month: 'Feb', bookings: Math.round(data.totalBookings * 0.7) },
      { month: 'Mar', bookings: Math.round(data.totalBookings * 0.85) },
      { month: 'Apr', bookings: data.totalBookings },
      { month: 'May', bookings: predictNextMonthBookings },
    ];
    
    return {
      predictedNextMonthUsers: predictNextMonthUsers,
      predictedNextMonthBookings: predictNextMonthBookings,
      predictedNextMonthHostels: predictNextMonthHostels,
      growthTrends: {
        userGrowth: {
          current: data.newUsersThisMonth,
          predicted: Math.round(predictNextMonthUsers - data.totalUsers),
          growthRate: ((predictNextMonthUsers - data.totalUsers) / data.totalUsers) * 100,
          trend: syntheticUserTrend
        },
        bookingGrowth: {
          current: data.confirmedBookings,
          predicted: predictNextMonthBookings,
          growthRate: ((predictNextMonthBookings - data.confirmedBookings) / data.confirmedBookings) * 100,
          trend: syntheticBookingTrend
        },
        hostelExpansion: {
          current: data.activeHostelsCount,
          predicted: predictNextMonthHostels,
          growthRate: ((data.listHostelRequests / data.activeHostelsCount) * 100)
        }
      }
    };
  }
};
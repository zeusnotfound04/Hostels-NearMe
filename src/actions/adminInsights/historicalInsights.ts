import { PrismaClient } from '@prisma/client';
import { startOfMonth, subMonths, format } from "date-fns";

const prisma = new PrismaClient();

// Type definition for historical data points
export interface HistoricalDataPoint {
  month: string;
  year: number;
  bookings?: number;
  confirmedBookings?: number;
  cancelledBookings?: number;
  users?: number;
  hostels?: number;
  conversionRate?: number;
}

// Function to get the month names for the last 5 months including current
export const getMonthLabels = (count = 5): string[] => {
  const months = [];
  for (let i = count - 1; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    months.push(format(date, 'MMM'));
  }
  return months;
};

/**
 * Fetches historical data for insights over the last 5 months
 */
export async function getHistoricalInsights(): Promise<HistoricalDataPoint[]> {
  try {
    // Get current date and 5 months ago date for the range
    const now = new Date();
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(now.getMonth() - 5);
    
    // Format dates for comparison
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Initialize result array with the last 5 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentMonth - i);
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      months.push({
        month: monthName,
        year,
        startDate: new Date(year, date.getMonth(), 1),
        endDate: new Date(year, date.getMonth() + 1, 0)
      });
    }
    
    // Prepare result array
    const result: HistoricalDataPoint[] = [];
    
    // For each month, gather the metrics
    for (const monthData of months) {
      // Get total bookings for the month
      const bookingsCount = await prisma.booking.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          }
        }
      });
      
      // Get confirmed bookings for the month
      const confirmedBookingsCount = await prisma.booking.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          },
          status: 'CONFIRMED'
        }
      });
      
      // Get cancelled bookings for the month
      const cancelledBookingsCount = await prisma.booking.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          },
          status: 'CANCELLED'
        }
      });
      
      // Get new users registered in the month
      const newUsersCount = await prisma.user.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          }
        }
      });
      
      // Get new hostels listed in the month
      const newHostelsCount = await prisma.hostel.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          }
        }
      });
      
      // Calculate conversion rate
      const conversionRate = bookingsCount > 0 ? (confirmedBookingsCount / bookingsCount) * 100 : 0;
      
      result.push({
        month: monthData.month,
        year: monthData.year,
        bookings: bookingsCount,
        confirmedBookings: confirmedBookingsCount,
        cancelledBookings: cancelledBookingsCount,
        users: newUsersCount,
        hostels: newHostelsCount,
        conversionRate
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching historical insights data:', error);
    return [];
  }
}
import { PrismaClient } from '@prisma/client';
import {  subMonths, format } from "date-fns";

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


export const getMonthLabels = (count = 5): string[] => {
  const months = [];
  for (let i = count - 1; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    months.push(format(date, 'MMM'));
  }
  return months;
};


export async function getHistoricalInsights(): Promise<HistoricalDataPoint[]> {
  try {
    
    const now = new Date();
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(now.getMonth() - 5);
    
    
    const currentMonth = now.getMonth();
    
    
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
    
    
    const result: HistoricalDataPoint[] = [];
    
    
    for (const monthData of months) {
      
      const bookingsCount = await prisma.booking.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          }
        }
      });
      
      
      const confirmedBookingsCount = await prisma.booking.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          },
          status: 'CONFIRMED'
        }
      });
      
      
      const cancelledBookingsCount = await prisma.booking.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          },
          status: 'CANCELLED'
        }
      });
      
      
      const newUsersCount = await prisma.user.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          }
        }
      });
      
      
      const newHostelsCount = await prisma.hostel.count({
        where: {
          createdAt: {
            gte: monthData.startDate,
            lte: monthData.endDate
          }
        }
      });
      
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
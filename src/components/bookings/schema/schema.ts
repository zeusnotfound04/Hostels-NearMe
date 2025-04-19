import { z } from "zod";
import { BookingStatus , Gender } from "@/constants";

export const bookingSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  username: z.string().optional().nullable(), // Make username optional
  hostelName: z.string(),
  hostelId: z.string(),
  status: z.nativeEnum(BookingStatus),
  referenceId: z.string(),
  phoneNumber: z.string(),
  userGender: z.nativeEnum(Gender),
  address: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Booking = z.infer<typeof bookingSchema>;

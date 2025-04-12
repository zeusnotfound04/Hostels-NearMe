"use server";

import axios from "axios";

export async function updateBooking(bookingId: string, formData: { status: string; notes?: string }) {
  try {
    const response = await axios.patch(`/api/bookings/${bookingId}`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    return { success: true , data: response.data };
  } catch (error) {
    console.error("Error updating booking:", error);
    return { success: false, error: "Failed to update booking" };
  }
}

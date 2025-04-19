import { useState, useEffect } from "react";

interface Coaching {
  id: string;
  name: string;
  value: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CoachingOption {
  value: string;
  label: string;
}

export function useCoachings() {
  const [coachings, setCoachings] = useState<CoachingOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoachings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/coaching");
        
        if (!response.ok) {
          throw new Error("Failed to fetch coaching centers");
        }
        
        const data: Coaching[] = await response.json();
        
        // Filter active coaching centers and format them for dropdown
        const formattedCoachings = data
          .filter(coaching => coaching.isActive)
          .map(coaching => ({
            value: coaching.value,
            label: coaching.name
          }));
        
        setCoachings(formattedCoachings);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching coaching centers:", err);
        setError(err.message || "Failed to load coaching centers");
      } finally {
        setLoading(false);
      }
    };

    fetchCoachings();
  }, []);

  return { coachings, loading, error };
}
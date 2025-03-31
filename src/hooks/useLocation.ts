import { useCallback, useEffect, useState } from "react";
import { State, City } from "country-state-city";

interface StateType {
    name: string;
    isoCode: string;
  }
  
  interface CityType {
    name: string;
  }

export const useLocation = () => {
  const [states, setStates] = useState<StateType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const indianStates = State.getStatesOfCountry("IN").map((state) => ({
        name: state.name,
        isoCode: state.isoCode,
      }));
      setStates(indianStates);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLoading(false);
    }
  }, []);

  const getCities = useCallback((stateCode: string): CityType[] => {
    if (!stateCode) return [];
    return City.getCitiesOfState("IN", stateCode).map((city) => ({
      name: city.name,
    }));
  }, []);

  return { states, getCities, loading };
};
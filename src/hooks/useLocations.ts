import { useState, useEffect } from 'react';
import axios from 'axios';

interface State {
  id: string;
  name: string;
  cities: City[];
}

interface City {
  id: string;
  name: string;
  stateId: string;
}

interface FormattedState {
  label: string;
  value: string;
}

interface FormattedCity {
  label: string;
  value: string;
}

export function useLocations() {
  const [states, setStates] = useState<FormattedState[]>([]);
  const [cities, setCities] = useState<Record<string, FormattedCity[]>>({});
  const [loading, setLoading] = useState(true);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to simulate city loading when a state is selected
  const setCityLoadingState = (stateId: string) => {
    setCitiesLoading(true);
    // Simulate a short loading time for cities when a state is selected
    setTimeout(() => {
      setCitiesLoading(false);
    }, 500);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('/api/locations/states');
        const stateData: State[] = response.data.states;
        
        // Format states for dropdown
        const formattedStates: FormattedState[] = stateData.map(state => ({
          label: state.name,
          value: state.id
        }));
        
        // Create a map of stateId to array of cities
        const citiesByState: Record<string, FormattedCity[]> = {};
        
        stateData.forEach(state => {
          citiesByState[state.id] = state.cities.map(city => ({
            label: city.name,
            value: city.id
          }));
        });
        
        setStates(formattedStates);
        setCities(citiesByState);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to load locations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLocations();
  }, []);
  
  return { states, cities, loading, citiesLoading, setCityLoadingState, error };
}
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useEffect, useState} from "react"; 
import { Label } from "recharts";
import { useLocation } from "@/hooks/useLocation";


interface StateType {
    name: string;
    isoCode: string;
  }
  
  interface CityType {
    name: string;
  }


export default function Page() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<CityType[]>([]);

  const { states, getCities, loading } = useLocation();

  // Update cities when state changes
  useEffect(() => {
    if (selectedStateCode) {
      const cities = getCities(selectedStateCode); 
      setAvailableCities(cities);
    } else {
      setAvailableCities([]);
    }
    setSelectedCity("");
  }, [selectedStateCode, getCities]);  // ✅ No infinite loop due to memoization

  const handleStateChange = (value: string) => {
    const selectedStateObj = states.find((state) => state.name === value);
    setSelectedState(value);
    setSelectedStateCode(selectedStateObj ? selectedStateObj.isoCode : "");
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Location Selector</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label name="state">State</Label>
            <Select
              value={selectedState}
              onValueChange={handleStateChange}
              disabled={loading}
            >
              <SelectTrigger id="state" className="w-full">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label name="city">City</Label>
            <Select
              value={selectedCity}
              onValueChange={handleCityChange}
              disabled={!selectedState || loading}
            >
              <SelectTrigger id="city" className="w-full">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  {availableCities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedState && selectedCity && (
            <div className="pt-4">
              <p className="text-sm">
                Selected location: {selectedCity}, {selectedState}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

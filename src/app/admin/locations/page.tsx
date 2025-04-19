/*eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable react/no-unescaped-entities */

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

export default function LocationsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  
  const [states, setStates] = useState<State[]>([]);
  const [newStateName, setNewStateName] = useState("");
  const [newCityName, setNewCityName] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [stateToDelete, setStateToDelete] = useState<string | null>(null);
  const [cityToDelete, setCityToDelete] = useState<{id: string, name: string} | null>(null);
  
  // Fetch states and cities when component mounts
  useEffect(() => {
    if (!session) {
      return;
    }
    
    if (session.user.role !== "ADMIN") {
      router.push("/");
      return;
    }
    
    fetchStatesAndCities();
  }, [session, router]);
  
  const fetchStatesAndCities = async () => {
    try {
      setIsLoading(true);
      setInitialLoading(true);
      const response = await axios.get("/api/locations/states");
      setStates(response.data.states);
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch locations. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
    }
  };
  
  const handleAddState = async () => {
    if (!newStateName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "State name cannot be empty.",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await axios.post("/api/locations/states", { name: newStateName.trim() });
      setNewStateName("");
      toast({
        title: "Success",
        description: "State added successfully.",
      });
      fetchStatesAndCities();
    } catch (error: any) {
      console.error("Error adding state:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to add state. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddCity = async () => {
    if (!newCityName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "City name cannot be empty.",
      });
      return;
    }
    
    if (!selectedStateId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a state.",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await axios.post("/api/locations/cities", { 
        name: newCityName.trim(), 
        stateId: selectedStateId 
      });
      setNewCityName("");
      toast({
        title: "Success",
        description: "City added successfully.",
      });
      fetchStatesAndCities();
    } catch (error: any) {
      console.error("Error adding city:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to add city. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteState = async (stateId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/locations/states/${stateId}`);
      toast({
        title: "Success",
        description: "State deleted successfully.",
      });
      fetchStatesAndCities();
    } catch (error: any) {
      console.error("Error deleting state:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to delete state. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setStateToDelete(null);
    }
  };
  
  const handleDeleteCity = async (cityId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/locations/cities/${cityId}`);
      toast({
        title: "Success",
        description: "City deleted successfully.",
      });
      fetchStatesAndCities();
    } catch (error: any) {
      console.error("Error deleting city:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to delete city. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setCityToDelete(null);
    }
  };

  // Loading screen component
  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 space-y-4"
    >
      <div className="relative w-20 h-20">
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-t-[#902920] border-r-[#902920] border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-[#902920] border-l-[#902920]"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-xl font-medium text-[#902920]">Loading locations...</p>
      <p className="text-sm text-muted-foreground max-w-md text-center">
        We're fetching the list of states and cities. This will only take a moment.
      </p>
    </motion.div>
  );
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Locations</h1>
      <p className="text-muted-foreground mb-8">
        Add and manage states and cities for your hostel and blog forms. These locations will be available for selection in the hostel and blog creation forms.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add State Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add State</CardTitle>
            <CardDescription>
              Add a new state that will be available for selection in forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="state-name">State Name</Label>
                <Input
                  id="state-name"
                  placeholder="Enter state name"
                  value={newStateName}
                  onChange={(e) => setNewStateName(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleAddState} 
              disabled={isLoading || !newStateName.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add State
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Add City Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add City</CardTitle>
            <CardDescription>
              Add a new city associated with a state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="state-select">Select State</Label>
                <Select
                  value={selectedStateId}
                  onValueChange={setSelectedStateId}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city-name">City Name</Label>
                <Input
                  id="city-name"
                  placeholder="Enter city name"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  disabled={!selectedStateId || isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleAddCity} 
              disabled={isLoading || !newCityName.trim() || !selectedStateId}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add City
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Separator className="my-8" />
      
      {/* List of States and Cities */}
      <h2 className="text-2xl font-bold mb-4">Current Locations</h2>
      
      {initialLoading && <LoadingScreen />}
      
      {!initialLoading && states.length === 0 && (
        <p className="text-muted-foreground">No states have been added yet.</p>
      )}
      
      {!initialLoading && states.length > 0 && (
        <div className="space-y-6">
          {states.map((state) => (
            <Card key={state.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex justify-between items-center">
                  <CardTitle>{state.name}</CardTitle>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        onClick={() => setStateToDelete(state.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will delete the state "{state.name}" and all its associated cities. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setStateToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => handleDeleteState(state.id)}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {state.cities.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {state.cities.map((city) => (
                      <li key={city.id} className="flex justify-between items-center p-4">
                        <span>{city.name}</span>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                              onClick={() => setCityToDelete({ id: city.id, name: city.name })}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will delete the city "{city.name}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setCityToDelete(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDeleteCity(city.id)}
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                  </>
                                ) : (
                                  "Delete"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-muted-foreground text-sm">No cities added to this state yet.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash } from "lucide-react";
import { 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell, 
  Table 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Coaching {
  id: string;
  name: string;
  value: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CoachingManagement = () => {
  const [coachings, setCoachings] = useState<Coaching[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoaching, setSelectedCoaching] = useState<Coaching | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    description: "",
    isActive: true,
  });

  // Fetch coaching centers on component mount
  useEffect(() => {
    fetchCoachings();
  }, []);

  // Fetch all coaching centers
  const fetchCoachings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/coaching");
      if (!response.ok) {
        throw new Error("Failed to fetch coaching centers");
      }
      const data = await response.json();
      setCoachings(data);
    } catch (error) {
      console.error("Error fetching coaching centers:", error);
      toast.error("Failed to load coaching centers");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle switch toggle for isActive
  const handleToggleActive = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      value: "",
      description: "",
      isActive: true,
    });
  };

  // Open edit dialog with coaching data
  const handleEditClick = (coaching: Coaching) => {
    setSelectedCoaching(coaching);
    setFormData({
      name: coaching.name,
      value: coaching.value,
      description: coaching.description || "",
      isActive: coaching.isActive,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog with coaching data
  const handleDeleteClick = (coaching: Coaching) => {
    setSelectedCoaching(coaching);
    setIsDeleteDialogOpen(true);
  };

  // Create new coaching center
  const handleAddCoaching = async () => {
    try {
      const response = await fetch("/api/coaching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add coaching center");
      }

      await fetchCoachings();
      resetForm();
      setIsAddDialogOpen(false);
      toast.success("Coaching center added successfully");
    } catch (error: any) {
      console.error("Error adding coaching center:", error);
      toast.error(error.message || "Failed to add coaching center");
    }
  };

  // Update existing coaching center
  const handleUpdateCoaching = async () => {
    if (!selectedCoaching) return;

    try {
      const response = await fetch(`/api/coaching/${selectedCoaching.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update coaching center");
      }

      await fetchCoachings();
      resetForm();
      setIsEditDialogOpen(false);
      toast.success("Coaching center updated successfully");
    } catch (error: any) {
      console.error("Error updating coaching center:", error);
      toast.error(error.message || "Failed to update coaching center");
    }
  };

  // Delete coaching center
  const handleDeleteCoaching = async () => {
    if (!selectedCoaching) return;

    try {
      const response = await fetch(`/api/coaching/${selectedCoaching.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete coaching center");
      }

      await fetchCoachings();
      setIsDeleteDialogOpen(false);
      toast.success("Coaching center deleted successfully");
    } catch (error: any) {
      console.error("Error deleting coaching center:", error);
      toast.error(error.message || "Failed to delete coaching center");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Coaching Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Coaching
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Coaching</DialogTitle>
              <DialogDescription>
                Add a new coaching center to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter coaching name"
                  className="col-span-3"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Value
                </Label>
                <Input
                  id="value"
                  name="value"
                  placeholder="Enter value (used for filtering)"
                  className="col-span-3"
                  value={formData.value}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter description (optional)"
                  className="col-span-3"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Active
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={handleToggleActive}
                  />
                  <Label htmlFor="isActive">
                    {formData.isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCoaching}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Coaching</DialogTitle>
              <DialogDescription>
                Update the coaching center information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  placeholder="Enter coaching name"
                  className="col-span-3"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Value
                </Label>
                <Input
                  id="edit-value"
                  name="value"
                  placeholder="Enter value (used for filtering)"
                  className="col-span-3"
                  value={formData.value}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  placeholder="Enter description (optional)"
                  className="col-span-3"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-isActive" className="text-right">
                  Active
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-isActive"
                    checked={formData.isActive}
                    onCheckedChange={handleToggleActive}
                  />
                  <Label htmlFor="edit-isActive">
                    {formData.isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCoaching}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the coaching center "{selectedCoaching?.name}"? 
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteCoaching}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coaching Centers</CardTitle>
          <CardDescription>
            Manage coaching centers that can be associated with hostels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : coachings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No coaching centers found. Add a new coaching center to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coachings.map((coaching) => (
                  <TableRow key={coaching.id}>
                    <TableCell className="font-medium">{coaching.name}</TableCell>
                    <TableCell>{coaching.value}</TableCell>
                    <TableCell>{coaching.description || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={coaching.isActive ? "default" : "secondary"}>
                        {coaching.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditClick(coaching)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteClick(coaching)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachingManagement;
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterDialogProps } from "@/types";
import { motion } from "framer-motion";

const FilterDialog: React.FC<FilterDialogProps> = ({
  open,
  onClose,
  title,
  children,
  onApply,
}) => {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="py-4 max-h-[70vh] overflow-y-auto px-1"
        >
          {React.Children.map(children, (child, index) => (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          ))}
        </motion.div>
        <DialogFooter className="flex flex-row gap-2 justify-end mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={onApply} 
            className="bg-[#902920] hover:bg-[#7a231c] transition-colors duration-200"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
import * as React from "react"
import { Column } from "@tanstack/react-table"
import { Check, PlusCircle } from "lucide-react"

import { cn } from "@/utils/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 border-dashed transition-all duration-200 hover:border-[#7E2424] hover:text-[#7E2424] group relative"
        >
          <PlusCircle className="w-4 h-4 mr-2 transition-transform group-hover:scale-110 duration-200" />
          <span className="font-medium">{title}</span>
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden animate-in slide-in-from-left-1"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal bg-[#7E2424]/10 text-[#7E2424] animate-in slide-in-from-left-1"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal bg-[#7E2424]/10 text-[#7E2424] animate-in slide-in-from-left-1"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[200px] p-0 shadow-lg animate-in zoom-in-95 duration-100" 
        align="start"
      >
        <Command className="rounded-lg border border-zinc-200">
          <CommandInput 
            placeholder={title} 
            className="h-9 focus-visible:ring-[#7E2424]"
          />
          <CommandList>
            <CommandEmpty className="text-sm text-zinc-500 py-6">
              No results found.
            </CommandEmpty>
            <CommandGroup className="p-1.5">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                    className="flex items-center px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-[#7E2424]/10 aria-selected:bg-[#7E2424]/10"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-[#7E2424] transition-colors duration-200",
                        isSelected
                          ? "bg-[#7E2424] text-white"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-zinc-500" />
                    )}
                    <span className="font-medium">{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs text-zinc-500">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator className="my-1" />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined)
                      setIsOpen(false)
                    }}
                    className="justify-center text-center text-sm font-medium text-[#7E2424] hover:text-[#7E2424]/80 hover:bg-[#7E2424]/5 rounded-md mx-1 my-1"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { SelectSingleEventHandler } from "react-day-picker";
type DatePickerProps = {
  htmlFor: string;
  label: string;
  value?: Date;
  fromDate?: Date;
  onChange: SelectSingleEventHandler;
};
export function DatePicker({
  htmlFor,
  label,
  value,
  onChange,
  fromDate,
}: DatePickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`counter-${htmlFor}`}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            fromDate={fromDate}
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

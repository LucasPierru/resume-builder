import React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { CalendarIcon } from "lucide-react";

function DatePicker({ value, onChange }: { value?: Date; onChange?: (date: Date) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={`pl-3 text-left font-normal ${!value && "text-muted-foreground"}`}>
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          required={true}
          selected={value}
          onSelect={onChange}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;

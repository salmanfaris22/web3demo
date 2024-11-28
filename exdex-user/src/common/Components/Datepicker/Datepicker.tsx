import React, { useState } from "react";
import { DateRange, Calendar, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

interface DatePickerProps {
  isRange?: boolean; // Determines if it's a range picker or single date picker
  onSelect: (date: any) => void; // Callback for date selection
}

const DatePicker: React.FC<DatePickerProps> = ({
  isRange = false,
  onSelect,
}) => {
  const [state, setState] = useState<any>(
    isRange
      ? {
          selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        }
      : new Date()
  );

  const handleSelect = (ranges: any) => {
    setState(ranges);
    onSelect(ranges);
  };

  const handleSelectSingle = (date: Date) => {
    setState(date);
    onSelect(date);
  };

  return (
    <div className="datePickerWrapper">
      <div className="custom-date-picker">
        {isRange ? (
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={[state.selection]}
            months={1}
            direction="horizontal"
          />
        ) : (
          <Calendar date={state} onChange={handleSelectSingle} />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
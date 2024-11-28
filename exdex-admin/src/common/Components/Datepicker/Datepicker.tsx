import React, { useState } from "react";
import { DateRange, Calendar, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

interface DatePickerProps {
  isRange?: boolean; // Determines if it's a range picker or single date picker
  onSelect: (date: any) => void; // Callback for date selection
  closeOnOutsideClick?: boolean;
  onClose?: () => void;
  dateValue?: any;
  customClass?:string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isRange = false,
  onSelect,
  onClose,
  closeOnOutsideClick,
  customClass,
  dateValue = isRange
    ? {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      }
    : new Date(),
}) => {
  const [state, setState] = useState<any>(dateValue);

  const handleSelect = (ranges: any) => {
    setState(ranges);
    onSelect(ranges);
  };

  const handleSelectSingle = (date: Date) => {
    setState(date);
    onSelect(date);
  };

  return (
    <div className={`datePickerWrapper ${customClass}`}>
      {closeOnOutsideClick && (
        <div className="datePickerBackdrop" onClick={onClose}></div>
      )}
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

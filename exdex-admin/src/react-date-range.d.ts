// react-date-range.d.ts
declare module 'react-date-range' {
    import { ReactNode } from 'react';
  
    interface DateRangeProps {
      ranges: any;
      onChange: (ranges: any) => void;
      editableDateInputs?: boolean;
      moveRangeOnFirstSelection?: boolean;
      months?: number;
      direction?: 'vertical' | 'horizontal';
    }
  
    interface CalendarProps {
      date: Date;
      onChange: (date: Date) => void;
    }
  
    export class DateRange extends React.Component<DateRangeProps, any> {}
    export class Calendar extends React.Component<CalendarProps, any> {}
    export class DateRangePicker extends React.Component<any, any> {}
  }
  
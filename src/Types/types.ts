export interface DateRangePickerProps {
  predefinedRanges?: { label: string; getRange: () => [Date, Date] }[];
  onChange?: (selectedRange: [Date, Date], weekends: Date[]) => void;
}

export interface PredefinedRange {
  label: string;
  getRange: () => [Date, Date];
}
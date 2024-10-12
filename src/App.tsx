import {DateRangePicker} from './components/DateRangePicker/DateRangePicker';
import { PredefinedRange } from './Types/types';
import './App.css'

const predefinedRanges: PredefinedRange[] = [
  {
    label: 'Last 7 days',
    getRange: () => {
      const today = new Date();
      const last7Days = new Date();
      last7Days.setDate(today.getDate() - 6);
      return [last7Days, today];
    },
  },
  {
    label: 'Last 30 days',
    getRange: () => {
      const today = new Date();
      const last30Days = new Date();
      last30Days.setDate(today.getDate() - 29);
      return [last30Days, today];
    },
  },
];

const App = () => {
  const handleRangeChange = (selectedRange: [Date, Date], weekends: Date[]) => {
    console.log('Selected Range:', selectedRange);
    console.log('Weekends in Range:', weekends);
  };

  return (
    <div className='date-range-container'>
      <h1>Date Range Picker</h1>
      <DateRangePicker predefinedRanges={predefinedRanges} onChange={handleRangeChange} />
    </div>
  );
};

export default App;

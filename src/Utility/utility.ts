export const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  
export const getWeekendsInRange = (start: Date, end: Date): Date[] => {
    const weekends: Date[] = [];
    const currentDate = new Date(start);
  
    while (currentDate <= end) {
      if (!isWeekday(currentDate)) {
        weekends.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return weekends;
  };

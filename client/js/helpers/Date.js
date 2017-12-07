const MonthToString = (monthNumber) => {
  switch(monthNumber){
    case 1: {
      return { monthNo: 1, monthName: 'January' };
    }
    case 2: {
      return { monthNo: 2, monthName: 'February' };
    }
    case 3: {
      return { monthNo: 3, monthName: 'March' };
    }
    case 4: {
      return { monthNo: 4, monthName: 'April' };
    }
    case 5: {
      return { monthNo: 5, monthName: 'May' };
    }
    case 6: {
      return { monthNo: 6, monthName: 'June' };
    }
    case 7: {
      return { monthNo: 7, monthName: 'July' };
    }
    case 8: {
      return { monthNo: 8 , monthName: 'August' };
    }
    case 9: {
      return { monthNo: 9, monthName: 'September' };
    }
    case 10: {
      return { monthNo: 10, monthName: 'October' };
    }
    case 11: {
      return { monthNo: 11, monthName: 'November' };
    }
    case 12: {
      return { monthNo: 12, monthName: 'December' };
    }
  }
}

export default MonthToString;
package rwilk.hb.util;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import rwilk.hb.model.CategorySpending;
import rwilk.hb.model.MonthSpending;

public class Utils {

  public static List<CategorySpending> mapToCategorySpending(List<Object> objects) {
    List<CategorySpending> categorySpending = new ArrayList<>();
    for (Object o : objects) {
      Object[] obj = (Object[]) o;
      categorySpending.add(CategorySpending.builder()
          .name(String.valueOf(obj[0]))
          .sum(Double.valueOf(String.valueOf(obj[1])))
          .build());
    }
    return categorySpending;
  }

  public static List<MonthSpending> mapToMonthSpending(List<Object> objects) {
    List<MonthSpending> monthSpending = new ArrayList<>();
    for (Object o : objects) {
      Object[] obj = (Object[]) o;
      monthSpending.add(MonthSpending.builder()
          .month(Integer.valueOf(String.valueOf(obj[0])))
          .year(Double.valueOf(String.valueOf(obj[1])).intValue())
          .sum(Double.valueOf(String.valueOf(obj[2])))
          .build());
    }
    return monthSpending;
  }

  public static Calendar setFirstDayOfMonth(Calendar date) {
    Calendar firstDay = Calendar.getInstance();
    firstDay.set(Calendar.DATE, 1);
    firstDay.set(Calendar.MONTH, date.get(Calendar.MONTH));
    firstDay.set(Calendar.YEAR, date.get(Calendar.YEAR));
    return firstDay;
  }

  public static Calendar setFirstDayOfYear(Calendar date) {
    Calendar firstDay = Calendar.getInstance();
    firstDay.set(Calendar.DATE, 1);
    firstDay.set(Calendar.MONTH, Calendar.JANUARY);
    firstDay.set(Calendar.YEAR, date.get(Calendar.YEAR));
    return firstDay;
  }

  public static Calendar setFirstDayOfPreviousMonth(Calendar date) {
    Calendar firstDay = Calendar.getInstance();
    firstDay.set(Calendar.DATE, 1);
    firstDay.set(Calendar.YEAR, date.get(Calendar.YEAR));
    firstDay.set(Calendar.MONTH, date.get(Calendar.MONTH));
    firstDay.add(Calendar.MONTH, -1);
    return firstDay;
  }

  public static Calendar setLastDayOfMonth(Calendar date) {
    YearMonth yearMonth = YearMonth.of(date.get(Calendar.YEAR), date.get(Calendar.MONTH) + 1);
    Calendar lastDay = Calendar.getInstance();
    lastDay.set(Calendar.DATE, yearMonth.lengthOfMonth());
    lastDay.set(Calendar.MONTH, date.get(Calendar.MONTH));
    lastDay.set(Calendar.YEAR, date.get(Calendar.YEAR));
    return lastDay;
  }

  public static Calendar setLastDayOfYear(Calendar date) {
    YearMonth yearMonth = YearMonth.of(date.get(Calendar.YEAR), Calendar.DECEMBER);
    Calendar lastDay = Calendar.getInstance();
    lastDay.set(Calendar.DATE, yearMonth.lengthOfMonth());
    lastDay.set(Calendar.MONTH, Calendar.DECEMBER);
    lastDay.set(Calendar.YEAR, date.get(Calendar.YEAR));
    return lastDay;
  }

  public static Calendar setLastDayOfPreviousMonth(Calendar date) {
    Calendar lastDay = Calendar.getInstance();
    lastDay.set(Calendar.MONTH, date.get(Calendar.MONTH));
    lastDay.set(Calendar.YEAR, date.get(Calendar.YEAR));
    lastDay.add(Calendar.MONTH, -1);
    YearMonth yearMonth = YearMonth.of(lastDay.get(Calendar.YEAR), lastDay.get(Calendar.MONTH) + 1);
    lastDay.set(Calendar.DATE, yearMonth.lengthOfMonth());
    return lastDay;
  }

}

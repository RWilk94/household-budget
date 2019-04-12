package rwilk.hb.service.ai;

public enum AvgTemperature {

  JANUARY(-2.3),
  FEBRUARY(-1.3),
  MARCH(2.8),
  APRIL(8.5),
  MAY(14.0),
  JUNE(16.8),
  JULY(18.8),
  AUGUST(18.1),
  SEPTEMBER(13.5),
  OCTOBER(8.6),
  NOVEMBER(3.4),
  DECEMBER(-1.0);

  private Double value;

  AvgTemperature(Double value) {
    this.value = value;
  }

  public Double getValue() {
    return value;
  }

}

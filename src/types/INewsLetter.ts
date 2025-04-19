enum months {
  JANUARY,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
}

interface INewsLetter extends IEmail {
  month: months;
  headline: string;
  content: string;
  unsubscribeLink: string;
  author: string;
}

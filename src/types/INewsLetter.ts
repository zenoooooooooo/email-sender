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
    headline1: string;
    content1: string;
    unsubscribeLink: string;
}
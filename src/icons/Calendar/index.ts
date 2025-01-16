import timer from './Timer.svg';
import timerRemove from './Timer_Remove.svg';
import timerClose from './Timer_Close.svg';
import timerAdd from './Timer_Add.svg';
import clock from './Clock.svg';
import calendarWeek from './Calendar_Week.svg';
import calendar from './Calendar.svg';
import calendarRemove from './Calendar_Remove.svg';
import calendarEvent from './Calendar_Event.svg';
import calendarDays from './Calendar_Days.svg';
import calendarClose from './Calendar_Close.svg';
import calendarCheck from './Calendar_Check.svg';
import calendarAdd from './Calendar_Add.svg';
import alarm from './Alarm.svg';
const vals = {
alarm,
calendarAdd,
calendarCheck,
calendarClose,
calendarDays,
calendarEvent,
calendarRemove,
calendar,
calendarWeek,
clock,
timerAdd,
timerClose,
timerRemove,
timer,
} as const

export default vals as SVGObject<typeof vals>

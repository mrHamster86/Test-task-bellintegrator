import * as moment from 'moment';
import 'moment/locale/ru';

const startDay = -7;
const endDay = 7;
const startTime = `10:00`;
const endTime = `20:00`;
const durationOfMovie = `2`;
const numberRow = 10;
const numberSeats = 30;

const getRandomFloat = (max, min = 1) => Math.round(Math.random() * (max - min) + min);

const getSession = () => {
  const arr = () => new Array(Math.round(Math.random() * numberSeats))
                .fill(``)
                .map(() => getRandomFloat(numberSeats));

  return new Array(numberRow)
          .fill(``)
          .map(() => new Set([...arr()]));
};

const getListSessions = () => {
  const map = new Map();
  let time = moment(startTime, `HH:mm`).format(`HH:mm`);

  while (moment(time, `HH:mm`).isBefore(moment(endTime, `HH:mm`).add(durationOfMovie, `H`), `HH`)) {
    map.set(time, getSession());
    time = moment(time, `HH:mm`).add(durationOfMovie, `H`).format(`HH:mm`);
  }

  return map;
};

export default (dayNow) => {
  const map = new Map();
  for (let i = startDay; i <= endDay; i++) {
    map.set(moment(dayNow).add(i, `days`).format(`D MMMM`), getListSessions());
  }
  return map;
};

export const setup = {
  startDay,
  endDay,
  startTime,
  endTime,
  durationOfMovie,
  numberRow,
  numberSeats,
};

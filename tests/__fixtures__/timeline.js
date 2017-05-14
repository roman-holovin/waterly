import subDays from 'date-fns/sub_days';

export default [{
  date: subDays(Date.now(), 4),
  consumption: 1.2,
}, {
  date: subDays(Date.now(), 3),
  consumption: 1.3,
}, {
  date: subDays(Date.now(), 2),
  consumption: 1.8,
}, {
  date: subDays(Date.now(), 1),
  consumption: 2,
}, {
  date: Date.now(),
  consumption: 0.5,
}];


const unitNames = {
  short: {
    year: "y",
    week: "w",
    day: "d",
    hour: "h",
    minute: "m",
    second: "s",
    millisecond: "ms",
  },
  long: {
    year: " year(s)",
    week: " week(s)",
    day: " day(s)",
    hour: " hour(s)",
    minute: " minute(s)",
    second: " second(s)",
    millisecond: " millisecond(s)",
  },
};

const millisecondTo = {
  second: 1 / 1000,
  minute: 1 / (1000 * 60),
  hour: 1 / (1000 * 60 * 60),
  day: 1 / (1000 * 60 * 60 * 24),
  week: 1 / (1000 * 60 * 60 * 24 * 7),
  year: 1 / (1000 * 60 * 60 * 24 * 7 * 52),
};

const unitify = (value: number, units: any, unitname: string) => {
  return value + units[unitname as any].replace(/\(s\)/, value === 1 ? "" : "s");
};

const parseMilliseconds = (ms: number) => {
  const totalSeconds = Math.floor(ms * millisecondTo.second);
  const totalMinutes = Math.floor(ms * millisecondTo.minute);
  const totalHours = Math.floor(ms * millisecondTo.hour);
  const totalDays = Math.floor(ms * millisecondTo.day);
  const totalWeeks = Math.floor(ms * millisecondTo.week);
  const totalYears = Math.floor(ms * millisecondTo.year);

  const years = totalYears;
  const weeks = totalWeeks % 52;
  const days = totalDays % 7;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return { years, weeks, days, hours, minutes, seconds, milliseconds };
};

const formatMilliseconds = (ms: number, { units = "short", ignore = [], largestOnly = false }: { ignore?: any[]; units?: string; largestOnly?: boolean }) => {
  ms = Math.abs(ms);

  const comps = parseMilliseconds(ms);

  const unitSet = unitNames[units as keyof typeof unitNames];

  const parts: any[] = [];

  const addPartIfNonZero = (arr: any[], key: string, unitName: string) => {
    if (comps[key as keyof typeof comps] <= 0 || ignore.includes(unitName)) return;
    if (largestOnly && parts.length > 0) return;
    arr.push(unitify(comps[key as keyof typeof comps], unitSet, unitName));
  };

  addPartIfNonZero(parts, "years", "year");
  addPartIfNonZero(parts, "weeks", "week");
  addPartIfNonZero(parts, "days", "day");
  addPartIfNonZero(parts, "hours", "hour");
  addPartIfNonZero(parts, "minutes", "minute");
  addPartIfNonZero(parts, "seconds", "second");
  addPartIfNonZero(parts, "milliseconds", "millisecond");

  return parts.join(" ");
};

export { formatMilliseconds, parseMilliseconds };

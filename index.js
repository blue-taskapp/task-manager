const GCClient = require("gcal");

function schedule(from, to) {
  if (from.getTime() >= to.getTime()) {
    throw new Error("From and To are invalid.");
  }
  const schedules = [];
  let date = from;
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  while (true) {
    if (from.getTime() > to.getTime()) {
      break;
    }
    for (let i = 0; i < 24; i++) {
      date.setHours(i);
      schedules.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: i,
        date: new Date(date.getTime()),    
        title: "",
      });
    }
    date.setDate(date.getDate() + 1);
  }
  return schedules;
}

async function filterGCal(schedules) {
  const client = new GCClient("./credentials.json");
  await client.waitAuth(3000);
  const events = await client.listEvents();
  console.log(events);
  let result = schedules;
  for (const evt of events) {
    result = result.filter(schedule => {
      const t = schedule.date;
      const start = new Date(evt.start.dateTime);
      const end = new Date(evt.end.dateTime);
      if (start.getTime() < t.getTime() && end.getTime() > t.getTime()) {
        console.log(schedule);
      }
      return !(start.getTime() <= t.getTime() && end.getTime() >= t.getTime());
    });
  }
  return result;
}

module.exports = {
  filterGCal,
  schedule,
}

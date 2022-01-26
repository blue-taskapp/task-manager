const { schedule, filterGCal } = require(".");

(async () => {
  const schedules = schedule(new Date(2022, 0, 26), new Date(2022, 0, 27));
  const freeTime = await filterGCal(schedules);
  console.log(freeTime);
})();

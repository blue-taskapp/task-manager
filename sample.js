const { schedule, filterGCal } = require(".");

(async () => {
  const schedules = schedule(new Date(2022, 0, 24), new Date(2022, 0, 25));
  const freeTime = await filterGCal(schedules);
  console.log(freeTime);
})();

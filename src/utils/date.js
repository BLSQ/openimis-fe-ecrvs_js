import moment from "moment";

export function formatDateTimeFromISO(mm, date) {
  if (!date) return "/";
  return moment(date).format(mm.getConf("fe-core", "dateFormat", "YYYY-MM-DD - HH:mm:ss"));
}
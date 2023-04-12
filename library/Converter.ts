import { DaySchedule, DayStreamerData } from './api/DotscheduleApi'
import { CardType } from 'components/field/Schedules';

// 1分未満の場合は秒表示、1分以上の場合は~時間~分表示(後者の場合でも1時間未満なら~時間を表示しない)
const parseDurationNum = (duration: number | undefined) => {
  if (duration === null || duration === undefined) { return ''; }
  if (duration === 0) { return ''; }
  const _h = duration / (60 * 60);
  const withouth = duration % (60 * 60);
  const _m = withouth / 60;
  const m = _m < 1 ? 0 : Math.round(_m);
  const s = withouth % 60;
  const h = _h + (m >= 60 ? m / 60 : 0);
  const hString = Math.floor(h) > 0 ? Math.floor(h) + '時間' : '';
  const mString = (m % 60) > 0 ? (Math.floor(h) > 0 ? ('0' + (m % 60)).slice(-2) : (m % 60)) + '分' : '';
  const sString = duration < 60 ? Math.floor(s) + '秒' : '';
  return hString + mString + sString;
}

export const formatDateUTC = (date: Date, format: string) => {
  format = format.replace(/yyyy/g, date.getUTCFullYear().toString());
  format = format.replace(/MM/g, ('0' + (date.getUTCMonth() + 1).toString()).slice(-2));
  format = format.replace(/M/g, (date.getUTCMonth() + 1).toString());
  format = format.replace(/dd/g, ('0' + (date.getUTCDate()).toString()).slice(-2));
  format = format.replace(/d/g, (date.getUTCDate()).toString());
  format = format.replace(/HH/g, ('0' + (date.getUTCHours()).toString()).slice(-2));
  format = format.replace(/mm/g, ('0' + (date.getUTCMinutes()).toString()).slice(-2));
  format = format.replace(/ss/g, (date.getUTCSeconds()).toString());
  format = format.replace(/SS/g, (date.getUTCMilliseconds()).toString());
  return format;
};

export const DayScheduleToCardType = (s: DaySchedule, timeType?: 'time' | 'datetime'): CardType => {
  if (timeType === undefined) timeType = 'time';

  const d = new Date(s.StreamingData.StartDate)

  // format date is always utc. to jst = add 9 hours
  d.setHours(d.getHours() + 9)

  let start = '';
  switch (timeType) {
    case 'time': {
      start = formatDateUTC(d, 'HH:mm');
      break;
    }
    case 'datetime': {
      start = formatDateUTC(d, 'yyyy/M/d HH:mm');
      break;
    }
  }

  return({
    headerAvater: s.StreamerData.Icon ?? '',
    name: s.StreamerData.Name,
    start: start,
    durationValue: s.StreamingData.Status === 3 ? "配信予定" : parseDurationNum(s.StreamingData.Duration),
    mediaSrc: s.StreamingData.Thumbnail,
    mediahref: s.StreamingData.URL,
    title: s.StreamingData.Title,
    onLive: s.StreamingData.Status === 2,
    charactorIconSources: s.Participants?.filter(x => x.ID != 'dotlive_official').map(x => x.Icon) ?? []
  })

}

export const DayStreamerDataListToDayIcons = (list: DayStreamerData[]): { [key: number]: string[] } => {
  if (list === null) return {};

  let res: { [key: number]: string[] } = {};
  for (const data of list) {
    const d = data.Date.split("-")[2]
    const dnum = parseInt(d)
    if (isNaN(dnum)) {
      console.log(`Date of DayStreamerData parse Error. Date: ${data.Date}`);
      continue;
    }
    res[dnum] = data.Participants.map(x => x.Icon);
  }

  return res;
}
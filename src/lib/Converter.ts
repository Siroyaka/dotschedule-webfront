import { VideoSchedule, MonthData } from './firebase';
import { DaySchedule, DayStreamerData } from './api/DotscheduleApi'
import { CardType } from 'components/field/Schedules';
import { CardType as NewsCardType } from 'components/field/News';
import { streamerDataMap } from './Constructions';

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
  format = format.replace(/dd/g, ('0' + (date.getUTCDate()).toString()).slice(-2));
  format = format.replace(/HH/g, ('0' + (date.getUTCHours()).toString()).slice(-2));
  format = format.replace(/mm/g, ('0' + (date.getUTCMinutes()).toString()).slice(-2));
  format = format.replace(/ss/g, (date.getUTCSeconds()).toString());
  format = format.replace(/SS/g, (date.getUTCMilliseconds()).toString());
  return format;
};

export const VideoScheduleToCardType = (s: VideoSchedule): CardType => {
  const d = s.StartDate.toDate();
  d.setHours(d.getHours() + 9);
  const participantKeys = Object.keys(s.Participants ?? {});
  return({
    headerAvater: s.StreamerID in streamerDataMap ? streamerDataMap[s.StreamerID].youtubeIcon : '',
    name: s.StreamerName,
    start: formatDateUTC(d, 'HH:mm'),
    durationValue: parseDurationNum(s.Duration),
    mediaSrc: s.Thumbnail,
    mediahref: s.VideoLink,
    title: s.VideoTitle,
    onLive: s.VideoStatus === 2,
    charactorIconSources: participantKeys?.map(x => x in streamerDataMap ? (streamerDataMap[x]).youtubeIcon : '').filter(x => x !== '') ?? []
  })
}

export const VideoScheduleToNews = (videoSchedule: VideoSchedule): NewsCardType => {
  const d = videoSchedule.StartDate.toDate();
  d.setHours(d.getHours() + 9);
  const title = formatDateUTC(d, 'yyyy/MM/dd HH:mm:ss');
  const participantKeys = Object.keys(videoSchedule.Participants ?? {});
  return({
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    title: title,
    duration: parseDurationNum(videoSchedule.Duration),
    mediaSrc: videoSchedule.Thumbnail,
    mediahref: videoSchedule.VideoLink,
    content: videoSchedule.VideoTitle,
    charactorIconSources: participantKeys.map(x => x in streamerDataMap ? (streamerDataMap[x]).youtubeIcon : '').filter(x => x !== '') ?? [],
  })
}

export const PickupStreamerFromVideoSchedule = (s: VideoSchedule): string => s.StreamerID in streamerDataMap ? streamerDataMap[s.StreamerID].textIcon : '';

export const MonthDataToImgData = (d: MonthData | null): { [key: number]: string[] } => {
  if (d === null) return {};
  let res: { [key: number]: string[] } = {};
  for (let i = 1; i <= 31; i++) {
    if(i in d.Data) res[i] = d.Data[i].map(x => x in streamerDataMap ? streamerDataMap[x].youtubeIcon : '');
  }
  return res;
}

export const DayScheduleToCardType = (s: DaySchedule): CardType => {
  const d = new Date(s.StartDate)

  // format date is always utc. to jst = add 9 hours
  d.setHours(d.getHours() + 9)

  return({
    headerAvater: s.StreamerIcon ?? '',
    name: s.StreamerName,
    start: formatDateUTC(d, 'HH:mm'),
    durationValue: parseDurationNum(s.Duration),
    mediaSrc: s.Thumbnail,
    mediahref: s.VideoLink,
    title: s.VideoTitle,
    onLive: s.VideoStatus === 2,
    charactorIconSources: s.Participants?.map(x => x.Icon) ?? []
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
    res[dnum] = data.Icons;
  }

  return res;
}
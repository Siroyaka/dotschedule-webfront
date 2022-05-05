import { VideoSchedule, MonthData } from './firebase';
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

export const formatDate = (date: Date, format: string) => {
  format = format.replace(/yyyy/g, date.getFullYear().toString());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1).toString()).slice(-2));
  format = format.replace(/dd/g, ('0' + (date.getDate()).toString()).slice(-2));
  format = format.replace(/HH/g, ('0' + (date.getHours()).toString()).slice(-2));
  format = format.replace(/mm/g, ('0' + (date.getMinutes()).toString()).slice(-2));
  format = format.replace(/ss/g, (date.getSeconds()).toString());
  format = format.replace(/SS/g, (date.getMilliseconds()).toString());
  return format;
};

export const VideoScheduleToCardType = (s: VideoSchedule): CardType => {
  const d = s.StartDate.toDate();
  d.setHours(d.getHours() + 9);
  return({
    headerAvater: s.StreamerID in streamerDataMap ? streamerDataMap[s.StreamerID].youtubeIcon : '',
    name: s.StreamerName,
    start: formatDate(d, 'HH:mm'),
    durationValue: parseDurationNum(s.Duration),
    mediaSrc: s.Thumbnail,
    mediahref: s.VideoLink,
    title: s.VideoTitle,
    onLive: s.VideoStatus === 2,
    charactorIconSources: s.Charactors?.map(x => x in streamerDataMap ? (streamerDataMap[x]).youtubeIcon : '').filter(x => x !== '') ?? []
  })
}

export const VideoScheduleToNews = (s: VideoSchedule): NewsCardType => {
  const d = s.StartDate.toDate();
  d.setHours(d.getHours() + 9);
  return({
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    mediaSrc: s.Thumbnail,
    mediahref: s.VideoLink,
    title: s.VideoTitle,
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

import * as Firebase from 'firebase/app';
import * as FireStore from 'firebase/firestore';

interface FireStoreTimeStamp {
  nanoseconds: number,
  seconds: number,
  toDate: () => Date,
  toMills: () => any,
  toString: () => string,
}

const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  databaseURL: process.env.FB_DATABASEURL,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_MESSAGINGSENDERID,
  appId: process.env.FB_APPID
};

// Initialize Firebase
try {
  Firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.error("Firebase initialization error", err.stack);
}

export interface VideoSchedule {
    StreamerName: string,
    StreamerID: string,
    VideoLink: string,
    VideoStatus: number,
    VideoTitle: string,
    Thumbnail: string,
    StartDate: FireStoreTimeStamp,
    Duration?: number,
    Participants: {[key:string]: boolean},
}

export interface MonthData {
    MonthKey: number,
    Data: {[key: number]:string[]},
}

const fetchSchedule = (year: number, month: number, day: number) => {
  const d = new Date(year, month - 1, day, -6);
  const nextDate = new Date(year, month - 1, day + 1, -6);

  const db = FireStore.getFirestore();
  const query = FireStore.query(
    FireStore.collection(db, 'VideoSchedules'),
    FireStore.orderBy('StartDate'),
    FireStore.startAt(d),
    FireStore.endBefore(nextDate)
  );
  return FireStore.getDocs(query).then(items => {
    const videoSchedules: VideoSchedule[] = [];
    let readNum = 0;
    items.forEach(item => {
      const scheduleItem = item.data() as VideoSchedule;
      readNum += 1;
      if (scheduleItem.VideoStatus > 0 && scheduleItem.VideoStatus < 5) videoSchedules.push(scheduleItem);
    })
    return videoSchedules;
  })
  .catch((err: Error) => {
    console.error(`Error fetch day schedule. ${year}-${month}-${day} msg:[${err.message}]`);
    return err;
  });
}

// 指定されたStreamerIDのdateの日時以前のスケジュール情報を引き出す。quantityでいくつ引き出すかを指定する。
const fetchSchedulesBeforeDate = (streamerId: string, date: Date, quantity: number = 10) => {
  const db = FireStore.getFirestore();
  const query = FireStore.query(
    FireStore.collection(db, 'VideoSchedules'),
    FireStore.where('StreamerID', '==', streamerId),
    FireStore.orderBy('StartDate', 'desc'),
    FireStore.startAfter(date),
    FireStore.limit(quantity)
  );
  return FireStore.getDocs(query).then(items => {
    const videoSchedules: VideoSchedule[] = [];
    items.forEach(item => {
      const scheduleItem = item.data() as VideoSchedule;
      if (scheduleItem.VideoStatus > 0 && scheduleItem.VideoStatus < 5) videoSchedules.push(scheduleItem);
    })
    return videoSchedules;
  })
  .catch((err: Error) => {
    console.error(`Error fetch new schedule. ${streamerId} msg:[${err.message}]`);
    return err;
  });
}

const fetchStreamerSchedules = (streamerIds: string[], date: Date, quantity: number = 10) => {
  const db = FireStore.getFirestore();
  const query = FireStore.query(
    FireStore.collection(db, 'VideoSchedules'),
    FireStore.where('Charactors', 'array-contains-any', streamerIds),
    FireStore.orderBy('StartDate', 'desc'),
    FireStore.startAfter(date),
    FireStore.limit(quantity)
  );
  return FireStore.getDocs(query).then(items => {
    const videoSchedules: VideoSchedule[] = [];
    items.forEach(item => {
      const scheduleItem = item.data() as VideoSchedule;
      if (scheduleItem.VideoStatus > 0 && scheduleItem.VideoStatus < 5) videoSchedules.push(scheduleItem);
    })
    return videoSchedules;
  })
  .catch((err: Error) => {
    console.error(`Error fetch new schedule. ${streamerIds.join(',')} msg:[${err.message}]`);
    return err;
  });
}

const fetchMonthScheduleData = (year: number, month: number) => {
  const monthKey = year * 13 + month;
  const db = FireStore.getFirestore();
  const query = FireStore.query(
    FireStore.collection(db, 'MonthData'),
    FireStore.orderBy('MonthKey'),
    FireStore.startAt(monthKey),
    FireStore.endAt(monthKey),
    FireStore.limit(1)
  );
  return FireStore.getDocs(query).then(items => {
    let monthData: MonthData | null = null;
    items.forEach(item => {
      monthData = item.data() as MonthData;
    })
    return monthData;
  })
  .catch((err: Error) => {
    console.error(`Error fetch month schedule. ${year}-${month} msg:[${err.message}]`);
    return err;
  });
}

export const fetchMonthData = async<T> (year: number, month: number, converter: (d: MonthData | null) => T) => {
  const fetchResult = await fetchMonthScheduleData(year, month);
  if(fetchResult instanceof Error) {
    console.error(fetchResult.message, new Date());
    return {};
  }
  return converter(fetchResult);
}

export const fetchScheduleData = async<T> (year: number, month: number, day: number, converter: (d: VideoSchedule) => T, getDayStreamers: (d: VideoSchedule) => string = (d) => d.StreamerName) => {
  const fetchResult = await fetchSchedule(year, month, day);
  if(fetchResult instanceof Error){
    console.error(fetchResult.message, new Date());
    return {convertData: [], dayStreamers: []};
  }
  const dayStreamers = Array.from(new Set(fetchResult.map(getDayStreamers)));
  return {convertData: fetchResult.map(converter), dayStreamers};
}

export const getSchedulesBeforeData = <T>(converter: (d: VideoSchedule) => T) => async (id: string, date: Date, quantity: number = 10) => {
  const result = await fetchStreamerSchedules([id], date, quantity);
  if(result instanceof Error){
    console.error(result.message, new Date());
    return [];
  }
  return result.map(converter);
}

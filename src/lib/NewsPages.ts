import { getNewsStreamerList } from 'src/lib/Constructions';
import { getSchedulesBeforeData } from 'src/lib/DataInterface';
import { VideoScheduleToNews } from 'src/lib/Converter';
import { getJstTime, getUtc } from 'src/lib/DateFunctions';

export const fetchData = async (slug?: string) => {
  const updateTime = getUtc(new Date());
  updateTime.setHours(0, 0, 0, 0); // GMT 0:00 -> JST 9:00

  const getData = async (slug) => {
    const match = getNewsStreamerList().find(x => x.slug === slug);
    const quantity = 10; // 取得個数
    return await getSchedulesBeforeData(VideoScheduleToNews)(match.id, updateTime, quantity);
  }

  const data = slug ? await getData(slug) : null;

  // revalidateは現在から翌日の9:00までの差分
  const now = getUtc(new Date());
  const nextUpdateDate = new Date(updateTime);
  nextUpdateDate.setDate(nextUpdateDate.getDate() + 1);
  const secForNextUpdate = Math.floor((nextUpdateDate.getTime() - now.getTime()) / 1000)

  // いつの更新分であるかを示す(endDateを日本時間にする)
  const jstUpdateTime = getJstTime(updateTime);

  return {
    data,
    year: jstUpdateTime.year,
    month: jstUpdateTime.month,
    day: jstUpdateTime.day,
    hour: 9,
    secForNextUpdate,
  }
}
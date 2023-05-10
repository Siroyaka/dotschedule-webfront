export const twMetaData: {
    cardType: "summary" | "app",
    site: string
} = {
    cardType: "summary",
    site: "@Siro_yaka"
}

export const basicMetaData = {
    viewPort: {
        initialScale: 1,
        width: "device-width",
        minimumScale: 1,
        maximumScale: 1
    },
    icon: '/favicon.ico',
    themeColor: "#FAC141",
}

export const ogpMetaData = {
    url: "https://dotschedule-lite.siroyaka.net",
    title: "どっとスケジュール",
    description: "どっとライブメンバーのYoutube配信スケジュールをまとめたサイトです。",
    image: "https://dotschedule-lite.siroyaka.net/asset/images/dotschedule_icon_tw.png"
}

export const iosMetaData: {
    capable: boolean,
    statusBarStyle: 'default',
    title: string,
    iconLinkSizeDefault: string,
    iconLinkSize76: string,
    iconLinkSize120: string,
    iconLinkSize152: string,
    iconLinkSize180: string,
    startupImage: string,
} = {
  capable: true,
  statusBarStyle: 'default',
  title: 'どっとスケジュール',
  iconLinkSizeDefault: '/asset/images/dotschedule_icon_ios.png',
  iconLinkSize76: '/asset/images/dotschedule_icon_ios_76.png',
  iconLinkSize120: '/asset/images/dotschedule_icon_ios_120.png',
  iconLinkSize152: '/asset/images/dotschedule_icon_ios_152.png',
  iconLinkSize180: '/asset/images/dotschedule_icon_ios_180.png',
  startupImage: '/asset/images/dotschedule_icon_ios_startup.png'
}

export const todayTitle = 'どっとスケジュール';

export const newSchedulesTitle = 'newSchedule';

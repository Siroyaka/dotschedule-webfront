const getCardValues = () => {
  const c_value = () => ({
    headerAvater: "https://yt3.ggpht.com/a/AATXAJx624rrk9O96s-dxFB7PGAJd_UFYe-jBnAkvQ=s100-c-k-c0xffffffff-no-rj-mo",
    name: "もこ田めめめ",
    start: "03:04~",
    durationValue: "1時間05分",
    mediaSrc: "https://i.ytimg.com/vi/c91K-QkaxMs/hqdefault.jpg",
    mediahref: "https://www.youtube.com/watch?v=c91K-QkaxMs",
    title: '【寝る前ざつだん】もうろくがつです',
  });
  return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(_ => c_value());
}

export const cardValues = getCardValues();
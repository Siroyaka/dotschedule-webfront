export const OLD_YEAR = 2017;

export const MESSAGE_FORM_URL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=ThwL2RuzK0KlbUGjoK6habx0cw6yroJPt2erS48Y7LVUMlJHOVU4MlhYSU5QSlg1UUtYUU9YSFpKRy4u';

export const DISCORD_LINK = 'https://discord.gg/XnTkSSwpJg';

const dateFromTo = (): {year: number, month: number}[] => {
  const n = new Date();
  n.setHours(n.getHours() + 6);
  const start = n.getFullYear() * 12 + n.getMonth() + 1;
  const endN = new Date(n);
  endN.setMonth(endN.getMonth() - 2);
  const end = endN.getFullYear() * 12 + endN.getMonth() + 1;
  const res: {year: number, month: number}[] = [];
  for(let i = start; i > end; i--) {
    const p = i % 12;
    const month = p === 0 ? 12 : p;
    const year = (i - month) / 12;
    res.push({year: year, month: month});
  }
  return res;
}

export const fromTo = dateFromTo();

interface streamerData {
  name: string,
  youtubeId: string,
  youtubeIcon: string,
  textIcon: string,
  slug: string,
  newsOn: boolean,
}

const streamerDataList = ([
    {
      name: '電脳少女シロ',
      youtubeId: "UCLhUvJ_wO9hOvv_yYENu4fQ",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJyK0q5LrlG2A32OHO0TG1wKacZvh4rsEZat-Q=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🐬',
      slug: 'siro',
      newsOn: true,
    },
    {
      name: '牛巻りこ',
      youtubeId: "UCKUcnaLsG2DeQqza8zRXHiA",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJwvY8-LY8X49Rm3SrqFyX55bbTKk57g7SghRQ=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🐄',
      slug: 'ushimakiriko',
      newsOn: false,
    },
    {
      name: '花京院ちえり',
      youtubeId: "UCP9ZgeIJ3Ri9En69R0kJc9Q",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJyS8EZZ9aIBdsaws8YenHv2cIMbHcoRuY7kgw=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🍒',
      slug: 'kakyoinchieri',
      newsOn: true,
    },
    {
      name: '神楽すず',
      youtubeId: "UCUZ5AlC3rTlM-rA2cj5RP6w",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJzp7eOglvxfcowz47Du4gF8cD9YrrZT67pL=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🍋',
      slug: 'kagurasuzu',
      newsOn: true,
    },
    {
      name: 'カルロ・ピノ',
      youtubeId: "UCMzxQ58QL4NNbWghGymtHvw",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJx6upkpJmV-PtumLtQ_sQglTMyH-nXlmXEkxw=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🐜',
      slug: 'carropino',
      newsOn: true,
    },
    {
      name: '木曽あずき',
      youtubeId: "UCmM5LprTu6-mSlIiRNkiXYg",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJzWdE8WTqtLbsQegkXXvJIp7Py2F7uLjA6-vA=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '💻',
      slug: 'kisoazuki',
      newsOn: false,
    },
    {
      name: '北上双葉',
      youtubeId: "UC5nfcGkOAm3JwfPvJvzplHg",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJxdpfXn8BSvolKD0tLq1o5yCeeHbWM0BO3Kyg=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🌱',
      slug: 'kitakamifutaba',
      newsOn: false,
    },
    {
      name: '金剛いろは',
      youtubeId: "UCiGcHHHT3kBB1IGOrv7f3qQ",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJxXKh_yR0FapZ2zf46leNVlZvbZ65iMdH_QMw=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '💎',
      slug: 'kongoiroha',
      newsOn: false,
    },
    {
      name: '猫乃木もち',
      youtubeId: "UC02LBsjt_Ehe7k0CuiNC6RQ",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJzMt3QsxfrPkyaKl034DePiwQX1w2Iy3_sDtw=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🐈',
      slug: 'nekonokimochi',
      newsOn: false,
    },
    {
      name: 'もこ田めめめ',
      youtubeId: "UCz6Gi81kE6p5cdW1rT0ixqw",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJx624rrk9O96s-dxFB7PGAJd_UFYe-jBnAkvQ=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🐏',
      slug: 'mokotamememe',
      newsOn: true,
    },
    {
      name: '八重沢なとり',
      youtubeId: "UC1519-d1jzGiL1MPTxEdtSA",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJxbuuaJ0hPNZtD2iAEtX5cd-bWfInpC5WQwXQ=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🌾',
      slug: 'yaezawanatori',
      newsOn: false,
    },
    {
      name: 'ヤマトイオリ',
      youtubeId: "UCyb-cllCkMREr9de-hoiDrg",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJyf3YAfLbYeLzronpKJKmK7yN0_0jsbWp3hLw=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🍄',
      slug: 'yamatoiori',
      newsOn: true,
    },
    {
      name: '夜桜たま',
      youtubeId: "UCOefINa2_BmpuX4BbHjdk9A",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJyXYhaMAat_6Dm9P_HxYpekuW8cgSboaB79Gg=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🌸',
      slug: 'yozakuratama',
      newsOn: false,
    },
    {
      name: 'メリーミルク',
      youtubeId: 'UCju7v8SkoWUQ5ITCQwmYpYg',
      youtubeIcon: 'https://yt3.ggpht.com/a/AATXAJwJMWEexhi3zWVa62bfTm5MnX81YnA_NcKO4g=s100-c-k-c0xffffffff-no-rj-mo',
      textIcon: '🐑',
      slug: 'merrymilk',
      newsOn: true,
    },
    {
      name: 'ばあちゃる',
      youtubeId: "UC6TyfKcsrPwBsBnx2QobVLQ",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJyf3Jayo9gmMXmfbcmdZ8TvfWXfuLaf7xuz1A=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '🐴',
      slug: 'baatual',
      newsOn: true,
    },
    {
      name: 'どっとらいぶ',
      youtubeId: "UCAZ_LA7f0sjuZ1Ni8L2uITw",
      youtubeIcon: "https://yt3.ggpht.com/a/AATXAJx0feTqFDgJte485tbjo5gKs9-ITFxU4nHJ5Q=s100-c-k-c0xffffffff-no-rj-mo",
      textIcon: '公',
      slug: 'dotlive',
      newsOn: true,
    },
    {
      name: 'リクム',
      youtubeId: "UCtM5G3bS7zM8bv6p-OwoNTw",
      youtubeIcon: "https://yt3.ggpht.com/ytc/AAUvwng-OjoeMh5P7QUT68KKMJRTQNB_th2OuFVa0BI4=s176-c-k-c0x00ffffff-no-rj",
      textIcon: 'リ',
      slug: 'rikumu',
      newsOn: true,
    },
    {
      name: 'ルルン・ルルリカ',
      youtubeId: 'UCcd4MSYH7bPIBEUqmBgSZQw',
      youtubeIcon: 'https://yt3.ggpht.com/ytc/AAUvwnhXHiUDc14_AVxCvtr85UcJ2ZuwndAOW26MvegO=s176-c-k-c0x00ffffff-no-rj',
      textIcon: 'ル',
      slug: 'rurunrururica',
      newsOn: true,
    },
    {
      name: '七星みりり',
      youtubeId: 'UCSlcMof1GIPvH6H_VcknCbQ',
      youtubeIcon: 'https://yt3.ggpht.com/ytc/AAUvwnhZEMCfyNQiEDAso-BTTRQagWM2r4vNTbpwcpVm=s176-c-k-c0x00ffffff-no-rj',
      textIcon: 'ミ',
      slug: 'nanahoshimilily',
      newsOn: true,
    }
  ]);

const getStreamerDataMap = () => {
  const map: {[key: string]: streamerData} = {};
  for (const data of streamerDataList) {
    map[data.youtubeId] = data;
  }
  return map;
}

export const getNewsStreamerList = () => {
  return streamerDataList.filter(x => x.newsOn).map(x => ({
    name: x.name,
    slug: x.slug,
    id: x.youtubeId
  }))
}

export const streamerDataMap = getStreamerDataMap();

import React from "react"

import { getJTCNow, dateToIDate } from 'library/DateFunctions';
import StreamingSearchMenu, { SearchMember } from 'components/field/StreamingSearchMenu'

const json = {
    "MemberList": [
        {
            "Name": "電脳少女シロ",
            "ID": "siro",
            "Icon": "https://yt3.ggpht.com/a/AATXAJyK0q5LrlG2A32OHO0TG1wKacZvh4rsEZat-Q=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "ばあちゃる",
            "ID": "baatual",
            "Icon": "https://yt3.ggpht.com/a/AATXAJyf3Jayo9gmMXmfbcmdZ8TvfWXfuLaf7xuz1A=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "カルロ・ピノ",
            "ID": "carropino",
            "Icon": "https://yt3.ggpht.com/a/AATXAJx6upkpJmV-PtumLtQ_sQglTMyH-nXlmXEkxw=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "神楽すず",
            "ID": "kagurasuzu",
            "Icon": "https://yt3.ggpht.com/a/AATXAJzp7eOglvxfcowz47Du4gF8cD9YrrZT67pL=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "花京院ちえり",
            "ID": "kakyoinchieri",
            "Icon": "https://yt3.ggpht.com/a/AATXAJyS8EZZ9aIBdsaws8YenHv2cIMbHcoRuY7kgw=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "木曽あずき",
            "ID": "kisoazuki",
            "Icon": "https://yt3.ggpht.com/a/AATXAJzWdE8WTqtLbsQegkXXvJIp7Py2F7uLjA6-vA=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 0
        },
        {
            "Name": "北上双葉",
            "ID": "kitakamifutaba",
            "Icon": "https://yt3.ggpht.com/a/AATXAJxdpfXn8BSvolKD0tLq1o5yCeeHbWM0BO3Kyg=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 0
        },
        {
            "Name": "金剛いろは",
            "ID": "kongoiroha",
            "Icon": "https://yt3.ggpht.com/a/AATXAJxXKh_yR0FapZ2zf46leNVlZvbZ65iMdH_QMw=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 0
        },
        {
            "Name": "もこ田めめめ",
            "ID": "mokotamememe",
            "Icon": "https://yt3.ggpht.com/a/AATXAJx624rrk9O96s-dxFB7PGAJd_UFYe-jBnAkvQ=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "猫乃木もち",
            "ID": "nekonokimochi",
            "Icon": "https://yt3.ggpht.com/a/AATXAJzMt3QsxfrPkyaKl034DePiwQX1w2Iy3_sDtw=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 0
        },
        {
            "Name": "牛巻りこ",
            "ID": "ushimakiriko",
            "Icon": "https://yt3.ggpht.com/a/AATXAJwvY8-LY8X49Rm3SrqFyX55bbTKk57g7SghRQ=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 0
        },
        {
            "Name": "八重沢なとり",
            "ID": "yaezawanatori",
            "Icon": "https://yt3.ggpht.com/a/AATXAJxbuuaJ0hPNZtD2iAEtX5cd-bWfInpC5WQwXQ=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 0
        },
        {
            "Name": "ヤマトイオリ",
            "ID": "yamatoiori",
            "Icon": "https://yt3.ggpht.com/a/AATXAJyf3YAfLbYeLzronpKJKmK7yN0_0jsbWp3hLw=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "夜桜たま",
            "ID": "yozakuratama",
            "Icon": "https://yt3.ggpht.com/a/AATXAJyXYhaMAat_6Dm9P_HxYpekuW8cgSboaB79Gg=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 0
        },
        {
            "Name": "メリーミルク",
            "ID": "merrymilk",
            "Icon": "https://yt3.ggpht.com/a/AATXAJwJMWEexhi3zWVa62bfTm5MnX81YnA_NcKO4g=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        },
        {
            "Name": "七星みりり",
            "ID": "nanahoshimilily",
            "Icon": "https://yt3.ggpht.com/ytc/AAUvwnhZEMCfyNQiEDAso-BTTRQagWM2r4vNTbpwcpVm=s176-c-k-c0x00ffffff-no-rj",
            "Enrollment": 1
        },
        {
            "Name": "リクム",
            "ID": "rikumu",
            "Icon": "https://yt3.ggpht.com/ytc/AAUvwng-OjoeMh5P7QUT68KKMJRTQNB_th2OuFVa0BI4=s176-c-k-c0x00ffffff-no-rj",
            "Enrollment": 1
        },
        {
            "Name": "ルルン・ルルリカ",
            "ID": "rurunrururica",
            "Icon": "https://yt3.ggpht.com/ytc/AAUvwnhXHiUDc14_AVxCvtr85UcJ2ZuwndAOW26MvegO=s176-c-k-c0x00ffffff-no-rj",
            "Enrollment": 1
        },
        {
            "Name": "どっとらいぶ公式チャンネル",
            "ID": "dotlive_official",
            "Icon": "https://yt3.ggpht.com/a/AATXAJx0feTqFDgJte485tbjo5gKs9-ITFxU4nHJ5Q=s100-c-k-c0xffffffff-no-rj-mo",
            "Enrollment": 1
        }
    ]
}

const FetchStreamingSearchMenuValues = async () => {
    const rangeStart = dateToIDate(new Date("2017-01-01T00:00:00Z"));
    const rangeEndDate = getJTCNow();
    rangeEndDate.setMonth(rangeEndDate.getMonth() + 1);
    const rangeEnd = dateToIDate(rangeEndDate);

    const apiResponse = json;

    const memberList: SearchMember[] = apiResponse.MemberList.map(x => {
        return {
            isSelect: false,
            ...x
        }
    })

    return {
        memberList,
        rangeStart,
        rangeEnd,
    };
}

const Page = async () => {
    const menuValues = await FetchStreamingSearchMenuValues()

    return (
        <React.Fragment>
            <StreamingSearchMenu {...menuValues} memberList={menuValues.memberList} />
        </React.Fragment>
    )
}

export default Page;
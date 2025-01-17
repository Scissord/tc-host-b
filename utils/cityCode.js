export const getCityCode = (city) => {
    const сity_codes = {
        'AKSAI': '1',
        'AKTAU': '2',
        'AKTOBE': '3',
        'ALMATA': '4',
        'ASTANA-KURER': '5',
        'ATYRAU': '6',
        'EKIBASTUZ': '9',
        'KARAGANDA': '10',
        'KOKSHETAU': '11',
        'KOSTANAI': '12',
        'KYLSARY': '13',
        'KYZYLORDA': '14',
        'PAVLODAR': '15',
        'PETROPAVLOVSK': '16',
        'Saryagash': '19',
        'SATPAEV': '20',
        'SEMEI': '21',
        'SHIMKENT': '22',
        'TALDYKORGAN': '23',
        'TARAZ': '24',
        'TEMIRTAU': '25',
        'TURKESTAN': '26',
        'URALSK': '27',
        'UST-KAMENOGORSK': '28',
        'ZHANAOZEN': '29',
        'Zhetysai': '30',
        'ZHEZKAZGAN': '31',
        'Balkhash': '91',
        'Kentau': '93',
    }

    return сity_codes[city] || undefined;
}



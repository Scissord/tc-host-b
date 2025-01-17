export function getOrderName(goodID, quantity) {

    console.log('')
    const goodsCodes = {
        200500: "Prostrong",
        200503: "Be_clean",
        212258: "Articuline",
        200505: "Cardio_Sei",
        200502: "Femiston",
        200501: "Eropower",
        212257: "ManBalance",
        200504: "Cardio_Sei_VARIKOZ",
        212256: "Flex_balance",
        212255: "Body_balance",
        212251: "LibidoFortis",
        212253: "AlcoBalance",
        212254: "EroKing"
    };

    if (goodsCodes[goodID]) {
        const goodName = goodsCodes[goodID];
        const quantitys = quantity
        return `${goodName} - ${quantitys}`;
    } else {
        return null;
    }
};

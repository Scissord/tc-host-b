export function getOrderName (goodID, quantity) {

    console.log('')
    const goodsCodes = {
        200500: "Prostrong",
        200503: "Be_clean",
        192114: "Articuline",
        200505: "Cardio_Sei",
        200502: "Femiston",
        200501: "Eropower",
        212257: "ManBalance",
        193976: "Cardio_Sei_VARIKOZ",
        212256: "Flex_balance",
        204116: "Body_balance",
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

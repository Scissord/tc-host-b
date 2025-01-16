export const getOrderName = (goodID, quantity) => {
    const goodsCodes = {
        198508: "Prostrong",
        196548: "Be_clean",
        192114: "Articuline",
        186491: "Cardio_Sei",
        199030: "Femiston",
        192001: "Eropower",
        202690: "ManBalance",
        193976: "Cardio_Sei_VARIKOZ",
        202914: "Flex_balance",
        204116: "Body_balance",
        204120: "LibidoFortis",
        204118: "AlcoBalance",
        204117: "EroKing"
    };

    if (goodsCodes[goodID]) {
        const goodName = goodsCodes[goodID];
        return `${goodName} - ${quantity}`;
    } else {
        return null;
    }
};

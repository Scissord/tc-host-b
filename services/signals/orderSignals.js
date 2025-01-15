require('dotenv').config();
const axios = require('axios'); 

export const postbackKeitaroSignal = async (utm_term, domain, status) => {
    const params = {
        subid: utm_term,
        payout: 0,
        status: status,
        offer_domain: domain,
        lead_status: 0,
        sale_status: 1,
        rejected_status: 4,
        from: 'api.talkcall-crm.com',
    };

    try {
        const response = await axios.get(process.env.KEITARO_POSTBACK, { params });
    } catch (error) {
        if (error.response) {
            console.error(`Ошибка от сервера: ${error.response.status} ${error.response.statusText}`);
            console.error('Данные ошибки:', error.response.data);
        } else {
            console.error('Ошибка выполнения запроса:', error.message);
        }
    }
};

const header = { size: 14, bold: true };
const body = { size: 12 };

export const makeHeaders = async (sheet) => {
  // make headers
  let cell = {};

  cell = sheet.getCell(`A1`);
  cell.value = `ID`;
  cell.font = header;

  cell = sheet.getCell(`B1`);
  cell.value = `Оператор`;
  cell.font = header;

  cell = sheet.getCell(`C1`);
  cell.value = `Товары`;
  cell.font = header;

  cell = sheet.getCell(`D1`);
  cell.value = `Вебмастер`;
  cell.font = header;

  cell = sheet.getCell(`E1`);
  cell.value = `Домен`;
  cell.font = header;

  cell = sheet.getCell(`F1`);
  cell.value = `Дата`;
  cell.font = header;

  cell = sheet.getCell(`G1`);
  cell.value = `Последнее изменение`;
  cell.font = header;

  cell = sheet.getCell(`H1`);
  cell.value = `Дата апрува`;
  cell.font = header;

  cell = sheet.getCell(`I1`);
  cell.value = `Дата отправки`;
  cell.font = header;

  cell = sheet.getCell(`J1`);
  cell.value = `Дата отмены`;
  cell.font = header;

  cell = sheet.getCell(`K1`);
  cell.value = `Дата выкупа`;
  cell.font = header;

  cell = sheet.getCell(`L1`);
  cell.value = `Дата доставки`;
  cell.font = header;

  cell = sheet.getCell(`M1`);
  cell.value = `Комментарий`;
  cell.font = header;

  cell = sheet.getCell(`N1`);
  cell.value = `Цена`;
  cell.font = header;

  cell = sheet.getCell(`O1`);
  cell.value = `Итого`;
  cell.font = header;

  cell = sheet.getCell(`P1`);
  cell.value = `Время перезвона`;
  cell.font = header;

  cell = sheet.getCell(`Q1`);
  cell.value = `Количество`;
  cell.font = header;

  cell = sheet.getCell(`R1`);
  cell.value = `ФИО`;
  cell.font = header;

  cell = sheet.getCell(`S1`);
  cell.value = `Телефон`;
  cell.font = header;

  cell = sheet.getCell(`T1`);
  cell.value = `Регион`;
  cell.font = header;

  cell = sheet.getCell(`U1`);
  cell.value = `Город`;
  cell.font = header;

  cell = sheet.getCell(`V1`);
  cell.value = `Адрес`;
  cell.font = header;

  cell = sheet.getCell(`W1`);
  cell.value = `Почтовый индекс`;
  cell.font = header;

  cell = sheet.getCell(`X1`);
  cell.value = `Возраст`;
  cell.font = header;

  cell = sheet.getCell(`Y1`);
  cell.value = `utm_term`;
  cell.font = header;

  cell = sheet.getCell(`Z1`);
  cell.value = `Статус`;
  cell.font = header;

  cell = sheet.getCell(`AA1`);
  cell.value = `Пол`;
  cell.font = header;

  cell = sheet.getCell(`AB1`);
  cell.value = `Способ оплаты`;
  cell.font = header;

  cell = sheet.getCell(`AC1`);
  cell.value = `Способ доставки`;
  cell.font = header;

  cell = sheet.getCell(`AD1`);
  cell.value = `Причина отмены`;
  cell.font = header;

  cell = sheet.getCell(`AE1`);
  cell.value = `Затраченное время`;
  cell.font = header;

  cell = sheet.getCell(`AF1`);
  cell.value = `Внешний вебмастер`;
  cell.font = header;

  cell = sheet.getCell(`AG1`);
  cell.value = `Трек код`;
  cell.font = header;

  cell = sheet.getCell(`AH1`);
  cell.value = `Дата возврата`;
  cell.font = header;

  cell = sheet.getCell(`AI1`);
  cell.value = `Pixel`;
  cell.font = header;

  cell = sheet.getCell(`AJ1`);
  cell.value = `Причина возврата`;
  cell.font = header;

  cell = sheet.getCell(`AK1`);
  cell.value = `Язык`;
  cell.font = header;

  cell = sheet.getCell(`AL1`);
  cell.value = `HOLD`;
  cell.font = header;

  cell = sheet.getCell(`AM1`);
  cell.value = `ID дизайнера`;
  cell.font = header;
};

export const makeBodyRow = async (sheet, order, row) => {
  let bodyCell = {}

  bodyCell = sheet.getCell(`A${row}`);
  bodyCell.value = order.id;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`B${row}`);
  bodyCell.value = order.operator;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`C${row}`);
  bodyCell.value = order.items.map(item => item.name).join(', ');
  bodyCell.font = body;

  bodyCell = sheet.getCell(`D${row}`);
  bodyCell.value = order.webmaster;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`E${row}`);
  bodyCell.value = order.additional1;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`F${row}`);
  bodyCell.value = order.created_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`G${row}`);
  bodyCell.value = order.updated_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`H${row}`);
  bodyCell.value = order.approved_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`I${row}`);
  bodyCell.value = order.shipped_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`J${row}`);
  bodyCell.value = order.cancelled_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`K${row}`);
  bodyCell.value = order.buyout_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`L${row}`);
  bodyCell.value = order.delivery_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`M${row}`);
  bodyCell.value = order.comment;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`N${row}`);
  bodyCell.value = 1650;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`O${row}`);
  bodyCell.value = order.total_sum;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`P${row}`);
  bodyCell.value = order.logist_recall_at;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`Q${row}`);
  bodyCell.value = Array.isArray(order.items) && order.items.length > 0 ? order?.items?.reduce((acc, item) => acc + item.quantity, 0) : 1;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`R${row}`);
  bodyCell.value = order.fio;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`S${row}`);
  bodyCell.value = '***';
  bodyCell.font = body;

  bodyCell = sheet.getCell(`T${row}`);
  bodyCell.value = order.region;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`U${row}`);
  bodyCell.value = order?.city?.name;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`V${row}`);
  bodyCell.value = order.address;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`W${row}`);
  bodyCell.value = order.postal_code;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`X${row}`);
  bodyCell.value = order.age;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`Y${row}`);
  bodyCell.value = order.utm_term;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`Z${row}`);
  bodyCell.value = order.status.name;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AA${row}`);
  bodyCell.value = order.gender;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AB${row}`);
  bodyCell.value = order.payment_method;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AC${row}`);
  bodyCell.value = order.delivery_method;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AD${row}`);
  bodyCell.value = order.order_cancel_reason;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AE${row}`);
  bodyCell.value = order.additional2;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AF${row}`);
  bodyCell.value = order.additional3;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AG${row}`);
  bodyCell.value = order.additional4;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AH${row}`);
  bodyCell.value = order.additional5;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AI${row}`);
  bodyCell.value = order.additional6;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AJ${row}`);
  bodyCell.value = order.additional7;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AK${row}`);
  bodyCell.value = order.additional8;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AL${row}`);
  bodyCell.value = order.additional9;
  bodyCell.font = body;

  bodyCell = sheet.getCell(`AM${row}`);
  bodyCell.value = order.additional10;
  bodyCell.font = body;
};

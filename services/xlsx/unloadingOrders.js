import ExcelJS from 'exceljs';
import * as Order from '#models/order.js';
import { mapOrders } from '#services/order/map.js';
import { makeHeaders, makeBodyRow } from './helpers.js';

export async function unloadingIdsOrders(from, to, ids) {
  const ordersFromDb = await Order.getWhereIn('o.id', ids);
  const orders = await mapOrders(ordersFromDb, false);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(from);

  const sheet = workbook.getWorksheet(1)

  await makeHeaders(sheet);

  let row = 2;
  for (const order of orders) {
    await makeBodyRow(sheet, order, row);
    row++;
  };

  await workbook.xlsx.writeFile(to);
};

export async function unloadingFilteredOrders(from, to, data) {
  const {
    id,
    operator: operators,
    products,
    webmaster: webmasters,
    additional1,
    created_at,
    updated_at,
    approved_at,
    shipped_at,
    cancelled_at,
    buyout_at,
    delivery_at,
    comment,
    price,
    total_sum,
    logist_recall_at,
    quantity,
    fio,
    phone,
    region,
    city: cities,
    address,
    postal_code,
    age,
    urm_term,
    status: statuses,
    gender,
    payment_method: payment_methods,
    delivery_method: delivery_methods,
    order_cancel_reason: order_cancel_reasons,
    additional2,
    additional3,
    additional4,
    additional5,
    additional6,
    additional7,
    additional8,
    additional9,
    additional10,
  } = data;

  const ordersFromDb = await Order.getUnloadingOrders(
    id,
    operators,
    products,
    webmasters,
    additional1,
    created_at,
    updated_at,
    approved_at,
    shipped_at,
    cancelled_at,
    buyout_at,
    delivery_at,
    comment,
    price,
    total_sum,
    logist_recall_at,
    quantity,
    fio,
    phone,
    region,
    cities,
    address,
    postal_code,
    age,
    urm_term,
    statuses,
    gender,
    payment_methods,
    delivery_methods,
    order_cancel_reasons,
    additional2,
    additional3,
    additional4,
    additional5,
    additional6,
    additional7,
    additional8,
    additional9,
    additional10
  );
  const orders = await mapOrders(ordersFromDb, false);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(from);

  const sheet = workbook.getWorksheet(1)

  await makeHeaders(sheet);

  let row = 2;
  for (const order of orders) {
    await makeBodyRow(sheet, order, row);
    row++;
  };

  await workbook.xlsx.writeFile(to);
};

export async function unloadingSubStatusOrders(from, to, sub_status) {
  const ordersFromDb = await Order.getWhere({ sub_status_id: sub_status });
  const orders = await mapOrders(ordersFromDb, false);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(from);

  const sheet = workbook.getWorksheet(1)

  await makeHeaders(sheet);

  let row = 2;
  for (const order of orders) {
    await makeBodyRow(sheet, order, row);
    row++;
  };

  await workbook.xlsx.writeFile(to);
};

import express from "express";
import * as controller from '#controllers/dialerController.js';
import checkDialer from "#middleware/checkDialer.js";

const router = express.Router();

// Получение списка статусов и подстатусов
// http://localhost:8080/api/dialer/get_status_list?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_status_list?token=""
router.get("/get_status_list", checkDialer, controller.getStatusList);

// Получение списка вебмастеров
// http://localhost:8080/api/dialer/get_webmasters?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_webmasters?token=""
router.get("/get_webmasters", checkDialer, controller.getWebmasters);

// Получение товаров
// http://localhost:8080/api/dialer/get_offer_goods?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_offer_goods?token=""
router.get("/get_offer_goods", checkDialer, controller.getOfferGoods);

// Получение городов
// http://localhost:8080/api/dialer/get_cities?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_cities?token=""
router.get("/get_cities", checkDialer, controller.getCities);

// Получение способов оплаты
// http://localhost:8080/api/dialer/get_payment_methods?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_payment_methods?token=""
router.get("/get_payment_methods", checkDialer, controller.getPaymentMethods);

// Получение способов доставки
// http://localhost:8080/api/dialer/get_delivery_methods?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_delivery_methods?token=""
router.get("/get_delivery_methods", checkDialer, controller.getDeliveryMethods);

// Получение способов доставки
// http://localhost:8080/api/dialer/get_genders?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_genders?token=""
router.get("/get_genders", checkDialer, controller.getGenders);

// Получение списка пользователей
// http://localhost:8080/api/dialer/get_operators?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_operators?token=""
router.get("/get_operators", checkDialer, controller.getOperators);

// Получение причин отказов
// http://localhost:8080/api/dialer/get_order_cancel_reasons?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_order_cancel_reasons?token=""
router.get("/get_order_cancel_reasons", checkDialer, controller.getOrderCancelReasons);

// Обновление заказа
// http://localhost:8080/api/dialer/update_order?token=90f42555-0c00-4c54-b70e-2da4385683a4&id=10001
// https://api.talkcall-crm.com/api/dialer/update_order?token=""&id=""
router.patch("/update_order", checkDialer, controller.updateOrder);

// Обновление заказа
// http://localhost:8080/api/dialer/update_order_item?token=90f42555-0c00-4c54-b70e-2da4385683a4&id=10001
// https://api.talkcall-crm.com/api/dialer/update_order_item?token=""&id=""
router.patch("/change_order_item", checkDialer, controller.changeOrderItem);

// Обновление заказа
// http://localhost:8080/api/dialer/toggle_order?token=90f42555-0c00-4c54-b70e-2da4385683a4&id=10001
// https://api.talkcall-crm.com/api/dialer/toggle_order?token=""&id=""
router.post("/toggle_order", checkDialer, controller.toggleOrder);

// Получение ID всех заказов в подстатусе
// http://localhost:8080/api/dialer/get_order_ids_in_sub_status?token=90f42555-0c00-4c54-b70e-2da4385683a4&status=2
// https://api.talkcall-crm.com/api/dialer/get_order_ids_in_sub_status?token=""&status=""
router.get("/get_order_ids_in_sub_status", checkDialer, controller.getOrderIdsInSubStatus);

// Получение информации о заказах, через ids 
// http://localhost:8080/api/dialer/get_orders_by_ids?token=90f42555-0c00-4c54-b70e-2da4385683a4&ids=10001,10002,10003
https://api.talkcall-crm.com/api/dialer/get_orders_by_ids?token=""&ids=""
router.get("/get_orders_by_ids", checkDialer, controller.getOrdersByIds);

router.get("/operator_statistic", checkDialer, controller.getOperatorStatistic);
export default router;

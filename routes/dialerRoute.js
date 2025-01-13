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
// http://localhost:8080/api/dialer/get_payments?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_payments?token=""
router.get("/get_payments", checkDialer, controller.getPayments);

// Получение способов доставки
// http://localhost:8080/api/dialer/get_deliveries?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_deliveries?token=""
router.get("/get_deliveries", checkDialer, controller.getDeliveries);

// Получение способов доставки
// http://localhost:8080/api/dialer/get_genders?token=90f42555-0c00-4c54-b70e-2da4385683a4
// https://api.talkcall-crm.com/api/dialer/get_genders?token=""
router.get("/get_genders", checkDialer, controller.getGenders);

// Обновление заказа
// http://localhost:8080/api/dialer/update_order?token=90f42555-0c00-4c54-b70e-2da4385683a4&id=10001
// https://api.talkcall-crm.com/api/dialer/update_order?token=""&id=""
router.patch("/update_order", checkDialer, controller.updateOrder);

// Получение ID всех заказов в подстатусе
// http://localhost:8080/api/dialer/get_order_ids_in_sub_status?token=90f42555-0c00-4c54-b70e-2da4385683a4&status=2
// https://api.talkcall-crm.com/api/dialer/get_order_ids_in_sub_status?token=""&status=""
router.get("/get_order_ids_in_sub_status", checkDialer, controller.getOrderIdsInSubStatus);

// Получение информации о заказах, через ids 
// http://localhost:8080/api/dialer/get_orders_by_ids?token=90f42555-0c00-4c54-b70e-2da4385683a4&ids=10001,10002,10003
https://api.talkcall-crm.com/api/dialer/get_orders_by_ids?token=""&ids=""
router.get("/get_orders_by_ids", checkDialer, controller.getOrdersByIds);

export default router;

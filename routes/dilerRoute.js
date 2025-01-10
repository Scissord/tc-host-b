import express from "express";
import * as controller from '#controllers/dilerController.js';
import checkDiler from "#middleware/checkDiler.js";

const router = express.Router();

// Получение списка статусов и подстатусов
http://localhost:8080/api/diler/get_status_list?token=90f42555-0c00-4c54-b70e-2da4385683a4
router.get("/get_status_list", checkDiler, controller.getStatusList);

// Получение списка вебмастеров
http://localhost:8080/api/diler/get_webmasters?token=90f42555-0c00-4c54-b70e-2da4385683a4
router.get("/get_webmasters", checkDiler, controller.getWebmasters);

// Обновление заказа
http://localhost:8080/api/diler/update_order?token=90f42555-0c00-4c54-b70e-2da4385683a4&id=10001
router.patch("/update_order", checkDiler, controller.updateOrder);

// Получение ID всех заказов в подстатусе
// http://localhost:8080/api/diler/get_order_ids_in_sub_status?token=90f42555-0c00-4c54-b70e-2da4385683a4&status=2
router.get("/get_order_ids_in_sub_status", checkDiler, controller.getOrderIdsInSubStatus);

// Получение информации о заказах, через ids 
// http://localhost:8080/api/diler/get_orders_by_ids?token=90f42555-0c00-4c54-b70e-2da4385683a4&ids=10001,10002,10003
router.get("/get_orders_by_ids", checkDiler, controller.getOrdersByIds);

export default router;

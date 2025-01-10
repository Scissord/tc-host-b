import express from "express";
import * as controller from '#controllers/orderController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";
import checkEntity from "#middleware/checkEntity.js";

const router = express.Router();

// Получить все заказы для пользователя
router.get("/user", withExtraData({ ability_name: 'get_orders' }, checkAbility), controller.getUserOrders);

// Получить заказы вебмастера
router.get("/webmaster", withExtraData({ entity: 'webmaster' }, checkEntity), controller.getWebmasterOrders);

// Получить заказы для оператора -> команда(статусы)
router.get("/operator", withExtraData({ entity: 'operator' }, checkEntity), controller.getOperatorOrders);

// Зайти в заказ
router.get("/:order_id", withExtraData({ ability_name: 'get_order_orders' }, checkAbility), controller.getOrder);

// Создать заказ
router.post("", controller.create);

// Обновить заказ
router.patch("/:order_id", controller.update);

// Перетащить заказ
router.patch("/status/update", controller.changeStatus);

export default router;

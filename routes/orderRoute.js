import express from "express";
import * as controller from '#controllers/orderController.js';
import verify from '#root/middleware/verify.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";
import checkEntity from "#middleware/checkEntity.js";

const router = express.Router();

// Получить все заказы для пользователя
router.post("/user", verify, withExtraData({ ability_name: 'get_orders' }, checkAbility), controller.getUserOrders);

// Получить заказы вебмастера
router.get("/webmaster", verify, withExtraData({ entity: 'webmaster' }, checkEntity), controller.getWebmasterOrders);

// Получить заказы для оператора -> команда(статусы)
router.post("/operator", verify, withExtraData({ entity: 'operator' }, checkEntity), controller.getOperatorOrders);

// Зайти в заказ
router.get("/:order_id", verify, controller.getOrder);

// Создать заказ
router.post("", controller.create);

// Обновить заказ
router.patch("/:order_id", verify, controller.update);

// Перетащить заказ
router.patch("/status/update", verify, controller.changeStatus);

// Выгрузка заказов
router.post("/unloading", verify, controller.unloading);

// Синхронизация со старыми заказами
// router.get("/sync/leadvertex", controller.sync);

export default router;

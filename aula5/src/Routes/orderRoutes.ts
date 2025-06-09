import { Router } from "express";
import { OrderController } from "../Controller/orderController";

const router:Router = Router();
const controller = new OrderController();

router.get('/order', controller.list);
router.get('/order/:id', controller.show);
router.post('/order', controller.create);
router.put('/order/:id', controller.update);
router.delete('/order/:id', controller.delete);

export default router;
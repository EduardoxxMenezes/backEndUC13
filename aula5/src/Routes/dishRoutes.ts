import { Router } from "express";
import { DishController } from "../Controller/dishController";

const router:Router = Router();
const controller = new DishController();

router.get('/dish', controller.list);
router.get('/dish/:id', controller.show);
router.post('/dish', controller.create);
router.put('/dish/:id', controller.update);
router.delete('/dish/:id', controller.delete);

export default router;
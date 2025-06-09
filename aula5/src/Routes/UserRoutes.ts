import { Router } from "express";
import { UserController } from "../Controller/UserController";

const router:Router = Router();
const controller = new UserController();

router.get('/user', controller.list);
router.get('/user/:id', controller.show);
router.post('/user', controller.create);
router.put('/user/:id', controller.update);
router.delete('/user/:id', controller.delete);

export default router;
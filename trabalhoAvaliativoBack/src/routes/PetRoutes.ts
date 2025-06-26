
import { Router } from "express";
import { petController } from "../controller/petController";

const router: Router = Router();
const controller = new petController()

router.post('/pets', controller.addPet);
router.get('/pets/:id', controller.getById);
router.get('/pets', controller.getAll);
router.put('/pets/:id', controller.update);
router.delete('/pets/:id', controller.delete);

export default router;
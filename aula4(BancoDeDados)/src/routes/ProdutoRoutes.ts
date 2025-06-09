import { Router } from "express";
import { ProductController } from "../controller/productController";

const router:Router = Router();
const controller = new ProductController();

router.get('/products', controller.list);
router.get('/products/:id', controller.show);
router.post('/products', controller.create);
router.put('/products/:id', controller.update);
router.delete('products/:id', controller.delete);

export default router;
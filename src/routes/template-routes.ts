import { Router } from "express";
import { TemplateController } from "../controllers/template-controller";
import { TemplateValidator } from "../middleware/template-validator";

const router = Router();

router.get(
    "/template/:id",
    TemplateController.getTemplate
);

router.get(
    "/template/all",
    TemplateController.getTemplates
);

router.post(
    "/template",
    TemplateValidator.checkTemplateData,
    TemplateController.createTemplate
);

router.delete(
    "/template/:id",
    TemplateController.removeTemplate
);


module.exports = router;
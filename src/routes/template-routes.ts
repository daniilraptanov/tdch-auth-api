import { Router } from "express";
import { TemplateController } from "../controllers/template-controller";
import { RoleMiddleware } from "../middleware/role-middleware";
import { TemplateValidator } from "../middleware/validators/template-validator";

const router = Router();

router.get(
    "/template/publics",
    TemplateController.getPublicTemplates
);

router.get(
    "/template/:id",
    RoleMiddleware.checkTemplateRole,
    TemplateController.getTemplate
);

router.post(
    "/template",
    TemplateValidator.checkTemplateData,
    TemplateController.createTemplate
);

router.delete(
    "/template/:id",
    RoleMiddleware.checkTemplateRole,
    TemplateController.removeTemplate
);

router.post(
    "/template/:id/add",
    RoleMiddleware.checkPublicTemplate,
    TemplateController.addTemplateToCurrentUser
);

router.delete(
    "/template/:id/remove",
    RoleMiddleware.checkPublicTemplate,
    TemplateController.removeTemplateFromCurrentUser
);


module.exports = router;
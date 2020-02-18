import express from "express";
import TodoController from "./controllers/todoController";

const router = express.Router();

router.get("/todo", TodoController.getAll);
router.post("/todo", TodoController.create);
router.get("/todo/:id", TodoController.view);
router.get("/todo/category/:status", TodoController.findByStatus);
router.patch("/todo/update/status/selected", TodoController.updateStatusSelected);
router.patch("/todo/update/status/:id", TodoController.changeStatus);

module.exports = router;

let Todo = require("../models/todo.model");

export default class TodoController {
  static async view(req, res) {
    try {
      let todo = await Todo.findById(req.params.id);
      res.json(todo);
    } catch (e) {
      res.status(400).json({
        error: true,
        msg: e
      });
    }
  }

  static async create(req, res) {
    let { task } = req.body;

    let todo = new Todo();
    todo.task = task;
    todo.status = "active";

    try {
      todo = await todo.save();
      res.json(await TodoController.findAll());
    } catch (e) {
      res.status(400).json({
        error: true,
        msg: e
      });
    }
  }

  static async getAll(req, res){
      let todos = await TodoController.findAll();
      res.json(todos);
  }

  static async findAll() {
    try {
      return await Todo.find().sort("-createdAt");
    } catch (e) {
      console.log(e);
    }
  }

  static async findByStatus(req, res) {
    let { status } = req.params;

    try {
      let todo = await Todo.find({ status }).sort("-createdAt");
      res.json(todo);
    } catch (e) {
      res.status(400).json({
        error: true,
        msg: e
      });
    }
  }

  static async updateStatus(id, status) {
    try {
      let todo = await Todo.findById(id);
      todo.status = status;

      return await todo.save(todo);
    } catch (e) {
      console.log(e);
    }
  }

  static async changeStatus(req, res) {
    let { status } = req.body;
    await TodoController.updateStatus(req.params.id, status);
    return res.json(await TodoController.findAll());
  }

  static async updateStatusSelected(req, res) {
    let { ids, status } = req.body;
    const promises = [];
    let todos = [];

    ids.forEach(async id => {
      if (id.checked) {
        promises.push(TodoController.updateStatus(id.value, status));
      }
    });

    await Promise.all(promises).then(value => {
      todos = value;
    });

    res.json(await TodoController.findAll());
  }
}

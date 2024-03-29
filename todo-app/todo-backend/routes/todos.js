const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { incrAsync, setAsync } = require('../redis/index.js')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);

  await incrAsync('added_todos')
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  res.send(todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo;
  const { text, done } = req.body; // Extract text and done from request body

  // Update the fields that are provided in the request body
  if (text !== undefined) {
    todo.text = text;
  }
  if (done !== undefined) {
    todo.done = done;
  }

  // Save the updated todo
  const updatedTodo = await todo.save();

  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

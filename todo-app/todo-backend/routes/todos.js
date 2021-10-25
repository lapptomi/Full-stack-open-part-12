const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

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

  const todoCount = await redis.getAsync('todoCount');
  await redis.setAsync('todoCount', Number(todoCount) + 1);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  if (id.length != 24) {
    console.log('Invalid ID:', id);
    return res.status(400);
  }

  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo).status(200);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body;

  await Todo.findByIdAndUpdate(req.todo.id,
    { text: body.text, done: body.done },
    { new: true },
    function(error, result) {
      if (error) {
        res.send(error).status(400);
      } else {
        res.send(result).status(204);
      }
    }
  );
});


router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

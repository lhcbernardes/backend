const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../model/posts');
const Points = require('../model/point');

//lista de posts
router.get('/', verify, async (req, res) => {
  try {
    const post = await Post.find();

   return res.send({post});
  } catch (err) {
    return res.status(400).send({error: 'Erro to load posts'})
  }
});

//lista de pontos
router.get('/', verify, async (req, res) => {
  try {
    const point = await Points.find();

   return res.send({point});
  } catch (err) {
    return res.status(400).send({error: 'Erro to load points'})
  }
});

//post especifico
router.get('/:postId', verify, (req, res) => {
  res.send({user: req.user});
});

//enviar post
router.post('/', verify, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.send({post})
  } catch (error) {
    return res.status(400).send({ error: 'Erro at create new post'})
  }
});

//enviar point
router.post('/', verify, async (req, res) => {
  try {
    const point = await Points.create(req. body);
    return res.send({point})
  } catch (error) {
    return res.status(400).send({ error: 'Erro at create new point'})
  }
});

router.put('/:postId', verify, (req, res) => {
  res.send({user: req.user});
});

router.delete('/:postId', verify, async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.postId).populate('user');
    return res.send({project});

  } catch (error) {
    return res.status(400).send({error: 'Error to delete item'});
  }
});

module.exports = router;
const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');

// Cadastro
router.post('/register', async (req, res) => {

  //validação
  // const { error } = registerValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

//verifica se email existe
  const emailExist = await User.findOne({ email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exist');

  //senha criptografada
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post('/login', async (req, res) =>{
  // Validação
  // const { error } = loginValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //verifica se email NÃO existe
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email not found');
  
  // senha esta correta
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');

  //Criar e logar com token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({token: token, user: user._id});
});

module.exports = router;

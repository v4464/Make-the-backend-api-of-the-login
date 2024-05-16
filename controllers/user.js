const User = require('../models/user');

exports.signupUser = async (req, res, next) => {
  const { name, mail, password } = req.body;
  if (name === '' || mail === '' || password === '') {
    return res.status(400).json({ error: 'Enter required details' });
  }
  try {
    await User.create(req.body);
    res.status(200).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'User already exists' });
  }
};

exports.loginUser = async (req, res, next) => {
  const { mail, password } = req.body;
  if (mail === '' || password === '') {
    return res.status(400).json({ error: 'Enter required details' });
  }
  try {
    const user = await User.findOne({
      where: { mail },
    });
    if (user && user.password === password) {
      return res
        .status(200)
        .send({ success: true, message: 'User logged in successfully' });
    } else res.status(400).send({ success: false, error: 'Invalid password' });
  } catch (error) {
    res.status(404).send({ success: false, error: `User doesn't exist` });
  }
};
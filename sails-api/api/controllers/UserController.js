/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    find: async function (req, res) {
      try {
        const users = await User.find();  
        return res.json(users);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    create: async function (req, res) {
      try {
        const { name, email, age } = req.body;
        const newUser = await User.create({ name, email, age }).fetch();
        return res.json(newUser);
      } catch (error) {
        return res.serverError(error);
      }
    },
  };
  


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
      const { name, email} = req.body;
      const newUser = await User.create({ name, email}).fetch();
      return res.json(newUser);  
    } catch (error) {
      return res.serverError(error);
    }
  },

  destroy: async function (req, res) {
    const userId = req.params.id;  

    try {
      const deletedUser = await User.destroy({ id: userId }).fetch();

      if (deletedUser.length === 0) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      return res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      return res.serverError(error);
    }
  },
};


  


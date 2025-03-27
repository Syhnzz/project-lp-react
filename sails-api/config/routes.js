/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  
    // Route pour créer un Digimon et l'associer à un utilisateur
    'POST /digimon': 'DigimonController.create',
  
    // Route pour récupérer tous les Digimons d'un utilisateur
    'GET /user/:userId/digimons': 'DigimonController.findByUser',
    'GET /user': 'UserController.find',

    'POST /user': 'UserController.create',
    'DELETE /user/:id': 'UserController.destroy', 
  };
  

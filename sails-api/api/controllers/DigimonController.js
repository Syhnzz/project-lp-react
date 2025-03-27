module.exports = {
  create: async function (req, res) {
    try {
      const { digimonId, userId } = req.body; 

      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.notFound('Utilisateur non trouvé');
      }

      const digimonResponse = await fetch(`https://digi-api.com/api/v1/digimon/${digimonId}`);
      
      if (!digimonResponse.ok) {
        return res.serverError(`Erreur API externe: ${digimonResponse.statusText}`);
      }

      const digimonData = await digimonResponse.json();
      console.log(digimonData);  

      if (!digimonData || !digimonData.images || digimonData.images.length === 0) {
        return res.serverError('Digimon non trouvé dans l\'API externe');
      }

      const digimon = digimonData; 
      const digimonImage = digimon.images[0]?.href || ''; 

      const newDigimon = await Digimon.create({
        name: digimon.name,    
        image: digimonImage,   
        user: userId,          
      }).fetch();

      return res.status(201).json(newDigimon); 
    } catch (error) {
      console.error(error);
      return res.serverError(error); 
    }
  },

  findByUser: async function (req, res) {
    try {
      const userId = req.params.userId;

      const user = await User.findOne({ id: userId }).populate('digimons');
      if (!user) {
        return res.notFound('Utilisateur non trouvé');
      }

      return res.json(user.digimons); 
    } catch (error) {
      return res.serverError(error);
    }
  },
};

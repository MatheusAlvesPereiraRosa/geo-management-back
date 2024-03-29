const User = require('../models/user');

const UserController = {
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    getOneUser: async (req, res) => {
        try {
            // Extraindo os parâmetros do corpo da requisição
            const { name, email, phoneNumber } = req.body;

            // Criando uma constante para personalizar a cláusula where
            const whereClause = {};

            if (name) {
                whereClause.name = name;
            }

            if (email) {
                whereClause.email = email;
            }

            if (phoneNumber) {
                whereClause.phoneNumber = phoneNumber;
            }

            // Fazendo a consulta com os dados recebidos
            const user = await User.findAll({
                where: whereClause,
            });
            
            res.json(user)
        } catch (error) {
            console.error(error)
            res.status(500).send("Server Error")
        }
    }
};

module.exports = UserController;
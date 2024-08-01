const User = require('../models/user');

const UserController = {
    createUser: async (req, res) => {

        const { name, email, phoneNumber, coordinates } = req.body;

        if (name === "" || name === undefined) {
            return res.status(400).json({ type: "Error", errBR: "Nome não informado", errEN: "Name not informed"})
        }

        if (email === "" || email === undefined) {
            return res.status(400).json({ type: "Error", errBR:"Email não informado", errEN: "Email not informed"})
        }

        if (phoneNumber === "" || phoneNumber === undefined) {
            return res.status(400).json({ type: "Error", errBR:"Telefone não informado", errEN: "Phone number not informed"})
        }

        if (!coordinates) {
            return res.status(400).json({ type: "Error", errBR:"Não há dados de coordenadas", errEN: "There is no coordinate data"})
        }

        if (coordinates.x === "" || coordinates.x === 0 || coordinates.x === undefined) {
            return res.status(400).json({ type: "Error", errBR:"Coordenada 'X' não informada", errEN: "Coordinate 'X' not informed"})
        }

        if (coordinates.y === "" || coordinates.y === 0 || coordinates.y === undefined) {
            return res.status(400).json({ type: "Error", errBR:"Coordenada 'Y' não informada", errEN: "Coordinate 'Y' not informed"})
        }

        try {
            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                return res.status(400).json({ type: "Error", errBR: "O email já está em uso", errEN: "Email is already in use" });
            }

            const user = await User.create({
                name,
                email,
                phoneNumber,
                coordinatesX: coordinates.x,
                coordinatesY: coordinates.y,
            })

            return res.json({type: "Sucess", msgBR: "Usuário adicionado com sucesso", msgEN: "User added sucessful", user: user});
        } catch (error) {
            return res.status(400).json({ type: "Error", errBR: `Erro: ${error}`, errEN: `Error: ${error}` })
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ type: "Error", errBR: `Erro: ${error}`, errEN: `Error: ${error}` });
        }
    },

    getOneUser: async (req, res) => {
        // Extraindo os parâmetros do corpo da requisição
        const { name, email, phoneNumber } = req.body;

        try {
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

            return res.json(user)
        } catch (error) {
            return res.status(500).json({ type: "Error", errBR: `Erro: ${error}`, errEN: `Error: ${error}` })
        }
    }
};

module.exports = UserController;
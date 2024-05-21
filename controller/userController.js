const { User } = require('../model/userModel');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Lista de usuários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Erro interno do servidor
 */
exports.list = async (req, res) => {

    try {

        const users = await User.findAll();
        return res.json(users);

    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

}

// Definição do modelo de usuário para o Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do usuário
 *     responses:
 *       '200':
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
exports.findId = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Erro interno do servidor
 */
exports.add = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        return res.status(201).json(user);

    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
exports.up = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);
        if (user) {
            const { name, email, password } = req.body;
            await user.update({ name, email, password });
            return res.json(user);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

}

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do usuário
 *     responses:
 *       '204':
 *         description: Usuário excluído com sucesso
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
exports.del = async (req, res) => {

    try {

        const user = await User.findByPk(req.params.id);
        
        if (user) {
            await user.destroy();
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }

}

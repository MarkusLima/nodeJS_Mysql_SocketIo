const { User } = require('../model/userModel');
const { encryptAES } = require('../config/encrypt');

/**
* @swagger
* components:
*   schemas:
*     Auth:
*       type: object
*       required:
*         - email
*         - password
*       properties:
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
 * /users/login:
 *   post:
 *     summary: Loga fornece token para o usuário entrar no chat
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       '200':
 *         description: Ação executada com sucesso
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
exports.login = async (req, res) => {

    try {

        const user = await User.findOne({
            where: {
              email: req.body.email,
              password: req.body.password,
            },
        });

        if (user) {
          res.status(200).json({ hash: encryptAES(user.email), host: process.env.HOST +":"+ process.env.PORT +"/chat/"+ encryptAES(user.email) });
        } else {
          res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }

}
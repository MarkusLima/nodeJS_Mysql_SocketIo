const { User } = require('../model/userModel');
const { Room } = require('../model/roomModel');
const { decryptAES } = require('../config/encrypt');
const { sleep, gerarLetrasAleatorias } = require('../config/tools');
const { CreateOrUpdate } = require('../model/roomModel');
const { passouUmDia } = require('../config/tools');

exports.home = async (req, res) => {

    //Caso o cliente dê um refresh na tela
    //o socket é eliminado, este sleep é o tempo em que é para dar tempo
    //para retirar do banco o registro do socket na tabela Room
    await sleep(3000); // Sleep for 3 seconds

    try {

        // Procura no banco se existe usuário com o email
        const user = await User.findOne({
            where: { token: req.params.hash }
        });
        
        if (user) {

            //verifica se ja se passou um dia após a geração do token
            if ( passouUmDia(user.generated_token)) {
                return res.status(404).json({ error: 'Expired Token' });
            }
            
            //verifica se usuário ja esta dentro do chat
            const isInRoom = await Room.findOne({
                where: { userId: user.id }
            });

            //Se não tiver o usuario, ele cria previamente
            if (!isInRoom) {
                var room = {};
                room.uuid = gerarLetrasAleatorias(25);
                room.userId = user.id;
                await CreateOrUpdate( room )
            }

            //Pega faz um join do usuario e a Room
            const allUserInRoom = await Room.findAll(
                {
                    include: [{
                      model: User,
                      required: true,
                      right: true // has no effect, will create an inner join
                    }]
                }
            );

            return res.render('home', {
                id: user.id,
                name: user.name,
                email: user.email,
                isInRoom: isInRoom ? isInRoom.uuid : null, //se ja tiver dentro do chat
                allUserInRoom: allUserInRoom
            });

        } else {

            return res.status(404).json({ error: 'User not found' });

        }

    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}
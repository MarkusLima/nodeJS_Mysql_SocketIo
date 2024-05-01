const { User } = require('../model/userModel');
const { decryptAES } = require('../config/encrypt');

exports.home = async (req, res) => {

    try {

        var hash = decryptAES(req.params.hash);

        const user = await User.findOne({
            where: {
              email: hash
            },
        });
        
        console.log(clientsInSocket)

        return res.render('home', {
            id: user.id,
            name: user.name,
            email: user.email
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}
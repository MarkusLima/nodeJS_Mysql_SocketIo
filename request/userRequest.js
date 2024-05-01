function addOrUp(req, res, next) {

    if (!req.body.name) {
        return res
            .status(403)
            .send({ error: true, message: 'name is required' })
    }
    if (!req.body.email) {
        return res
            .status(403)
            .send({ error: true, message: 'email is required' })
    }
    if (!req.body.password) {
        return res
            .status(403)
            .send({ error: true, message: 'password is required' })
    }
    next()
}

function login(req, res, next) {

    if (!req.body.email) {
        return res
            .status(403)
            .send({ error: true, message: 'email is required' })
    }
    if (!req.body.password) {
        return res
            .status(403)
            .send({ error: true, message: 'password is required' })
    }
    next()
}

module.exports = { addOrUp, login };
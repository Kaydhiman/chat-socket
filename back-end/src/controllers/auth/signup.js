const User = require('../../models/user');
async function register(req, res) {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (user) {
        return res.throw(406, 'This email already exist.');
    }
    await User.create(req.body);
    return res.status(200).json({ message: 'Account created.' })
}
module.exports = register;
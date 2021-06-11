const {User} = require('../models')

const sessionController =
{
	store: async (req, res) =>
	{
		const {email, password} = req.body

		const user = await User.findOne({where: {email}})
		if (!user)
			return res.status(401).json({message: 'User not found!'})
		
		const isPwdValid = await user.checkPassword(password)
		if (!isPwdValid)
			return res.status(401).json({message: 'Incorrect password!'})

		return res.json(
			{
				user,
				token: user.generateToken()
			})
	}
}

module.exports = sessionController
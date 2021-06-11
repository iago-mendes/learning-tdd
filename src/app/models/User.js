const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) =>
{
	const User = sequelize.define('User',
	{
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.VIRTUAL,
		password_hash: DataTypes.STRING
	},
	{
		hooks:
		{
			beforeSave: async user =>
			{
				if (user.password)
				{
					const hash = await bcrypt.hash(user.password, 8)
					user.password_hash = hash
				}
			}
		}
	})

	User.prototype.checkPassword = function(password)
	{
		return bcrypt.compare(password, this.password_hash)
	}

	return User
}
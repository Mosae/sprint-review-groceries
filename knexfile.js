// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './database/groceries.db3',
		},
	},
	migrations: {
		directory: './database/migrations',
	},
	seeds: {
		directory: './database/seeds',
	},
	// needed when using foreign keys
	pool: {
		afterCreate: (conn, done) => {
			// runs after a connection is made to the sqlite engine
			conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
		},
	},
};

exports.up = function (knex) {
	return (
		knex.schema
			.createTable('store', (tbl) => {
				tbl.string('store_name', 125).unique().notNullable();
				tbl.string('location', 125);
				tbl.boolean('completed').defaultTo(false);
			})
			.createTable('Groceries', (tbl) => {
				tbl.increments();
				tbl.string('grocery_name', 128).notNullable();
				tbl.boolean('completed').default(false);
				//foreign key
				tbl
					.integer('store_id')
					.unsigned() // not negative
					.notNullable()
					.references('id')
					.inTable('store')
					.onDelete('CASCADE') //if you delete the parent, then everything else will be deleted
					.onUpdate('CASCADE');
			})
			.createTable('supplies', (tbl) => {
				tbl.increments();
				tbl.string('supply_name', 128).unique().notNullable();
				tbl.boolean('in_use').defaultTo(false);
			})
			//this is the 3rd connecting table - it has to come last
			.createTable('store_supplies', (tbl) => {
				tbl.increments();
				// foreign key that connects to the store table
				tbl
					.integer('store_id')
					.unsigned()
					.notNullable()
					.references('id')
					.inTable('store')
					.onDelete('CASCADE')
					.onUpdate('CASCADE');
				//foreign key that connects to the supplies table
				tbl
					.integer('supplies_id')
					.unsigned()
					.notNullable()
					.references('id')
					.inTable('supplies') //needs to match the supplies table
					.onDelete('CASCADE')
					.onUpdate('CASCADE');
			})
	);
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('store_supplies')
		.dropTableIfExists('supplies')
		.dropTableIfExists('groceries')
		.dropTableIfExists('store');
};

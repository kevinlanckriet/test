function createTable(db) {
    console.log("tablecreatestart")
    db.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return db.schema.createTable('users', function (t) {
                t.increments('id').primary();
                t.string('first_name', 100);
                t.string('last_name', 100);
                t.text('bio');
            });
        }
    });
}
module.exports = {
    createTable
}
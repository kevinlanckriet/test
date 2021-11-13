function createTable(db) {
    console.log("tablecreatestart")
    db.schema.hasTable('posts').then(function (exists) {
        if (!exists) {
            return db.schema.createTable('posts', function (t) {
                t.increments('id').primary();
                t.integer('userid', 100);
                t.string('mood', 100);
                t.string('weather', 100);
            });
        }
    });
}

function idValidation(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function getData(db) {
   return db('posts');
}

function getPost(db, id) {
    return db('posts').where('id', id).first();
}
module.exports = {
    createTable, getData, idValidation, getPost
}
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

function postValidation(post){
    const hasUserID = !isNaN(post.userid);
    const hasMood = typeof post.mood == 'string' && post.mood.trim() != '';
    const hasWeather = typeof post.weather == 'string' && post.weather.trim() != '';
    return hasUserID && hasMood && hasWeather;
}

function getData(db) {
   return db('posts');
}

function getPost(db, id) {
    return db('posts').where('id', id).first();
}

function updatePost(db, id, post) {
    return db('posts').where('id', id)
        .update({
            mood: post.mood
        })
        .then(function(){
            return db('posts');
        })
}

function deletePost(db, id){
    return db('posts').where('id', id)
    .del()
    .then(function(){
        return db('posts');
    })
}
module.exports = {
    createTable, getData, idValidation, getPost, postValidation, updatePost, deletePost
}
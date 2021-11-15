/**
 * Creates a table if there would be none if it's name
 * @param db - the database that needs to be addressed
 */
function createTable(db) {
    console.log("tablecreatestart")
    db.schema.hasTable('posts').then(function (exists) {
        if (!exists) {
            return db.schema.createTable('posts', function (t) {
                t.increments('id').primary();
                t.integer('userid', 100);
                t.string('mood', 100);
                t.string('weather', 100);
            })
        }
    });
}

/**
 * Checks if de given id in URL is actually a number
 * @param req - to get its parameters and using id
 * @returns boolean based on the validity of the id
 */
function idValidation(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}
/**
 * [CURRENTLY NOT USED] Checks if the post is in proper format
 * @param post - the post (object) that needs to be checked
 * @returns boolean based on the validity of the object
 */
function postValidation(post){
    const hasUserID = !isNaN(post.userid);
    const hasMood = typeof post.mood == 'string' && post.mood.trim() != '';
    const hasWeather = typeof post.weather == 'string' && post.weather.trim() != '';
    return hasUserID && hasMood && hasWeather;
}
/**
 * Gets the post table
 * @param db - the database that needs to be addressed
 * @returns the posts json
 */
function getData(db) {
   return db('posts');
}
/**
 * Get the first post where the id matches the request
 * @param db - the database that needs to be addressed
 * @param id - the number extractied from the url
 * @returns the requested post
 */
function getPost(db, id) {
    return db('posts').where('id', id).first();
}
/**
 * Updates the post of given id in the url
 * @param db - the database that needs to be addressed
 * @param id - the number extractied from the url
 * @param post - the post (object) that needs to be updated
 * @returns the updated list
 */
function updatePost(db, id, post) {
    return db('posts').where('id', id)
        .update({
            mood: post.mood
        })
        .then(function(){
            return db('posts');
        })
}
/**
 * Deletes the post of given id in the url
 * @param db - the database that needs to be addressed
 * @param id - the number extractied from the url
 * @returns the updated list
 */
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
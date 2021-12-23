/**
 * Creates both tables and populates them
 * @param db - the database that needs to be addressed
 */
function createTable(db) {
    console.log("tablecreatestart")
    db.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return db.schema.createTable('users', function (t) {
                t.increments('id').primary();
                t.string('username', 100);
            })
        }
    }).then(async function () {
        var usercount = await db('users').count('username').first();
        console.log(usercount.count);
        if(usercount.count == 0){
            return db("users").insert([
                {username: "Kev"},
                {username: "Jeff"},
                {username: "Reff"},
                {username: "Lef"}
                ]);
            }
        }
    )
    db.schema.hasTable('posts').then(function (exists) {
        if (!exists) {
            return db.schema.createTable('posts', function (t) {
                t.increments();
                t.integer('userid').references('users.id')
                t.string('mood', 100);
                t.string('weather', 100);
            })
        }
    }).then(async function () {
        var postcount = await db('posts').count('id').first();
        console.log(postcount.count);
        if(postcount.count == 0){
            return db("posts").insert([
                {userid: 1, mood: "good", weather: "rainy"},
                {userid: 3, mood: "bad", weather: "overcast"},
                {userid: 2, mood: "good", weather: "sunny"},
                {userid: 1, mood: "depressed", weather: "code"}
                ]);
            }
        }
    )
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
 * Checks if the post is in proper format
 * @param post - the post (object) that needs to be checked
 * @returns boolean based on the validity of the object
 */
function postValidation(db, post){
    var max = getMax(db, 'users');
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
 * Gives the amount of rows in de table
 * @param db - the database that needs to be addressed
 * @param table - the table which we need the amount of rows of
 * @returns count of rows
 */
async function countRows(db, table){
    var count = await db(table).count('id').first();
    console.log(table + ' has ' + count.count + ' rows')
    return count.count
}
/**
 * Gives the highest number of ID in de table
 * @param db - the database that needs to be addressed
 * @param table - the table which we need the amount of rows of
 * @returns count of rows
 */
async function getMax(db, table){
    var max = await db(table).max('id');
    var maxString = JSON.stringify(max[0].max);
    var maxNumber = JSON.parse(maxString);
    console.log(table + ' has ' + maxString + ' as highest ID')
    return  maxNumber
}
/**
 * Creates a post with given information
 * @param db - the database that needs to be addressed
 * @param post - the post (object) that needs to be created
 * @returns the new post
 */
function createPost(db, post) {
    if(postValidation(db, post)){
        return db('posts').insert(post, '*');
    } else {
        return Error("Not a valid post")
    }
    
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
    createTable, getData, idValidation, getPost, postValidation, updatePost, deletePost, createPost
}
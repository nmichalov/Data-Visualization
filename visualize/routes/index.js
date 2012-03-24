var mongodb = require('mongodb');


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Topic Visualization' })
};

/*
 * GET topic model data
 */
exports.get_topic = function(req, res){
    res.contentType('application/json');
    var mongo = new mongodb.Db('data_visualization', new mongodb.Server('127.0.0.1', 27017, {}));
    mongo.open(function(err, db){
        if (err) throw err;
        db.collection('topics', function(err, collection) {
            collection.find().limit(10).toArray(function(err, docs) {
                res.send(JSON.stringify(docs), 200);
            });
        });
    });
};

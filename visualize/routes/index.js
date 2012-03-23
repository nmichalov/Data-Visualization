var mongodb = require('mongodb');


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Expess' })
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
            collection.find().toArray(function(err, docs) {
                res.send(JSON.stringify(docs), 200);
            });
        });
    });
};

exports.view_topics = function(req, res) {
    res.render('view-topics', { title: 'Topics' });
};


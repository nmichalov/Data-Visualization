var topicURL = '/json-topic-data';

DocModel = function(url,topics){
    var topicArray = [];
    for (i=0;i<10;i++){
        topicArray.push(0);}
    for (i=0;i<topics.length;i++){
        topicArray[(topics[i][0]-1)] = topics[i][1];}
    this.topics=topicArray;
    this.url=url;
};

DocModel.prototype.createGraph = function(canvas,xindent,yindent,radius){
    canvas.piechart(xindent,yindent,radius,this.topics);
};


$.getJSON(topicURL, function(data) {
    $.each(data, function(key, val) {
        $('#urls').append('<div>'+val.url+'</div>');
        var paper = Raphael(100, 100, 800,800);
        var dm = new DocModel(val.url,val.topics);
        dm.createGraph(paper, 700, 120, 100);
    });
});

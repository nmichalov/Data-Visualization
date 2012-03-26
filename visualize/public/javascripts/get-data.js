var topicURL = '/json-topic-data';

//topicVector = function(topics){
DocModel = function(url, topics){
    topicArray= [0,0,0,0,0,0,0,0,0,0];
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
        var dm = new DocModel(val.url, val.topics);
        //d3.select('#urls').append('div').text(val.url+'\n'+topicVector(val.topics));
        dm.createGraph(paper, 700, 120, 100);
    });
});

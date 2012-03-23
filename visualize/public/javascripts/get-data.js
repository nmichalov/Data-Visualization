var topicURL = '/json-topic-data';

$.getJSON(topicURL, function(data) {
    var j = 0
        $.each(data, function(key, val) {
            $('#urls').append('<div>'+val.url+'<div id="raph'+j.toString()+'">');
            var paper = Raphael(document.getElementById('raph'+j.toString()),300,300);
            var topicArray = [];
            for (i=0;i<10;i++) { 
                topicArray.push(0); 
            }
            for (i=0;i<val.topics.length;i++) { 
                topicArray[(val.topics[i][0]-1)] = val.topics[i][1]; 
            }
            paper.piechart(100, 100, 100, topicArray);
            $('#urls').append('</div></div>');
            j += 1
    });
});

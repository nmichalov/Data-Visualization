var topicURL = '/json-topic-data';

function normTopicVecs(topics){
    topicArray= [0,0,0,0,0,0,0,0,0,0];
    for (i=0;i<topics.length;i++){
        topicArray[(topics[i][0]-1)] = topics[i][1];}
    return topicArray;
};

function getNormedData() {
    var normedData = new Array();
    $.getJSON(topicURL, function(data) {
        $.each(data, function(key, val) {
            normedData.push({
                //url: val.url,
                topics: normTopicVecs(val.topics)
            })
        });
            //d3.select('#urls').append('div').text(val.url+'\n'+topicVector(val.topics));
    });
    return normedData;
};

//var data = getNormedData();
var data = [{year: 2006, books: 54},
            {year: 2007, books: 43},
            {year: 2008, books: 41},
            {year: 2009, books: 44},
            {year: 2010, books: 35}];

var barWidth = 40;
var width = (barWidth + 10) * data.length;
var height = 200;

var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.books; })]).
        rangeRound([0, height]);

//add the canvas to the DOM
var barDemo = d3.select("#urls").
    append("svg:svg").
    attr("width", width).
    attr("height", height);

barDemo.selectAll("rect").
    data(data).
    enter().
    append("svg:rect").
    attr("x", function(datum, index) { return x(index); }).
    attr("y", function(datum) { return height - y(datum.books); }).
    attr("height", function(datum) { return y(datum.books); }).
    attr("width", barWidth).
    attr("fill", "#2d578b");

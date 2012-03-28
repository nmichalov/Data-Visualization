var rawDataURL= '/json-topic-data';
   // , dataArray= new Array();

// functions to be called later
topicVec= function(topics){
    topicArray= [0,0,0];//,0,0,0,0,0,0,0];
    for (i=0;i<topics.length;i++){
        topicArray[(topics[i][0]-1)] = topics[i][1];}
    return topicArray;  //dimensionality temporarily reduced
};

// get data
    
$.getJSON(rawDataURL, function(data) {
    $.each(data, function(key, val) {
        $('<div>')
            .addClass('document')
            .attr('title', val.url)
            .attr('topics', topicVec(val.topics))
            .html('<h3>'+val.url+'</h3>')
            .appendTo('#documents');
        //dataArray.push({
        //    'url': val.url,
        //    'topics': topicVec(val.topics)
    })
});




//function createGraph() {
//    
//        var width = 300,
//            height = 300,
//            radius = 100,
//            color = d3.scale.category20c();
//
//        var vis = d3.select("#graphs")
//           .append("svg:svg")
//           .data([dataArray])
//          .attr("width", width)
//           .attr("height", height)
//           .append("svg:g")
//           .attr("transform", "translate(" + 150 + "," + 150 + ")");
//
//        var arc = d3.svg.arc()
//           .outerRadius(radius);
//
//        var pie = d3.layout.pie()
//            .value(function(d) { return d.topics[0]; });
//
//        var arcs = vis.selectAll("g.slice")
//            .data(pie)
//            .enter()
//            .append("svg:g")
//            .attr("class", "slice");

//            arcs.append("svg:path")
//                .attr("fill", function(d, i) { return color(i); } )
//                .attr("d", arc);
//
//            arcs.append("svg:text")
//                .attr("transform", function(d) {
//                    d.innerRadius= 0;
//                    d.outerRadius= radius;
//                   return "translate(" + arc.centroid(d) + ")";
//                })
//                .attr("text-anchor", "middle")
//                .text(function(d, i) { return data[i].url; });
//        ;}
//};

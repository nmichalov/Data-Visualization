var rawDataURL= '/json-topic-data'
  , dataArray= new Array();

// functions to be called later
topicVec= function(topics){
    topicArray= [0,0,0,0,0,0,0,0,0,0];
    for (i=0;i<topics.length;i++){
        topicArray[(topics[i][0])] = topics[i][1];}
    return topicArray;  
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
        })
    });

    $('#documents').on('click', '.document', function(){

        var divTops= this.getAttribute('topics').split(',')
          , data= [];

        console.log(divTops);

        for (i=0;i<divTops.length;i++){
            data.push({
                       'topic': divTops[i]
                      });}

        var width = 600,
            height = 600,
            radius = 200,
            color = d3.scale.category20c();

        d3.select("#graphs svg").remove();

        var vis = d3.select("#graphs")
           .append("svg:svg")
           .data([data])
           .attr("width", width)
           .attr("height", height)
           .append("svg:g")
           .attr("transform", "translate(" + 400 + "," + 270 + ")");

        var arc = d3.svg.arc()
           .outerRadius(radius);

        var pie = d3.layout.pie()
            .value(function(d) { return d.topic; });

        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("svg:g")
            .attr("class", "slice");

            arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } )
                .attr("d", arc);

    //        arcs.append("svg:text")
    //            .attr("transform", function(d) {
    //                d.innerRadius= 0;
    //                d.outerRadius= radius;
    //               return "translate(" + arc.centroid(d) + ")";
    //            })
    //            .attr("text-anchor", "middle")
    //            .text(function(d, i) { return data[i].url; });

        $(this)
            .addClass('active')    
            .siblings()
                .removeClass('active');
});

var topicURL = '/json-topic-data';

$.getJSON(topicURL, function(data) {
    console.log('get json called');
    $.each(data, function(key, val) {
        console.log('key '+key+' val '+val); 
        $("body").append(val.url);
    });
  });


function inputFocus(i) {
    if (i.value == i.defaultValue) { i.value = "";
        i.style.color = "#000"; }
}

function inputBlur(i) {
    if (i.value == "") { i.value = i.defaultValue;
        i.style.color = "#888"; }
}

function clearResults() {
	$("#return").empty();
}


$("#clear").on("click", function() {
	clearResults();
})

// This .on("click”) function will trigger the AJAX Call
$("#find-article").on("click", function(event) {
	

    event.preventDefault();

    
    // Here we grab the text from the input box
    var search = $("#term").val();
    var yearBegin = $("#start").val();
    var yearEnd = $("#end").val();
    var data = {
        "api-key": "74e79bb14b12402dbfa473ae5fa74ca1",
        "q": search
    }
    //console.log(yearBegin)

    if (yearBegin) {
        data.begin_date = yearBegin + "0101"
    }

    if (yearEnd) {
        data.end_date = yearEnd + "1231"
    }

    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
    clearResults();
    $.ajax({
        url: queryURL,
        method: "GET",
        data: data
    }).done(function(response) {
    	//console.log(response);
        var results = response.response.docs;
        //console.log(results);
	    //api fills the array
	    for (i = 0; i < results.length; i++) {

	        var art = $("<div>");
	        art.addClass("result-card");

	        var title = $("<div>").addClass("title").append(results[i].headline.main);
	        //title.addClass("title");

	        var section = $("<div>").addClass("section").append(results[i].snippet);
	        //section.addClass("section");

	        var pubDate = $("<div>").addClass("pubDate").append(results[i].pub_date);
	        //pubDate.addClass("pubDate");

	        var link = $("<a>").addClass("link").append(results[i].web_url);
	        link.attr("href", results[i].web_url);
	        link.attr("target", "_blank");
	        //link.addClass("link");

	        art.append(title);
	        art.append(section);
	        art.append(pubDate);
	        art.append(link);

	        $("#return").append(art);
	    }
        //console.log(response);
    });

});
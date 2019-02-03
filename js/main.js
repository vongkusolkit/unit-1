/* Script by Jamp Vongkusolkit, 2019 */

//initialize function called when the script loads
function initialize(){
	cities();
	debugAjax();

};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
    {
        city: 'Boston',
        population: 617594
    },
    {
        city: 'Chicago',
        population: 2695598
    },
    {
        city: 'Dallas',
        population: 1197816
    },
    {
        city: 'Seattle',
        population: 608660
    }
];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };

    //adds a column using the function cityPop
    addColumns(cityPop);
    //call the addEvents function
    addEvents();
};
//function to create the 'City Size' column
function addColumns(cityPop){
  //execute function once for each element with the <tr> tag
    $('tr').each(function(i){
      //if i=0, then add the header 'City Size'
    	if (i == 0){

    		$(this).append('<th>City Size</th>');
        //if i≠0, then define a variable called citySize
    	} else {

    		var citySize;
        //categorize each element by population size
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
        //add citySize categorization data to 'City Size' column
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};

`function called addEvents to change the table to a random color everytime
the mouse pointer is over an element with the <table> tag, and when you click
on an element with the 'table' tag, an alert will pop up`
function addEvents(){
  //create a function that will happen when the mouse pointer is over an element with  the <table> tag
	$('table').mouseover(function(){
    //define a variable called color and set it equal to "rgb("
		var color = "rgb(";
    //loop to generate 3 random colors
		for (var i=0; i<3; i++){
      //define a variable called random and have it generate random integer between 0 and 225
			var random = Math.round(Math.random() * 255);
      //add the generated number to the variable color
			color += random;
      //if loop has run 2 times or less, add "," to the variable color
			if (i<2){
				color += ",";
        //if loop has run more than 2 times, add ")" to the variable color
			} else {
				color += ")";
		};
    //add a 'color' style to the <table> tag
		$(this).css('color', color);
	};

  //function to alert
	function clickme(){
    //display an alert box
		alert('Hey, you clicked me!');
	};
  //attach the clickme function to the <table> tag
	$('table').on('click', clickme);
  });
};


//function that retrieves data and displays it on the browser
function debugAjax(){
	//define a variable to hold the data
	var mydata;

	//basic jQuery ajax method
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
			//store response into mydata
			mydata = response
			//append geojson data to mydiv
			$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(response));
		}
	});
};


//call the initialize function when the document has loaded
$(document).ready(initialize);

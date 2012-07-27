


function makeHistogram(){
    var attributes = window.attributes;
    var attrData = window.attrData;
    var hist = d3.select("#hist");
    var colorChosen = d3.select("#selectColorCode").property("value");
    var width = parseInt(hist.style("width"));
    var height = parseInt(hist.style("height"));
    var histPadding = .1*Math.sqrt(height*width);
    
    attributes.forEach(function(colorCode){
	    
	    if(attributes.get(colorCode).dataType == "number"){
		
		var histValues = [];
		//is there an easier way to do this?
		attrData.forEach(function(point, i){
			histValues[i] = point.sample[colorCode];
		    });
		
		//		makeNumberHistogram();
		//	function makeNumberHistogram(){
		    var colorInterpolator = attributes.get(colorCode).colorInterpolator;
		    var extent = d3.extent(colorInterpolator.domain());
		    var numBins = 15;
		    
		    var min = extent[0];
		    var max = extent[1];
		    
		    var domainMinxScale;
		    if (min>=0){
			domainMinxScale = 0;
		    }
		    else{
			domainMinxScale = min - ((max-min)/(numBins-1));
		    }
		    
		    var xScale = d3.scale.linear()
			.domain([domainMinxScale, max + ((max-min)/(numBins-1))])
			.range([histPadding, width-histPadding]);
		    
		    var histogram = d3.layout.histogram().bins(xScale.ticks(numBins))
			(histValues);
		    
		    var yScale = d3.scale.linear()
			.domain([0, d3.max(histogram, function(h) { return h.y; })])
			.range([(height-histPadding), histPadding]);
		    
		    var svgHist = d3.select("#hist")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "histograms")
			.attr("id", "hist" + colorCode);
		    
		    if (colorChosen != colorCode){
			svgHist.attr("display", "none");
		    }
		    
		    svgHist.selectAll("rect")
			.data(histogram)
			.enter()
			.append("rect")
			.attr("class", "histogramRectangles")
			.attr("width", function(h) {return xScale(h.dx)-xScale(0) - 1;})
			.attr("x", function(h) { 
				return xScale(h.x); })
			.attr("y", function(h) { return yScale(h.y); })
			.attr("height", function(h) {return height - yScale(h.y) - histPadding;})//yHist(h.y); })
			.attr("fill", function(h){  return attributes.get(colorCode).colorInterpolator(h.x); });
		    
		    var xAxisHist = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.ticks(numBins);
		    
		    var yAxisHist = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(height*.05);
		    
		    svgHist.append("g")
			.attr("class", "axis")
			.style("fill", "none")
			.style("stroke", "black")
			.style("shape-rendering", "crispEdges")
			.attr("transform", "translate( 0," + (height - histPadding) + ")")
			.call(xAxisHist);
		    
		    svgHist.append("g")
			.attr("class", "axis")
			.style("fill", "none")
			.style("stroke", "black")
			.style("shape-rendering", "crispEdges")
			.attr("transform", "translate(" +(histPadding)+ ", 0 )")
			.call(yAxisHist);
		    //		};//end function makeNumberHistogram
	    } //end if number
	    else{ //if string
		
		var colorInterpolator = attributes.get(colorCode).colorInterpolator;
		var extent = (colorInterpolator.domain());
		if ((extent.length>1)&&(extent.length!=attrData.length)) {
				      
		    var histValues = d3.map();
		    //is there an easier way to do this?
		    attrData.forEach(function(point){
			    var num;
			    if(histValues.has(point.sample[colorCode])){
				num = histValues.get(point.sample[colorCode]);
				histValues.set(point.sample[colorCode], num +1);
			    }else{
				histValues.set(point.sample[colorCode], 1);
			    }
			});
		    
		    var xScale = d3.scale.ordinal()
			.domain(extent)
			.rangeRoundBands([histPadding, width-histPadding]);

		    var yScale = d3.scale.linear()
			.domain([0, d3.max(histValues.values())])
			.range([(height-histPadding), histPadding]);
		    
		    var svgHist= d3.select("#hist")
			.append("svg:svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "histograms")
			.attr("id", "hist" + colorCode);
		    
		    if (colorChosen!=colorCode)
			svgHist.attr("display", "none");
		    
		    svgHist.selectAll("rect")
			.data(histValues.entries())
			.enter()
			.append("svg:rect")
			.attr("class", "histogramRectangles")
			.attr("width",  xScale.rangeBand)
			.attr("x", function(h, i) { return xScale(h.key); })
			.attr("y", function(h) { return yScale(h.value); })
			.attr("height", function(h) {
				return height - yScale(h.value) - histPadding;})//yHist(h.y); })
			.attr("fill", function(h){ 
				return attributes.get(colorCode).colorInterpolator([h.key]) });
		    
		    var yAxisHist = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(height*.03);
		    
		    svgHist.append("g")
			.attr("class", "axis")
			.style("fill", "none")
			.style("stroke", "black")
			.style("shape-rendering", "crispEdges")
			.attr("transform", "translate(" +(histPadding)+ ", 0 )")
			.call(yAxisHist);
		    
		    var xAxisHist = d3.svg.axis()
			.scale(xScale)
			.orient("bottom");
		    
		    svgHist.append("g")
			.attr("class", "x axis")
			.style("fill", "none")
			.style("stroke", "black")
			.style("shape-rendering", "crispEdges")
			.attr("transform", "translate( 0," + (height - histPadding) + ")")
			.call(xAxisHist);
		    
		} //end make string histogram
	  
 } //end if string

	});//ends forEach attribute
} //end function make Histogram





function makeList(){
    window.attributes.forEach(function(colorCode){
	    if(window.attributes.get(colorCode).dataType == "number")
		{
		    makeListNum(colorCode);
		}
	    else{
		makeListString(colorCode);
	    }
	}); //attributes for each loop end

}//end function makeList

function makeListNum(colorCode){

    var listNum = d3.select("#list").append("div")
	.style("font-family", "sans-serif")
	.attr("class" ,"lists")
	.attr("id", "list" + colorCode);
    
    var colorInterpolator = window.attributes.get(colorCode).colorInterpolator;
    var extent = d3.extent(colorInterpolator.domain());
    var min = extent[0];
    var max = extent[1];

    var infoText = "Minimum " + colorCode + ": " + min + "<BR>" + "Maximum " + colorCode + ": " + max;
    listNum.html(infoText);
    
    var colorChosen = d3.select("#selectColorCode").property("value");
    
    if(colorCode != colorChosen){
	listNum.style("display", "none");
    }
    
} //ends function makeListNum

function makeListString(colorCode){
    var colorTypes = window.colorTypes.get(colorCode);
    var attributes = window.attributes.get(colorCode);
    var colorInterpolator = attributes.colorInterpolator;
    var heightOfText = 20;
    var width = d3.select("#list").style("width");
    var maxHeight = d3.select("#list").style("max-height");
    var listString = d3.select("#list").append("div")
	.attr("id", "list" + colorCode)
	.attr("class", "lists")
	.style("width", width-5)
	.style("left", 0)
	.style("top", 0)
	.style("position", "relative")
	.style("height", heightOfText*colorTypes.length + colorTypes.length);

    colorTypes.forEach(function(c, i){

	    var colorBlock = listString.append("div")
		.attr("class", "colorBlocks")
		.style("position", "absolute")
		.style("background", function(d){
			return colorInterpolator(c); })
		.style("height", heightOfText + "px")
		.style("width", 30 + "px")
		.style("top", ((heightOfText + 1)*i)+"px")
		.style("left", 0 + "px")
		.style("align", "top");
	    
	    var textBlock = listString.append("div")
		.attr("class", "textBlocks")
		.style("position", "absolute")
		.style("font-family", "sans-serif")
		.style("font-size", (heightOfText -5)+"px")
		.style("top", (2 +(heightOfText + 1)*i)+"px")
		.style("left", (35)+"px")
		.text(c);
	    
	});

    var colorChosen = d3.select("#selectColorCode").property("value");
    
    if(colorCode != colorChosen){
	listString.style("display", "none");
    }
} //ends function makeListString

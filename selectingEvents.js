
function eventHandlers(){
    
    //where should this go?
    $("#selectColorCode").change(function(e) {
	    
	    changeColors();
	});
//	$("svg").click(selecting(this));
//$(document).click(function(){
		//clickFunction();
		
//	});
	//$("#button").click(writeDownloadLink);

} //ends function eventHandlers

function changeColors(){
   
    var colorCode = d3.select("#selectColorCode").property("value");
    d3.selectAll(".allCircles").attr("fill",function(d, i){
	    return window.attributes.get(colorCode).colorInterpolator(window.attrData[i%window.attrData.length].sample[colorCode]);
	});
    d3.selectAll(".histograms").attr("display", "none");
    d3.select("#hist" + colorCode).attr("display", "block");
    d3.selectAll(".lists").style("display", "none");
    d3.select("#list" + colorCode).style("display", "block");
} //ends function changeColors

function fillInfoList(d, i){
    var info = d3.select("#info")
	.style("font-family", "sans-serif");
    info.html("");
    var infoText = " (" + (d.x).toFixed(3) + ", " + (d.y).toFixed(3) + " )";
    window.attributes.forEach(function(key){
	    infoText += " <BR>  " + key + ": " + window.attrData[i].sample[key];
	});
    
    info.html(infoText);
} //ends function fillInfoList

function makeRadiusBigger(svg, width, height){
    makeRadiusSmallerAgain();
    var radiusSize = d3.select(svg).attr("r");
    d3.select(svg)
	.attr("r", radiusSize*1.2).attr("class", "offClick").style("opacity", .9).attr("stroke-width", 1.3);
} //ends function makeRadiusBigger

function makeRadiusSmallerAgain(){
    var radiusSize = d3.selectAll(".allCircles").attr("r");
    d3.selectAll(".offClick").attr("r",radiusSize).attr("class", "allCircles").style("opacity", .5).attr("stroke-width", .5);
	d3.selectAll(".selectingCircles").attr("r",radiusSize).attr("class", "allCircles").style("opacity", .5).attr("stroke-width", .5);
}//ends makeRadius small again

function clickFunction() { 
    var infoDiv = d3.select("#info");
    makeRadiusSmallerAgain();
    infoDiv.html("");
}//ends click
function displayDataOfSelected(){


    var info = d3.select("#info")
	.style("font-family", "sans-serif");
    info.html("");
	var infoText = "Selected: ";
	infoText+=d3.selectAll(".selecting").selectAll(".selected")[0].length + "<BR>Ids";
	d3.selectAll(".selecting").selectAll(".selected")[0].forEach(function(point, i){
		var index = (d3.select(point).attr("title"));
	    infoText += " <BR> " + window.attrData[index].sample["id"];
	});
    info.html(infoText);


}
/*
function rollOver(d, i, svg, xScale, yScale){
    var parent = d3.select(svg.parentElement).attr("id");
    var numb = parent.match(/\d/g); //found this line online. THANKYOU!!!
    var colorCode = d3.select("#selectColorCode").property("value");
    var hoverText = colorCode + ": " + window.attrData[i].sample[colorCode];
    d3.select("#plot" + numb)
	.select(".pointText")
	.style("display", "block")
	.style("left" , (xScale(d.x) + 4)+"px")
	.style("top", (yScale(d.y) - 20)+"px")
	.text(hoverText);
} //ends function rollOver

function rollOff(){
    d3.selectAll(".pointText")
	.style("display", "none");
} //ends function rollOff

*/
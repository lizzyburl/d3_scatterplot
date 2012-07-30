function selecting(svg, xScale, yScale){
//BRUSH!!!

var brush = d3.svg.brush()
	.x(xScale)
	.y(yScale)
	.on("brushstart", brushstart)
	.on("brush", brush)
	.on("brushend", brushend);
 
svg.append("g")
    .attr("class", "brush")
    .call(brush);
	/*d3.svg.brush().x(xScale).y(yScale)
    .on("brushstart", brushstart)
    .on("brush", brush)
    .on("brushend", brushend));
*/
function brushstart(p) {
  
  emptyBrushes();
  clickFunction();
  svg.attr("class", "selecting");
  d3.selectAll(".notSelecting").attr("class", "selectingOther");

}

function brush() {
  var e = d3.event.target.extent();
  var circle = d3.selectAll(".selecting").selectAll(".allCircles");
    circle.classed("selected", function(d) {
	return  (e[0][0] <= d.x) && (d.x <= e[1][0]) && (e[0][1] <= d.y) && (d.y <= e[1][1]);
  });
    displayDataOfSelected();
	d3.selectAll(".selected")[0].forEach(function(circle){
	var id = circle.id;
	d3.selectAll(".selectingOther").selectAll("#" + id).attr("class", "selectedOther");
  });
    d3.selectAll(".selectingOther").selectAll(".brush").select(".extent").attr("width", 0).attr("height", 0);


}

function brushend() {
if(!d3.event.target.empty()){
  d3.selectAll(".selecting").attr("class", "selecting");
  }else{
	d3.selectAll(".selecting").attr("class", "notSelecting");
  }
if(!d3.event.target.empty()){
  d3.selectAll(".selectingOther").attr("class", "selectingOther");
  }else{
	d3.selectAll(".selectingOther").attr("class", "notSelecting");
  }
}

}

function emptyBrushes(){
	d3.selectAll(".selecting").attr("class", "notSelecting");
	d3.selectAll(".selectingOther").attr("class", "notSelecting");
	d3.selectAll(".selected").classed("selectingCircles", true);
	d3.selectAll(".selectedOther").classed("selectingCircles", true);
//d3.selectAll(".brush").clear;
	//d3.event.target.extent().clear;
}
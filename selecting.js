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
function brushstart() {
  svg.classed("selecting", true);
  svg.selectAll(".allCircles").classed("selectingCircles", true);
  clickFunction();
}

function brush() {
  var e = d3.event.target.extent();
  var circle = d3.selectAll(".selectingCircles");
  circle.classed("selected", function(d) {
	return  (e[0][0] <= d.x) && (d.x <= e[1][0]) && (e[0][1] <= d.y) && (d.y <= e[1][1]);
  });
  displayDataOfSelected(svg);

}
/*return e[0][0] <= d.x && d.x <= e[1][0]
        && e[0][1] <= d.y && d.y <= e[1][1];*/
function brushend() {
  svg.classed("selecting", !d3.event.target.empty());
}



}
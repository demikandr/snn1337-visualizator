update_chart = function(node_id) {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);
    var svg = d3.select("#chart")
    //    .append('path').classed('line', true);

    svg.selectAll("*").remove();
d3.tsv("".concat("data/", node_id, ".tsv"), function(error, data) {
      if (error) throw error;

      // Coerce the data to numbers.
      data.forEach(function(d) {
        d.x = +d.x;
        d.y = +d.y;
      });

      // Compute the scales’ domains.
      x.domain(d3.extent(data, function(d) { return d.x; })).nice();
      y.domain(d3.extent(data, function(d) { return d.y; })).nice();

      // Add the x-axis.
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom().scale(x));

      // Add the y-axis.
      svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft().scale(y));

      // Add the points!
      svg.selectAll(".point")
          .data(data)
        .enter().append("circle")
          .attr("class", "point")
          .attr("r", 4.5)
          .attr("cx", function(d) { return x(d.x); })
          .attr("cy", function(d) { return y(d.y); });
        curve = d3['curveLinear']
        this.arrayMap = function (data, scales) {
            scales = scales || { x: d3.scaleIdentity(), y: d3.scaleIdentity() }
            var result = [];
            for (var i = 0; i < data.length; i++) {
                result.push([scales.x(data[i].x), scales.y(data[i].y)])
            }
            return result;
        }
        Data = data
        arrayMapped =  this.arrayMap(data, { x: x, y: y });
        fittedCurve = d3.line().curve(curve)(arrayMapped);
        svg.append('path').classed('line', true)
                    .attr('d', fittedCurve);


    });
}
update_chart("1:1")

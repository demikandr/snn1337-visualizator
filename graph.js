create_graph = function() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        width = +svg.attr("width"),
        height = +svg.attr("height");
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var get_node_id = function(d) { return "".concat(d.group, ":", d.id); };

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(get_node_id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json("data/graph.json", function(error, graph) {
      if (error) throw error;

      var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")

      var node = svg.append("g")
          .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
          .attr("r", 5)
          .attr("fill", function(d) { return color(d.group); })
          .on("click", d => update_chart(get_node_id(d)))
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));
        

      node.append("title")
          .text(function(d) { return d.id; });

      simulation
          .nodes(graph.nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(graph.links).distance(200);

      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x + d.source.group * 300 - 500; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x + d.target.group * 300 - 500 ; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x + d.group * 300 - 500; })
            .attr("cy", function(d) { return d.y; });
      }
    });

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
//
//     force.on("tick", function(e) {

//       // Push different nodes in different directions for clustering.
//       var k = 6 * e.alpha;
//       nodes.forEach(function(o, i) {
//         o.x += i & 2 ? k : -k;
//         o.y += i & 1 ? k : -k;
//       });

//       node.attr("cx", function(d) { return d.x; })
//           .attr("cy", function(d) { return d.y; });

//       vis.selectAll("path")
//         .data(groups)
//           .attr("d", groupPath)
//         .enter().insert("path", "circle")
//           .style("fill", groupFill)
//           .style("stroke", groupFill)
//           .style("stroke-width", 40)
//           .style("stroke-linejoin", "round")
//           .style("opacity", .2)
//           .attr("d", groupPath);
//     });

}
create_graph()
init_chart = function() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var svg = d3.select("body").append("svg")
        .attr("id", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}
init_chart()

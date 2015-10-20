// main.js

 var w0 = $("#skillbubbles").innerWidth(),
    h0 = 600,
    r0 = 600,
    x = d3.scale.linear().range([0, r0]),
    y = d3.scale.linear().range([0, r0]),
    node,
    root;

var pack = d3.layout.pack()
    .size([r0, r0])
    .value(function(d) { return d.size; })

var vis2 = d3.select("#skillbubbles").insert("svg:svg", "h2")
    .attr("width", w0)
    .attr("height", h0)
  .append("svg:g")
    .attr("transform", "translate(" + (w0 - r0) / 2 + "," + (h0 - r0) / 2 + ")");

d3.json("js/area.json", function(data) {
  node = root = data;

  var nodes = pack.nodes(root);

  vis2.selectAll("circle")
      .data(nodes)
    .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { return zoom(node == d ? root : d); })
      .on("mouseover",function(d) {
      vis2.selectAll("text").style("fill",function(d2) {return d2.name==d.name ? "#ff7f0e" : d2.children ? d2.mycolor: "#888";});
      })
      .on("mouseout",function(d) {
      vis2.selectAll("text").style("fill", function(d2) {return d2.children ? d2.mycolor: "#888";});
      });

  vis2.selectAll("text")
      .data(nodes)
    .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("font-size", function(d) {return Math.max(d.r/4,5);})
      .attr("text-anchor", "middle")
      .style("fill",function(d) {return d.children ? d.mycolor: "#888";})
      .style("opacity", function(d) { return d.r < 20 ? 0 : d.r > 300 ? 0 : d.children ? 1 : 0.5; })
      .text(function(d) { return d.name; });

  d3.select(window).on("click", function() { zoom(root); });
});

function zoom(d, i) {
  var k = r0 / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  node = d;
  var t = vis2.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .attr("font-size", function(d) {return Math.max(k*d.r/4,5);})
      .style("opacity", function(d) { return node==d ? 0.1: k * d.r < 20 ? 0 : k*d.r > 300 ? 0 : d.children ? 1 : 0.8; });

  d3.event.stopPropagation();
}

$( window ).resize(function() {
    w0 = $("#skillbubbles").innerWidth();
    vis2.attr("width", w0);
});

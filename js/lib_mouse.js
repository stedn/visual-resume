// lib_mouse.js

var setup_mouse = function(plot_info) {

  var g = plot_info.global;

  // Initialize the info display.

  var default_precis,
      formatNumber  = d3.format(',d'),
      indent        = '&nbsp;&nbsp;';

  
  

  on_mouseout = function() {
  //
  // Clear any highlighted nodes or links.

    g.svg.selectAll('.active_it').classed('active_it', false);
    g.svg.selectAll('.active_its').classed('active_its', false);
    g.svg.selectAll('.active_is').classed('active_is', false);
    g.svg.selectAll('.active_mo').classed('active_mo', false);

  }


  on_mouseover_link = function(orig_link) {
  //
  // Highlight the link and connected nodes on mouseover.
  //
  // Mousing over a link should cause:
  //
  //   the link to turn red
  //   the nodes that it imports to turn green
  //   the nodes that import it  to turn blue
  //   the sidebar to show consistent colors and text

    var trace     = false;

    var link_mo   = function(curr_link) {
      var result  = curr_link === orig_link;

//    if (result) console.log('link_mo', curr_link, orig_link); //T
      return result;
    };

    
    var node_it  = function(curr_node) {
      var curr_name   = curr_node.node.name;
      var orig_name1   = orig_link.target.node.name;
      var orig_name2   = orig_link.source.node.name;

      var result      = (curr_name === orig_name1||curr_name === orig_name2)&&curr_node.node.type=='target';
      return result;
    };
    
    var node_is  = function(curr_node) {
      var curr_name   = curr_node.node.name;
      var orig_name1   = orig_link.target.node.name;
      var orig_name2   = orig_link.source.node.name;

      var result      = (curr_name === orig_name1||curr_name === orig_name2)&&curr_node.node.type=='source';
      return result;
    };
    
    var node_its  = function(curr_node) {
      var curr_name   = curr_node.node.name;
      var orig_name1   = orig_link.target.node.name;
      var orig_name2   = orig_link.source.node.name;

      var result      = (curr_name === orig_name1||curr_name === orig_name2)&&curr_node.node.type=='target-source';
      return result;
    };

    g.svg.selectAll('.link'        ).classed('active_mo', link_mo);

    g.svg.selectAll('.node g').classed('active_it', node_it);
    g.svg.selectAll('.node g').classed('active_is', node_is);
    g.svg.selectAll('.node g').classed('active_its', node_its);

    
  }


  on_mouseover_node = function(orig_node) {
  //
  // Highlight the node and connected links on mouseover.
  //
  // Mousing over a node should cause:
  //
  //   the node (and its clone, if any)    to turn red
  //   the links and nodes that it imports to turn green
  //   the links and nodes that import it  to turn blue
  //   the sidebar to show consistent colors and text

    var trace     = false;

    var link_mo  = function(curr_link) {
      var curr_name1   = curr_link.target.node.name;
      var curr_name2   = curr_link.source.node.name;
      var orig_name   = orig_node.node.name;

      var result = (curr_name1 === orig_name||curr_name2 === orig_name);
      return result;
    };


    var node_it  = function(curr_node) {
      var curr_name   = curr_node.node.name;
      var orig_name   = orig_node.node.name;
      var curr_srcs   = g.sources[curr_name];
      var curr_tgts   = g.targets[curr_name];
      var result      = false;
      
      if(curr_name===orig_name && curr_node.node.type==='target') result = true;
      
      if (curr_tgts) {
        for (curr_tgt in curr_tgts)
          if (curr_tgt === orig_name && curr_node.node.type==='target' ) result = true;
      }

      if (curr_srcs) {
        for (curr_src in curr_srcs)
          if (curr_src === orig_name && curr_node.node.type==='target' ) result = true;
      }

      return result;
    };

    var node_is  = function(curr_node) {
      var curr_name   = curr_node.node.name;
      var orig_name   = orig_node.node.name;
      var curr_srcs   = g.sources[curr_name];
      var curr_tgts   = g.targets[curr_name];
      var result      = false;
      
      if(curr_name===orig_name && curr_node.node.type==='source') result = true;
      
      if (curr_tgts) {
        for (curr_tgt in curr_tgts)
          if (curr_tgt === orig_name && curr_node.node.type==='source' ) result = true;
      }

      if (curr_srcs) {
        for (curr_src in curr_srcs)
          if (curr_src === orig_name && curr_node.node.type==='source' ) result = true;
      }

      return result;
    };
    
    var node_its  = function(curr_node) {
      var curr_name   = curr_node.node.name;
      var orig_name   = orig_node.node.name;
      var curr_srcs   = g.sources[curr_name];
      var curr_tgts   = g.targets[curr_name];
      var result      = false;
      
      if(curr_name===orig_name && curr_node.node.type==='target-source') result = true;
      
      if (curr_tgts) {
        for (curr_tgt in curr_tgts)
          if (curr_tgt === orig_name && curr_node.node.type==='target-source' ) result = true;
      }

      if (curr_srcs) {
        for (curr_src in curr_srcs)
          if (curr_src === orig_name && curr_node.node.type==='target-source' ) result = true;
      }

      return result;
    };

    g.svg.selectAll('.link'         ).classed('active_mo', link_mo);

    g.svg.selectAll('.node g' ).classed('active_it', node_it);
    g.svg.selectAll('.node g' ).classed('active_is', node_is);
    g.svg.selectAll('.node g' ).classed('active_its', node_its);

    var src_tmp   = g.sources[orig_node.node.name];
    var sources   = src_tmp ? Object.keys(src_tmp).sort().join('<br>') : '';

    var targets   = orig_node.node.imports.sort().join('<br>');

  }
};

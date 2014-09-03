// main.js

  var snap      = function(i) { return function() { return i; }; }

  var get_info  = function(data_set, format) {

    var degree  = Math.PI / 180,
        x_max   = $("#demo_1").innerWidth(),    x_off   = x_max * 0.33,
        y_max   = 700,    y_off   = y_max * 0.5;

    if (format === 'conv') {  // "conventional"
      var a_so    =    -160,     
          a_to    = -25,     a_ts    = (120 ),
          i_rad   =   25,     o_rad   = 300;

    } else {                  // "rectangular"
      var a_so    =  -45,     a_st    = 45,
          a_to    = -135,     a_ts    = 135,
          i_rad   =   25,     o_rad   = 350;
    }

    var info  = {
      'global': {
        'selector':       ( snap(data_set) )(),
        'x_max':          x_max,      'x_off':          x_off,
        'y_max':          y_max,      'y_off':          y_off,
        'inner_radius':   i_rad,      'outer_radius':   o_rad
      },

      'axes': {
        'target':         { 'angle':  degree * a_so },
        'source-target':  { 'angle':  degree * a_ts },
        'target-source':  { 'angle':  degree * a_ts },
        'source':         { 'angle':  degree * a_to }
      }
    };

    return info;
  };


  var data_sets     = { '#demo_1':   'js/ze_data.json' };

  var info_sets     = {};

   data_set ='#demo_1'

    info_sets[data_set]  = get_info(data_set, 'conv');

    var func_f = function() {
      var info_set  = info_sets[data_set];

      var func  = function(nodes) {
        prep_data(info_set, nodes);
        setup_mouse(info_set);
        display_plot(info_set);
      };
      return func;
    };

    setup_plot(info_sets[data_set]);
    d3.json(data_sets[data_set], func_f() );

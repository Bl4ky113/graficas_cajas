"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var obj_canvas = {
  large: {
    html: document.getElementById("canvas_large")
  },
  width: {
    html: document.getElementById("canvas_width")
  },
  area_cut: {
    html: document.getElementById("canvas_area_cut")
  },
  area_paper: {
    html: document.getElementById("canvas_area_paper")
  },
  area_base: {
    html: document.getElementById("canvas_area_base")
  },
  volume: {
    html: document.getElementById("canvas_volume")
  }
};
var hex_colors = {
  axis: "#000055",
  stats: "#3c3cff"
};
var NUM_OPERATIONS = 10;
var NUM_INCREMENT = 0.5;
var TOTAL_OPERATIONS = 21;
var PADDING = 20;
var boxFunctions = {
  large: function large(x) {
    return -(2 * x) + 24;
  },
  width: function width(x) {
    return -(2 * x) + 20;
  },
  area_cut: function area_cut(x) {
    return 4 * Math.pow(x, 2);
  },
  area_paper: function area_paper(x) {
    return -(4 * Math.pow(x, 2)) + 480;
  },
  area_base: function area_base(x) {
    return 4 * Math.pow(x, 2) - 88 * x + 480;
  },
  volume: function volume(x) {
    return 4 * Math.pow(x, 3) - 88 * Math.pow(x, 2) + 480 * x;
  }
};

var getBoxFunctions = function getBoxFunctions(key) {
  var function_data = [];

  for (var i = 0; i <= NUM_OPERATIONS; i += NUM_INCREMENT) {
    function_data.push(boxFunctions["".concat(key)](i));
  }

  return function_data;
};

var calcValYMarker = function calcValYMarker() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var space_y_marker = arguments.length > 1 ? arguments[1] : undefined;
  var greater_num = 0;
  data.forEach(function (num) {
    if (num > greater_num) {
      greater_num = num;
    }
  });
  var val_y_marker = greater_num / 10 / space_y_marker;
  return val_y_marker;
};

var numberToCloserZero = function numberToCloserZero() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var num_to_zero = num;

  if (num_to_zero > 0) {
    num_to_zero = num_to_zero.toString().split("");
    num_to_zero[num_to_zero.length - 1] = 0;
    num_to_zero = num_to_zero.join("");
    num_to_zero = parseInt(num_to_zero);
  }

  return num_to_zero;
};

var drawLineOnCanvas = function drawLineOnCanvas(canvas, xi, yi, xf, yf) {
  var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#000000";
  var marker = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 2;
  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.lineWidth = marker;
  canvas.moveTo(xi, yi);
  canvas.lineTo(xf, yf);
  canvas.stroke();
  canvas.closePath();
};

var drawSquareOnCanvas = function drawSquareOnCanvas(canvas, xi, yi, w, h) {
  var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#00000";
  var marker = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
  var fill = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.lineWidth = marker;
  canvas.rect(xi, yi, w, h);

  if (fill) {
    canvas.fillStyle = color;
    canvas.fill();
  } else {
    canvas.stroke();
  }
};

var drawAxis = function drawAxis(canvas) {
  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var space_markers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  drawLineOnCanvas(canvas, axis.x, axis.y, PADDING, axis.y, color = hex_colors.axis, marker = 4);
  drawLineOnCanvas(canvas, PADDING, axis.y, PADDING, PADDING, color = hex_colors.axis, marker = 4);

  for (var xi_marker = space_markers.x; xi_marker <= axis.x; xi_marker += space_markers.x) {
    drawSquareOnCanvas(canvas, xi_marker, axis.y - PADDING / 4, 1, PADDING / 2, color = hex_colors.axis, marker = 2);
  }

  for (var yi_marker = axis.y; yi_marker > PADDING; yi_marker -= space_markers.y) {
    drawSquareOnCanvas(canvas, PADDING - PADDING / 4, yi_marker, PADDING / 2, 1, color = hex_colors.axis, marker = 2);
  }

  drawSquareOnCanvas(canvas, PADDING - PADDING / 4, axis.y - PADDING / 4, PADDING / 2, PADDING / 2, color = hex_colors.axis, marker = 2, fill = true);
};

var drawDataWithLines = function drawDataWithLines(canvas) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var space_markers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  for (var x_data = space_markers.x * 2, i = 0; x_data <= axis.x; x_data += space_markers.x, i += 1) {
    drawLineOnCanvas(canvas, x_data, axis.y, x_data, data[i], color = hex_colors.stats, marker = 5);
  }
};

window.onload = function () {
  Object.entries(obj_canvas).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        element = _ref2[1];

    element["obj"] = element.html.getContext("2d");
    element["width"] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().width));
    element["height"] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().height));
    element["axis"] = {
      x: element.width - PADDING,
      y: element.height - PADDING
    };
    element["space_markers"] = {
      x: element.axis.x / (TOTAL_OPERATIONS + 1),
      y: element.axis.y / 11
    };
    element["data"] = getBoxFunctions(key);
    element["val_y_marker"] = calcValYMarker(element.data, element.space_markers.y);
    element["canvas_data"] = element.data.map(function (num) {
      return -(num / element.val_y_marker) + (element.height - PADDING);
    });
    element.html.width = element.width;
    element.html.height = element.height;
    drawAxis(element.obj, element.axis, element.space_markers);
    drawDataWithLines(element.obj, element.canvas_data, element.axis, element.space_markers);
  });
};
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

var TOTAL_OPERATIONS = function TOTAL_OPERATIONS() {
  var count = 0;

  for (var i = 0; i < NUM_OPERATIONS; i += NUM_INCREMENT) {
    count += 1;
  }

  return count;
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

var drawAxis = function drawAxis(canvas, canvas_width, canvas_height) {
  var padding = 20;
  var yi_axis = canvas_height - padding;
  var xi_axis = canvas_width - padding;
  var space_x_markers = xi_axis / TOTAL_OPERATIONS() + 1;
  var space_y_markers = yi_axis / 10;
  drawLineOnCanvas(canvas, xi_axis, yi_axis, padding, yi_axis, color = hex_colors.axis, marker = 4);
  drawLineOnCanvas(canvas, padding, yi_axis, padding, padding, color = hex_colors.axis, marker = 4);

  for (var xi_marker = space_x_markers; xi_marker < xi_axis; xi_marker += space_x_markers) {
    drawSquareOnCanvas(canvas, xi_marker, yi_axis - padding / 4, 1, padding / 2, color = hex_colors.axis, marker = 2);
  }

  for (var yi_marker = yi_axis; yi_marker > padding; yi_marker -= space_y_markers) {
    drawSquareOnCanvas(canvas, padding - padding / 4, yi_marker, padding / 2, 1, color = hex_colors.axis, marker = 2);
  }

  drawSquareOnCanvas(canvas, padding - padding / 4, yi_axis - padding / 4, padding / 2, padding / 2, color = hex_colors.axis, marker = 2, fill = true);
};

window.onload = function () {
  Object.entries(obj_canvas).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        element = _ref2[1];

    element["obj"] = element.html.getContext("2d");
    element["width"] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().width));
    element["height"] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().height));
    element.html.width = element.width;
    element.html.height = element.height;
    drawAxis(element.obj, element.width, element.height);
  });
};
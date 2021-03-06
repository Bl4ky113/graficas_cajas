"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var labels_canvas = {
  large: document.getElementById("label_large"),
  width: document.getElementById("label_width"),
  area_cut: document.getElementById("label_area_cut"),
  area_paper: document.getElementById("label_area_paper"),
  area_base: document.getElementById("label_area_base"),
  volume: document.getElementById("label_volume")
};
var btns_canvas = {
  large: document.getElementById("large_buttons"),
  width: document.getElementById("width_buttons"),
  area_cut: document.getElementById("area_cut_buttons"),
  area_paper: document.getElementById("area_paper_buttons"),
  area_base: document.getElementById("area_base_buttons"),
  volume: document.getElementById("volume_buttons")
};
var table_functions = document.getElementById("table_formulas");
var min_screen_width = window.matchMedia("(max-width: 655px)");
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
  var greater_num = 0;
  data.forEach(function (num) {
    if (num > greater_num) {
      greater_num = num;
    }
  });
  var val_y_marker = greater_num / 10;
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

var drawFigureOnCanvas = function drawFigureOnCanvas(canvas, xi, yi, xf_increment) {
  var yf = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#000000";
  var marker = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
  var fill = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.lineWidth = marker;
  canvas.moveTo(xi, yi);

  for (var i = 0, xf = xi; i <= yf.length; i += 1, xf += xf_increment) {
    canvas.lineTo(xf, yf[i]);
  }

  canvas.lineTo(xf_increment * (yf.length + 1), yi);
  canvas.lineTo(xi, yi);

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

  for (var xi_marker = space_markers.x * 2; xi_marker <= axis.x; xi_marker += space_markers.x) {
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

var drawDataWithSquares = function drawDataWithSquares(canvas) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var space_markers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  for (var x_data = space_markers.x * 2, i = 0; x_data <= axis.x; x_data += space_markers.x, i += 1) {
    drawSquareOnCanvas(canvas, x_data - PADDING / 4, data[i] - PADDING / 4, PADDING / 4, PADDING / 4, color = hex_colors.stats, marker = 0, fill = true);
  }
};

var drawDataWithFigures = function drawDataWithFigures(canvas) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var space_markers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  drawFigureOnCanvas(canvas, space_markers.x * 2, axis.y, space_markers.x, data, color = hex_colors.stats, marker = 4, fill = true);
};

var pushTableData = function pushTableData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var HTML_obj = "<div>";

  var cleaned_category = _toConsumableArray(category);

  if (cleaned_category.includes("_")) {
    cleaned_category[cleaned_category.indexOf("_")] = " ";
  }

  cleaned_category = cleaned_category.join("");
  cleaned_category = cleaned_category.replace(/\w\S*/g, function (w) {
    return w.replace(/^\w/, function (c) {
      return c.toUpperCase();
    });
  });
  HTML_obj += "<div class=\"t__category\">".concat(cleaned_category, "</div>");
  data.forEach(function (e) {
    return HTML_obj += "<div class=\"t__data\">".concat(e, "</div>");
  });
  HTML_obj += "</div>";
  table_functions.innerHTML += HTML_obj;
};

window.onload = function () {
  var num_arr = [];

  for (var i = 0; i <= NUM_OPERATIONS; i += NUM_INCREMENT) {
    num_arr.push(i);
  }

  if (!min_screen_width.matches) {
    pushTableData(num_arr, "x");
  }

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
      x: element.axis.x / (TOTAL_OPERATIONS + 2),
      y: element.axis.y / 11
    };
    element["data"] = getBoxFunctions(key);
    element["val_y_marker"] = calcValYMarker(element.data, element.space_markers.y);
    element["canvas_data"] = element.data.map(function (num) {
      return -(num / (element.val_y_marker / element.space_markers.y)) + (element.height - PADDING);
    });
    element.html.width = element.width;
    element.html.height = element.height;
    labels_canvas["".concat(key)].innerHTML = "<strong>La Medida de cada Marca en el Eje Y es de: ".concat(element.val_y_marker, "</strong>");

    if (min_screen_width.matches) {
      pushTableData(num_arr, "x");
    }

    pushTableData(element.data, key); // drawDataWithFigures(element.obj, element.canvas_data, element.axis, element.space_markers);
    // drawDataWithSquares(element.obj, element.canvas_data, element.axis, element.space_markers);

    drawDataWithLines(element.obj, element.canvas_data, element.axis, element.space_markers);
    drawAxis(element.obj, element.axis, element.space_markers);
  });
  Object.entries(btns_canvas).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        obj = _ref4[1];

    obj.onclick = function (e) {
      if (e.target.className === "button") {
        var functionName = e.target.innerHTML.split(/\s[Gg]raph/).join("");

        if (functionName === "Area") {
          obj_canvas["".concat(key)].obj.clearRect(0, 0, obj_canvas["".concat(key)].width, obj_canvas["".concat(key)].height);
          drawDataWithFigures(obj_canvas["".concat(key)].obj, obj_canvas["".concat(key)].canvas_data, obj_canvas["".concat(key)].axis, obj_canvas["".concat(key)].space_markers);
          drawAxis(obj_canvas["".concat(key)].obj, obj_canvas["".concat(key)].axis, obj_canvas["".concat(key)].space_markers);
        } else if (functionName === "Squares") {
          obj_canvas["".concat(key)].obj.clearRect(0, 0, obj_canvas["".concat(key)].width, obj_canvas["".concat(key)].height);
          drawDataWithSquares(obj_canvas["".concat(key)].obj, obj_canvas["".concat(key)].canvas_data, obj_canvas["".concat(key)].axis, obj_canvas["".concat(key)].space_markers);
          drawAxis(obj_canvas["".concat(key)].obj, obj_canvas["".concat(key)].axis, obj_canvas["".concat(key)].space_markers);
        } else {
          obj_canvas["".concat(key)].obj.clearRect(0, 0, obj_canvas["".concat(key)].width, obj_canvas["".concat(key)].height);
          drawDataWithLines(obj_canvas["".concat(key)].obj, obj_canvas["".concat(key)].canvas_data, obj_canvas["".concat(key)].axis, obj_canvas["".concat(key)].space_markers);
          drawAxis(obj_canvas["".concat(key)].obj, obj_canvas["".concat(key)].axis, obj_canvas["".concat(key)].space_markers);
        }
      }
    };
  });
};
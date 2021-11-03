const obj_canvas = {
  large: { html: document.getElementById("canvas_large") },
  width: { html: document.getElementById("canvas_width") },
  area_cut: { html: document.getElementById("canvas_area_cut") },
  area_paper: { html: document.getElementById("canvas_area_paper") },
  area_base: { html: document.getElementById("canvas_area_base") },
  volume: { html: document.getElementById("canvas_volume") }
};

const hex_colors = {
  axis: "#000055",
  stats: "#3c3cff"
};

const NUM_OPERATIONS = 10;
const NUM_INCREMENT = 0.5;
const TOTAL_OPERATIONS = 21;
const PADDING = 20;

const boxFunctions = {
  large: (x) => -(2 * x) + 24,
  width: (x) => -(2 * x) + 20,
  area_cut: (x) => 4 * (x ** 2),
  area_paper: (x) => -(4 * (x ** 2)) + 480,
  area_base: (x) => (4 * (x ** 2)) - (88 * x) + 480,
  volume: (x) => (4 * (x ** 3)) - (88 * (x ** 2)) + (480 * x)
};

const getBoxFunctions = (key) => {
  let function_data = [];

  for (let i = 0; i <= NUM_OPERATIONS; i += NUM_INCREMENT) {
    function_data.push( boxFunctions[`${key}`](i) );
  }

  return function_data;
};

const calcValYMarker = (data=[], space_y_marker) => {
  let greater_num = 0;
  
  data.forEach(num => { if (num > greater_num) { greater_num = num; } });
  
  let val_y_marker = (greater_num / 10) / space_y_marker;
  return val_y_marker;
};

const numberToCloserZero = (num=0) => {
  let num_to_zero = num;
  if (num_to_zero > 0) {
    num_to_zero = num_to_zero.toString().split("");
    num_to_zero[num_to_zero.length - 1] = 0;
    num_to_zero = num_to_zero.join("");
    num_to_zero = parseInt(num_to_zero);
  }
  return num_to_zero;
};

const drawLineOnCanvas = (canvas, xi, yi, xf, yf, color="#000000", marker=2) => {
  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.lineWidth = marker;
  canvas.moveTo(xi, yi);
  canvas.lineTo(xf, yf);
  canvas.stroke();
  canvas.closePath();
};

const drawSquareOnCanvas = (canvas, xi, yi, w, h, color="#00000", marker=1, fill=false) => {
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

const drawAxis = (canvas, axis={}, space_markers={}) => {
  drawLineOnCanvas(canvas, axis.x, axis.y, PADDING, axis.y, color=hex_colors.axis, marker=4);
  drawLineOnCanvas(canvas, PADDING, axis.y, PADDING, PADDING, color=hex_colors.axis, marker=4);
  
  for (let xi_marker = space_markers.x; xi_marker <= axis.x; xi_marker += space_markers.x) {
    drawSquareOnCanvas(canvas, xi_marker, (axis.y - (PADDING / 4)), 1, (PADDING / 2), color=hex_colors.axis, marker=2);
  }

  for (let yi_marker = axis.y; yi_marker > PADDING; yi_marker -= space_markers.y) {
    drawSquareOnCanvas(canvas, (PADDING - (PADDING / 4)), yi_marker, (PADDING / 2), 1, color=hex_colors.axis, marker=2);
  }

  drawSquareOnCanvas(canvas, (PADDING - (PADDING / 4)), (axis.y - (PADDING / 4)), (PADDING / 2), (PADDING / 2), color=hex_colors.axis, marker=2, fill=true);
};

const drawDataWithLines = (canvas, data=[], axis={}, space_markers={}) => {
  for (let x_data = space_markers.x * 2, i = 0; x_data <= axis.x; x_data += space_markers.x, i += 1) {
    drawLineOnCanvas(canvas, x_data, axis.y, x_data, data[i], color=hex_colors.stats, marker=5);
  }
};

window.onload = () => {
  Object.entries(obj_canvas).forEach(([key, element]) => {
    element[`obj`] = element.html.getContext("2d");
    element[`width`] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().width));
    element[`height`] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().height));
    element[`axis`] = {
       x: element.width - PADDING,
       y: element.height - PADDING,
    };
    element[`space_markers`] = {
      x: element.axis.x / (TOTAL_OPERATIONS + 1),
      y: element.axis.y / 11
    };
    element[`data`] = getBoxFunctions(key);
    element[`val_y_marker`] = calcValYMarker(element.data, element.space_markers.y);
    element[`canvas_data`] = element.data.map(num => - (num / element.val_y_marker) + (element.height - PADDING));

    element.html.width = element.width;
    element.html.height = element.height;

    drawAxis(element.obj, element.axis, element.space_markers);
    drawDataWithLines(element.obj, element.canvas_data, element.axis, element.space_markers);
  });
};
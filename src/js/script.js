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
const TOTAL_OPERATIONS = () => {
  let count = 0;
  for (let i = 0; i < NUM_OPERATIONS; i += NUM_INCREMENT) { count += 1; }
  return count;
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

const drawAxis = (canvas, canvas_width, canvas_height) => {
  const padding = 20;
  
  const yi_axis = canvas_height - padding;
  const xi_axis = canvas_width - padding;
  
  const space_x_markers = xi_axis / TOTAL_OPERATIONS() + 1;
  const space_y_markers = yi_axis / 10;

  drawLineOnCanvas(canvas, xi_axis, yi_axis, padding, yi_axis, color=hex_colors.axis, marker=4);
  drawLineOnCanvas(canvas, padding, yi_axis, padding, padding, color=hex_colors.axis, marker=4);
  
  for (let xi_marker = space_x_markers; xi_marker < xi_axis; xi_marker += space_x_markers) {
    drawSquareOnCanvas(canvas, xi_marker, (yi_axis - (padding / 4)), 1, (padding / 2), color=hex_colors.axis, marker=2);
  }

  for (let yi_marker = yi_axis; yi_marker > padding; yi_marker -= space_y_markers) {
    drawSquareOnCanvas(canvas, (padding - (padding / 4)), yi_marker, (padding / 2), 1, color=hex_colors.axis, marker=2);
  }

  drawSquareOnCanvas(canvas, (padding - (padding / 4)), (yi_axis - (padding / 4)), (padding / 2), (padding / 2), color=hex_colors.axis, marker=2, fill=true);
};

window.onload = () => {
  Object.entries(obj_canvas).forEach(([key, element]) => {
    element[`obj`] = element.html.getContext("2d");
    element[`width`] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().width));
    element[`height`] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().height));

    element.html.width = element.width;
    element.html.height = element.height;

    drawAxis(element.obj, element.width, element.height);
  });
};
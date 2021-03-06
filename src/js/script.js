const obj_canvas = {
  large: { html: document.getElementById("canvas_large") },
  width: { html: document.getElementById("canvas_width") },
  area_cut: { html: document.getElementById("canvas_area_cut") },
  area_paper: { html: document.getElementById("canvas_area_paper") },
  area_base: { html: document.getElementById("canvas_area_base") },
  volume: { html: document.getElementById("canvas_volume") }
};

const labels_canvas = {
  large: document.getElementById("label_large"),
  width: document.getElementById("label_width"),
  area_cut: document.getElementById("label_area_cut"),
  area_paper: document.getElementById("label_area_paper"),
  area_base: document.getElementById("label_area_base"),
  volume: document.getElementById("label_volume")
};

const btns_canvas = {
  large: document.getElementById("large_buttons"),
  width: document.getElementById("width_buttons"),
  area_cut: document.getElementById("area_cut_buttons"),
  area_paper: document.getElementById("area_paper_buttons"),
  area_base: document.getElementById("area_base_buttons"),
  volume: document.getElementById("volume_buttons")
};

const table_functions = document.getElementById("table_formulas");

const min_screen_width = window.matchMedia("(max-width: 655px)");

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

const calcValYMarker = (data=[]) => {
  let greater_num = 0;
  
  data.forEach(num => { if (num > greater_num) { greater_num = num; } });
  
  let val_y_marker = (greater_num / 10);
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

const drawFigureOnCanvas = (canvas, xi, yi, xf_increment, yf=[], color="#000000", marker=1, fill=false) => {
  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.lineWidth = marker;
  
  canvas.moveTo(xi, yi);
  for (let i = 0, xf = xi; i <= yf.length; i += 1, xf += xf_increment) {
    canvas.lineTo(xf, yf[i]);
  }
  canvas.lineTo((xf_increment * (yf.length + 1)), yi);
  canvas.lineTo(xi, yi);

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
  
  for (let xi_marker = space_markers.x * 2; xi_marker <= axis.x; xi_marker += space_markers.x) {
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

const drawDataWithSquares = (canvas, data=[], axis={}, space_markers={}) => {
  for (let x_data = space_markers.x * 2, i = 0; x_data <= axis.x; x_data += space_markers.x, i += 1) {
    drawSquareOnCanvas(canvas, (x_data - (PADDING / 4)), (data[i] - (PADDING / 4)), (PADDING / 4), (PADDING / 4), color=hex_colors.stats, marker=0, fill=true);
  }
};

const drawDataWithFigures = (canvas, data=[], axis={}, space_markers={}) => {
  drawFigureOnCanvas(canvas, space_markers.x * 2, axis.y, space_markers.x, data, color=hex_colors.stats, marker=4, fill=true);
} 

const pushTableData = (data=[], category="") => {
  let HTML_obj = `<div>`;
  
  let cleaned_category = [...category];
  if (cleaned_category.includes("_")) {
    cleaned_category[cleaned_category.indexOf("_")] = " ";
  }
  cleaned_category = cleaned_category.join("");
  cleaned_category = cleaned_category.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));


  HTML_obj += `<div class="t__category">${cleaned_category}</div>`;
  data.forEach(e => HTML_obj += `<div class="t__data">${e}</div>`);

  HTML_obj += `</div>`;

  table_functions.innerHTML += HTML_obj;
};

window.onload = () => {
  let num_arr = [];
  for (let i = 0; i <= NUM_OPERATIONS; i += NUM_INCREMENT) { num_arr.push(i); }

  if (!min_screen_width.matches) { pushTableData(num_arr, "x"); }

  Object.entries(obj_canvas).forEach(([key, element]) => {
    element[`obj`] = element.html.getContext("2d");
    element[`width`] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().width));
    element[`height`] = numberToCloserZero(Math.floor(element.html.getBoundingClientRect().height));
    element[`axis`] = {
       x: element.width - PADDING,
       y: element.height - PADDING,
    };
    element[`space_markers`] = {
      x: element.axis.x / (TOTAL_OPERATIONS + 2),
      y: element.axis.y / 11
    };
    element[`data`] = getBoxFunctions(key);
    element[`val_y_marker`] = calcValYMarker(element.data, element.space_markers.y);
    element[`canvas_data`] = element.data.map(num => - (num / (element.val_y_marker / element.space_markers.y)) + (element.height - PADDING));

    element.html.width = element.width;
    element.html.height = element.height;

    labels_canvas[`${key}`].innerHTML = `<strong>La Medida de cada Marca en el Eje Y es de: ${element.val_y_marker}</strong>`;
    if (min_screen_width.matches) { pushTableData(num_arr, "x"); }
    pushTableData(element.data, key);
    // drawDataWithFigures(element.obj, element.canvas_data, element.axis, element.space_markers);
    // drawDataWithSquares(element.obj, element.canvas_data, element.axis, element.space_markers);
    drawDataWithLines(element.obj, element.canvas_data, element.axis, element.space_markers);
    drawAxis(element.obj, element.axis, element.space_markers);
  });
  
  Object.entries(btns_canvas).forEach(([key, obj]) => {
    obj.onclick = (e) => {
      if (e.target.className === "button") {
        let functionName = e.target.innerHTML.split(/\s[Gg]raph/).join("");
        if (functionName === "Area") {
          obj_canvas[`${key}`].obj.clearRect(0, 0, obj_canvas[`${key}`].width, obj_canvas[`${key}`].height);
          drawDataWithFigures(obj_canvas[`${key}`].obj, obj_canvas[`${key}`].canvas_data, obj_canvas[`${key}`].axis, obj_canvas[`${key}`].space_markers);
          drawAxis(obj_canvas[`${key}`].obj, obj_canvas[`${key}`].axis, obj_canvas[`${key}`].space_markers);
        } else if (functionName === "Squares") {
          obj_canvas[`${key}`].obj.clearRect(0, 0, obj_canvas[`${key}`].width, obj_canvas[`${key}`].height);
          drawDataWithSquares(obj_canvas[`${key}`].obj, obj_canvas[`${key}`].canvas_data, obj_canvas[`${key}`].axis, obj_canvas[`${key}`].space_markers);
          drawAxis(obj_canvas[`${key}`].obj, obj_canvas[`${key}`].axis, obj_canvas[`${key}`].space_markers);
        } else {
          obj_canvas[`${key}`].obj.clearRect(0, 0, obj_canvas[`${key}`].width, obj_canvas[`${key}`].height);
          drawDataWithLines(obj_canvas[`${key}`].obj, obj_canvas[`${key}`].canvas_data, obj_canvas[`${key}`].axis, obj_canvas[`${key}`].space_markers);
          drawAxis(obj_canvas[`${key}`].obj, obj_canvas[`${key}`].axis, obj_canvas[`${key}`].space_markers);
        }
      }
    }
  });
};
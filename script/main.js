var yyy = document.getElementById('canva');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy);
listenToMouse(yyy);

/***/
function autoSetCanvasSize(canvas) {
  adjust();
  window.onresize = function () {
    adjust();
  }

  function adjust() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}



function listenToMouse(canvas) {
  var context = canvas.getContext('2d');
  var usingEraser = false;
  var mousingdown = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };

  yyy.onmousedown = function (a) {
    var x = a.clientX;
    var y = a.clientY;
    if (usingEraser) {
      mousingdown = true;
      context.clearRect(x, y, 10, 10);
    } else {
      mousingdown = true;
      lastPoint = {
        "x": x,
        "y": y
      };
    }
  }

  yyy.onmousemove = function (a) {
    var x = a.clientX;
    var y = a.clientY;
    if (usingEraser) {
      if (mousingdown) {
        context.clearRect(x, y, 10, 10);
      }
    } else {
      if (mousingdown) {
        var newPoint = {
          "x": x,
          "y": y
        };
        drawCircle(x, y, 3);
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    }
    eraser.onclick = function () {
      usingEraser = true;
      actions.className = 'actions x';
    }

    brush.onclick = function () {
      usingEraser = false;
      actions.className = 'actions';
    }
    
    yyy.onmouseup = function () {
      mousingdown = false;
    }

    function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      context.strokeStyle = 'black';
      context.moveTo(x1, y1); // 起点
      context.lineWidth = 5;
      context.lineTo(x2, y2); // 终点
      context.stroke();
      context.closePath();
    }

    function drawCircle(x, y, radius) {
      context.beginPath();
      context.fillStyle = 'black';
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }
}
/*画图*/
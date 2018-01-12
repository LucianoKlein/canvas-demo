var yyy = document.getElementById('canva');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy);
listenToUser(yyy);

var eraserEnabled = false;
var lineWidth = 5;

brush.onclick = function() {
  eraserEnabled = false;

  brush.classList.add('active');
  eraser.classList.remove('active');
}

clear.onclick = function() {
  clear.classList.add('bigger');
  context.clearRect(0, 0, yyy.width, yyy.height);
  setTimeout("clear.classList.remove('bigger');", 100);
}

eraser.onclick = function() {
  eraserEnabled = true;

  eraser.classList.add('active');
  brush.classList.remove('active');
}

black.onclick = function() {
  context.strokeStyle = 'black';
  black.classList.add('active');

  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}

red.onclick = function() {
  context.strokeStyle = 'red';
  red.classList.add('active');

  black.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}

green.onclick = function() {
  context.strokeStyle = 'green';
  green.classList.add('active');

  black.classList.remove('active');
  red.classList.remove('active');
  blue.classList.remove('active');
}

blue.onclick = function() {
  context.strokeStyle = 'blue';
  blue.classList.add('active');

  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
}

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

thin.onclick = function() {
  lineWidth = 5;
}

thick.onclick = function() {
  lineWidth = 10;
}

function listenToUser(canvas) {
  var context = canvas.getContext('2d');
  var mousingdown = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };

  canvas.addEventListener("touchstart", function (a) {
    var x = a.touches[0].clientX;
    var y = a.touches[0].clientY;
    if (eraserEnabled) {
      mousingdown = true;
      context.clearRect(x, y, 10, 10);
    } else {
      mousingdown = true;
      lastPoint = {
        "x": x,
        "y": y
      };
    }
  });

  canvas.addEventListener("touchmove", function (a) {
    var x = a.touches[0].clientX;
    var y = a.touches[0].clientY;
    if (eraserEnabled) {
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

    function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      context.moveTo(x1, y1); // 起点
      context.lineWidth = lineWidth;
      context.lineTo(x2, y2); // 终点
      context.stroke();
      context.closePath();
    }
    
    function drawCircle(x, y, radius) {
      context.beginPath();
      context.fillStyle = context.strokeStyle;
      context.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
      context.fill();
    }
  })

  canvas.addEventListener("touchend", function () {
    mousingdown = false;
  })

  /**
   * 下边无法执行
   
  canvas.ontouchstart = function () {
    console.log('开始摸我了');
  }

  canvas.ontouchmove = function () {
    console.log('边摸边动');
  }

  canvas.ontouchend = function () {
    console.log('摸完了');
  }
  */

  canvas.onmousedown = function (a) {
    var x = a.clientX;
    var y = a.clientY;
    if (eraserEnabled) {
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

  canvas.onmousemove = function (a) {
    var x = a.clientX;
    var y = a.clientY;
    if (eraserEnabled) {
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
      eraserEnabled = true;
      actions.className = 'actions x';
    }

    brush.onclick = function () {
      eraserEnabled = false;
      actions.className = 'actions';
    }

    function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      context.moveTo(x1, y1); // 起点
      context.lineWidth = lineWidth;
      context.lineTo(x2, y2); // 终点
      context.stroke();
      context.closePath();
    }

    function drawCircle(x, y, radius) {
      context.fillStyle = context.strokeStyle;
      context.beginPath();
      context.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
      context.fill();
    }
  }

  canvas.onmouseup = function () {
    mousingdown = false;
  }
}
/*画图*/
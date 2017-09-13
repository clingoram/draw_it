$(function () {
    // canvas
    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d'); // rendering context

    // add method 'click' to clean canvas
    let clearBTN = document.getElementById('clear').addEventListener('click', change);

    let mouse = { x: 0, y: 0 };
    // radius
    let radius = 5; // 半徑
    let dragging = false;

    let minRadius = 0.5;
    let maxRadius = 15;
    let interval = 1.5;
    let defalutRadius = 5;

    // radius control
    let radval = document.getElementById('radval');
    let addRad = document.getElementById('addRad');
    let increaseRad = document.getElementById('increaseRad');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Width:' + canvas.width + ' ' + 'Height:' + canvas.height);

    $('#clear').text('Clear');
    $('#addRad').text('+');
    $('#increaseRad').text('-');

    canvas.addEventListener('mousedown', runDo); 
    canvas.addEventListener('mouseout', unDo); 
    canvas.addEventListener('mousemove', startDraw);
    canvas.addEventListener('mouseup', unDo); 

    let leave = document.getElementById('about').addEventListener('click', left);
    function left() {
        alert("It WON'T be SAVED, are you sure you wanna LEAVE?");
    }

    // Canvas setting function
    function startDraw(e) {
        if (dragging === true) {
            context.lineCap = 'round'; // 畫筆線條
            context.lineJoin = 'miter'; // 轉折處線條
            context.lineTo(e.clientX, e.clientY); // 從目前繪圖點畫一條直線到指定的(x, y)座標點
            console.log('Your line style is' + ' ' + context.lineCap + '. Step 2');
            context.stroke(); // 畫出圖形的邊框
            context.beginPath(); // 產生一個新路徑，產生後再使用繪圖指令來設定路徑。 
            context.arc(0, 0, radius, 0, 2 * Math.PI / 2 ^ 2 * 5);

            context.fill();
            context.beginPath();
            context.moveTo(e.clientX, e.clientY);// 移動畫筆到指定的(x, y)座標點
        }
    }

    function runDo(e) {
        console.log('Running! Step 1');
        dragging = true;
        startDraw(e);
    }

    function unDo() {
        console.log('Un do! Step 3');
        dragging = false;
        context.beginPath();
    }

    let clear = false;
    let w= canvas.width - 100;
    let h = canvas.height - 100;
    function change() {
        clear = true;
        clean();
    }
    function clean() {
        
        if (clear === true) {
             console.log('Erase.............');
             context.fillStyle = 'white';
             context.beginPath();
             context.inkAmount = 0;

             context.fillRect(0, 0, canvas.width, canvas.width);
             context.fill();
             setSample({
                 target: document.getElementsByClassName('sample')[0]
            });
        }
        
    }

    // Clean canvas function
    function cleanCanvas() {
        context.fillStyle = 'white'; // fill with in white 
        context.fillRect(0, 0, canvas.width, canvas.width);
        setSample({
            target: document.getElementsByClassName('sample')[0]
        });
    }

    // radius control
    addRad.addEventListener('click', function () {
        settingRadius(radius + interval);
    });
    increaseRad.addEventListener('click', function () {
        settingRadius(radius - interval);
    });

    // setting radius
    function settingRadius(newRadius) {
        if (newRadius < minRadius) {
            newRadius = minRadius;
        } else if (newRadius > maxRadius) {
            newRadius = minRadius;
        }
        radius = newRadius;
        context.lineWidth = radius * 2;

        radval.innerHTML = radius;
    }
    settingRadius(defalutRadius);

    // color
    let colors = ['black', 'white ','gray', 'red', 'yellow', 'orange', 'green', 'blue'];

    for (var i = 0, c = colors.length; i < c; i++) {
        var sample = document.createElement('div');
        sample.className = 'sample';
        sample.style.backgroundColor = colors[i];
        sample.addEventListener('click', setSample);

        document.getElementById('color').appendChild(sample);
    }

    function setColor(color) {
        context.fillStyle = color;
        context.strokeStyle = color;
        var active = document.getElementsByClassName('active')[0];
        if (active) {
            active.className = 'sample';
        }
    }

    function setSample(e) {
        var sample = e.target;
        setColor(sample.style.backgroundColor);
        sample.className += ' active';
    }

    setSample({
        target: document.getElementsByClassName('sample')[0]
    });

});

// animation
$(document).scroll(function () {
    var scroll = $(this).scrollTop();
    if (scroll >= 150) {
        $('#popUp').css('margin-left', '-850px');
        $('#click').css('margin-left', '0px');
    }
});

$('#click').click(function () {
    $('#popUp').css('margin-left', '0px');
    $('#click').css('margin-left', '-850px');
});

$('.closeTab').click(function () {
    $('#popUp').css('margin-left', '-850px');
    $('#click').css('margin-left', '0px');
});

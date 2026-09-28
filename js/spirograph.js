const canvas = document.getElementById("spiroCanvas");
const ctx = canvas.getContext("2d");


const startButton = document.getElementById("startButton");
const error = document.getElementById("error");


// storing animation
let animationId;

startButton.addEventListener("click", drawSpirograph);


 /* // Add random color
function newColor() {


    const color =
    "#" + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

    ctx.strokeStyle = color;
}

*/


function drawSpirograph() {


    // stop previous drawing
    cancelAnimationFrame(animationId);

    // These are the values user inputs
    const R = Number(document.getElementById("R").value);
    const r = Number(document.getElementById("r").value);
    const O = Number(document.getElementById("O").value);



    // Vallidation for R
    if (R <50 || R > 150) {
        error.textContent = "R must be between 50 and 150.";
        return;
    }


     // Vallidation for r
    if (r <10 || r > 75) {
        error.textContent = "r must be between 10 and 75.";
        return;
    }


     // Vallidation for O
    if (O <0 || O > 75) {
        error.textContent = "O must be between 0 and 75.";
        return;
    }

    //clear previous error
    error.textContent = "";


    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // have default color

   ctx.lineWidth = 1;

    // Move the origin to the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;


    // have the startin value of t
    let t = 0;
    const maxT = 50;


    // Starting the x and y coordinates
    let x =
    (R + r) * Math.cos(t)
    - (r + O) * Math.cos(((R + r) / r) * t);


    let y =
    (R + r) * Math.sin(t)
    - (r + O) * Math.sin(((R + r) / r) * t);


    ctx.beginPath();


    ctx.moveTo(
        centerX + x,
        centerY + y
    );

    function draw() {

        // This is to save previous position
        const oldX = x;
        const oldY = y;

        //increase t
        t += 0.03;


        // Spirograph equation to new path
        x = 
        (R + r) * Math.cos(t)
        - (r + O) * Math.cos(((R + r) / r) * t); 


         y = 
        (R + r) * Math.sin(t)
        -( r + O) * Math.sin(((R + r) / r) * t);


        // Start new segment
        ctx.beginPath();

        // start at previous point
        ctx.moveTo(
            centerX + oldX,
            centerY + oldY
        );

        // Pick random Color/ will result in rainbow line segment
       // newColor();
        
        
        // Draw to new x,y location
        ctx.lineTo(
            centerX + x,
            centerY + y 
        );

        ctx.stroke();


        // Continue Drawing 
        if (t < maxT) {
           animationId = requestAnimationFrame(draw);
        } //else {

       //     startButton.disabled = false;

      //  }


    }

    //startButton.disabled = true;



    draw();
}
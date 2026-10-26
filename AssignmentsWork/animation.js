
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

    

// Starting position
let x = 50;
let y = 50;

// Square Size
let size = 40;

// Movement direction
let dx = 2;
let dy = 2;

// Colors
let color = "blue";
const colors = ["red", "green", "purple", "orange", "yellow", "brown", "cyan"];

// Shape
let shape = "square";

// Animation function
function animate() {

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the square
    x += dx;
    y += dy;

    // Check left and right boundaries
    if(x + size >= canvas.width) {
        x = canvas.width - size;
        dx = -Math.abs(dx);
    } else if (x <= 0) {
        x = 0;
        dx = Math.abs(dx);
    }

    // check top and bottom boundaries
    if(y + size >= canvas.height) {
        y = canvas.height - size;
        dy = -Math.abs(dy);
    } else if (y <= 0) {
        y = 0;
        dy = Math.abs(dy);
    }

    
    // draw the square
ctx.fillStyle = color;

if (shape === "square") {

  ctx.fillRect(x, y, size, size);
} else if (shape === "circle") {

    // draw a circle
    ctx.beginPath();
    ctx.arc(
    x + size / 2,
    y + size / 2,
    size / 2,
    0,
    Math.PI * 2
    );
    ctx.fill();
} else if (shape === "triangle") {

    //Draw triangle
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
    ctx.fill();
}

    // Repeat animation
requestAnimationFrame(animate);
}

animate();

canvas.addEventListener("click", function(event) {

    const rect = canvas.getBoundingClientRect();
    
    const mouseX = (event.clientX - rect.left) * canvas.width / rect.width;
    const mouseY = (event.clientY - rect.top) * canvas.height / rect.height;

    // Change to random color
    if (mouseX >= x && mouseX <= x + size &&
        mouseY >= y && mouseY <= y + size) {

            let randomIndex = Math.floor(Math.random() * colors.length);
            color = colors[randomIndex];
        

        // Change the shape
        if (shape === "square") {
            shape = "circle";

        } else if (shape === "circle") {
            shape = "triangle";
        
        
        } else {
            shape = "square";
        }

    }

});


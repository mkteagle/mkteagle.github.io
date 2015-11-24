var
    canvas,
    renderingContext,
    width,
    height,

    foregroundPosition = 0,
    frames = 0, // Counts the number of frames rendered.

// The playable turkey character
    turkey,
    title,
    start,
    score = 0,
    forks,

// State vars
    currentState,

// Our game has three states: the splash screen, gameplay, and the score display.
    states = {
        Splash: 0,
        Game: 1,
        Score: 2
    };

localStorage.setItem("bestScore", 0);
/**
 * turkey class. Creates instances of turkey.
 * @constructor
 */
function Turkey() {
    this.x = 140;
    this.y = 0;

    this.frame = 0;
    this.velocity = 0;
    this.animation = [0, 1, 2, 1]; // The animation sequence

    this.rotation = 0;
    this.radius = 12;

    this.gravity = 0.25;
    this._jump = 4.6;

    /**
     * Makes the turkey jump
     */
    this.jump = function () {
        this.velocity = -this._jump;
    };

    /**
     * Update sprite animation and position of turkey
     */
    this.update = function () {
        // Play animation twice as fast during game state
        var n = currentState === states.Splash ? 10 : 5;

        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;

        if (currentState === states.Splash) {
            this.updateIdleTurkey();
        } else { // Game state
            this.updatePlayingTurkey();
        }
    };

    /**
     * Runs the turkey through its idle animation.
     */
    this.updateIdleTurkey = function () {
        this.y = height - 280 + 5 * Math.cos(frames / 10);
        this.rotation = 0;
    };

    /**
     * Determines turkey animation for the player-controlled turkey.
     */
    this.updatePlayingTurkey = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Change to the score state when turkey touches the ground
        if (this.y >= height - foregroundSprite.height - 10) {
            this.y = height - foregroundSprite.height - 10;

            if (currentState === states.Game) {
                currentState = states.Score;
            }

            this.velocity = this._jump; // Set velocity to jump speed for correct rotation
        }
        if (this.y <= 500 - (height)) {
            if (currentState === states.Game) {
                currentState = states.Score;
            }

            this.velocity = this._jump; // Set velocity to jump speed for correct rotation

        }

        // When turkey lacks upward momentum increment the rotation angle
        if (this.velocity >= this._jump) {
            this.frame = 1;
            this.rotation = Math.min(Math.PI / 2, this.rotation + 0.3);
        } else {
            this.rotation = -0.3;
        }
    };

    /**
     * Draws turkey to canvas renderingContext
     * @param  {CanvasRenderingContext2D} renderingContext the context used for drawing
     */
    this.draw = function (renderingContext) {
        renderingContext.save();

        // translate and rotate renderingContext coordinate system
        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);

        var n = this.animation[this.frame];

        // draws the turkey with center in origo
        turkeySprite[n].draw(renderingContext, -turkeySprite[n].width / 2, -turkeySprite[n].height / 2);

        renderingContext.restore();
    };
}
function Forks () {

}
/**
 * Called on mouse or touch press. Update and change state depending on current game state.
 * @param  {MouseEvent/TouchEvent} evt - the onpress event
 */
function Sp() {
    this.draw = function (renderingContext) {
        renderingContext.save();
        // translate and rotate renderingContext coordinate system
        renderingContext.translate(this.x, this.y);
        renderingContext.restore();
    };
}
$(document).keydown(function(e){
    if (e.keyCode == 38)
        alert( "arrowkey pressed" );
});
function onpress(evt) {
    switch (currentState) {
        case states.Splash: // Start the game and update the turkey velocity.
            currentState = states.Game;

            turkey.jump();
            break;

        case states.Game: // The game is in progress. Update turkey velocity.
            turkey.jump();
            break;

        case states.Score: // Change from score to splash state if event within okButton bounding box
            // Get event position
            var mouseX = evt.offsetX, mouseY = evt.offsetY;

            if (mouseX == null || mouseY == null) {
                mouseX = evt.touches[0].clientX;
                mouseY = evt.touches[0].clientY;
            }

            // Check if within the okButton
            if (okButton.x < mouseX && mouseX < okButton.x + okButton.width &&
                okButton.y < mouseY && mouseY < okButton.y + okButton.height
            ) {
                forks.reset();
                currentState = states.Splash;
                score = 0;
            }
            break;
    }
}

/**
 * Sets the canvas dimensions based on the window dimensions and registers the event handler.
 */
function windowSetup() {
    // Retrieve the width and height of the window
    width = window.innerWidth;
    height = window.innerHeight;

    // Set the width and height if we are on a display with a width > 500px (e.g., a desktop or tablet environment).
    var inputEvent = "touchstart";
    if (width >= 600) {
        width = 600;
        height = 500;
        inputEvent = "mousedown";
    }

    // Create a listener on the input event.
    document.addEventListener(inputEvent, onpress);
}

/**
 * Creates the canvas.
 */
function canvasSetup() {
    canvas = document.createElement("canvas");
    canvas.style.border = "15px solid #FF9B34";

    canvas.width = width;
    canvas.height = height;

    renderingContext = canvas.getContext("2d");
}

function loadGraphics() {
    // Initiate graphics and ok button
    var img = new Image();
    img.src = "img/sheet.png";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = backgroundSprite.color;

        okButton = {
            x: (width - okButtonSprite.width) / 2,
            y: height - 200,
            width: okButtonSprite.width,
            height: okButtonSprite.height
        };
        title.draw(renderingContext);
        gameLoop();
    };

}
function ForkCollection() {
    this._forks = [];

    /**
     * Empty corals array
     */
    this.reset = function () {
        this._forks = [];
    };

    /**
     * Creates and adds a new Coral to the game.
     */
    this.add = function () {
        this._forks.push(new Fork()); // Create and push coral to array
    };

    /**
     * Update the position of existing forks and add new forks when necessary.
     */
    this.update = function () {
        if (frames % 100 === 0) { // Add a new fork to the game every 100 frames.
            this.add();
        }

        for (var i = 0, len = this._forks.length; i < len; i++) { // Iterate through the array of corals and update each.
            var fork = this._forks[i]; // The current fork.

            if (i === 0) { // If this is the leftmost coral, it is the only coral that the fish can collide with . . .
                fork.detectCollision(); // . . . so, determine if the fish has collided with this leftmost fork.
            }

            fork.x -= 2; // Each frame, move each fork two pixels to the left. Higher/lower values change the movement speed.
            if (fork.x < -fork.width) { // If the coral has moved off screen . . .
                this._forks.splice(i, 1); // . . . remove it.
                i--;
                len--;
            } // if turkey has reached it past the fork than increment score.
            if (fork.x - 10 == turkey.x) {
                score++;
            }
        }
    };

    /**
     * Draw all forks to canvas context.
     */
    this.draw = function () {
        for (var i = 0, len = this._forks.length; i < len; i++) {
            var fork = this._forks[i];
            fork.draw();
        }
    };
}

/**
 * The Fork class. Creates instances of Fork.
 */
function Fork() {
    this.x = 500;
    this.y = height - (bottomObstacleSprite.height + foregroundSprite.height + 120 + 200 * Math.random());
    this.width = bottomObstacleSprite.width;
    this.height = bottomObstacleSprite.height;

    /**
     * Determines if the turkey has collided with the Fork.
     * Calculates x/y difference and use normal vector length calculation to determine
     */
    this.detectCollision = function () {
// intersection
        var cx = Math.min(Math.max(turkey.x, this.x), this.x + this.width);
        var cy1 = Math.min(Math.max(turkey.y, this.y), this.y + this.height);
        var cy2 = Math.min(Math.max(turkey.y, this.y + this.height + 110), this.y + 2 * this.height + 80);
// Closest difference
        var dx = turkey.x - cx;
        var dy1 = turkey.y - cy1;
        var dy2 = turkey.y - cy2;
// Vector length
        var d1 = dx * dx + dy1 * dy1;
        var d2 = dx * dx + dy2 * dy2;
        var r = turkey.radius * turkey.radius;
// Determine intersection
        if (r > d1 || r > d2) {
            currentState = states.Score;
        }
    };

    this.draw = function () {
        bottomObstacleSprite.draw(renderingContext, this.x, this.y);
        topObstacleSprite.draw(renderingContext, this.x, this.y + 110 + this.height);
    }
}
/**
 * Initiates the game.
 */
function main() {
    windowSetup();
    canvasSetup();

    currentState = states.Splash; // Game begins at the splash screen.

    document.body.appendChild(canvas); // Append the canvas we've created to the body element in our HTML document.

    turkey = new Turkey();
    title = new Sp();
    start = new Sp();
    forks = new ForkCollection();

    loadGraphics();
}

/**
 * The game loop. Update and render all sprites before the window repaints.
 */
function gameLoop() {
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}
/**
 * Updates all moving sprites: foreground, turkey, and corals
 */
function update() {
    frames++;

    if (currentState === states.Game) {
        forks.update();
        foregroundPosition = (foregroundPosition - 2) % 600;
    }
    turkey.update();
}


/**
 * Re-draw the game view.
 */
function render() {
    // Draw background color
    renderingContext.fillRect(0, 0, width, height);

    // Draw backround sprites
    backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
    backgroundSprite.draw(renderingContext, backgroundSprite.width, height - backgroundSprite.height);

    forks.draw(renderingContext);
    turkey.draw(renderingContext);


    // Draw foreground sprites
    foregroundSprite.draw(renderingContext, foregroundPosition, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);

    if (currentState == states.Splash) {
        titleSprite.draw(renderingContext, 90, 100);
        okButtonSprite.draw(renderingContext, 200, 300);
    }
    if (currentState == states.Game) {
        renderingContext.font = "30px Comic Sans MS";
        renderingContext.textAlign = "center";
        renderingContext.fillText("" + score, 520, 85);
    }
    if (currentState == states.Score) {
        if (score > localStorage.bestScore) {
            localStorage.setItem("bestScore", score);
        }
        gameoverSprite.draw(renderingContext, 110, 110);
        overOKSprite.draw(renderingContext, 200, 300);
        renderingContext.fillText("Score: " + score, 209, 225);
        renderingContext.fillText("Best: " + localStorage.bestScore, 200, 260);
    }
}

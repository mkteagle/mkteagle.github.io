//Javascript Document

// sprite variables
var
    turkeySprite,
    backgroundSprite,
    foregroundSprite,
    bottomObstacleSprite,
    topObstacleSprite,
    gameoverSprite,
    textSprites,
    titleSprite,
    okButtonSprite,
    fTX = 100,
    fTY = 260,
    fTW = 228,
    fTH = 30,
    gOX = 119,
    gOY = 295,
    gOW = 174,
    gOH = 47,
    oBX = 158,
    oBY = 399,
    oBW = 116,
    oBH = 32,
    overOKSprite;


// sprite constructor
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x * 2;
    this.y = y * 2;
    this.width = width * 2;
    this.height = height * 2;
}

// define draw method (prototype)
Sprite.prototype.draw = function (renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);

};
// initialize sprites
function initSprites(img) {
    turkeySprite = [
        new Sprite(img, 0, 0, 66, 46),
        new Sprite(img, 0, 56, 66, 46),
        new Sprite(img, 0, 102, 66, 46)
    ];
    //backgroundSprite.color = "#ABE1EE";
    backgroundSprite = new Sprite(img, 67, 0, 300, 246);
    foregroundSprite = new Sprite(img, 67, 341, 299, 35);
    okButtonSprite = new Sprite(img, oBX, oBY, oBW, oBH);
    titleSprite = new Sprite(img, fTX, fTY, fTW, fTH);
    bottomObstacleSprite = new Sprite(img, 376, 0, 49, 218);
    topObstacleSprite = new Sprite(img, 436, 0, 49, 218);
    gameoverSprite = new Sprite(img, gOX, gOY, gOW, gOH);
    overOKSprite = new Sprite(img, 415, 255, 48, 21);

    //textSprites = {
    //    floppyTurkey: new Sprite(img, 59, 114, 96, 22),
    //    gameOver: new Sprite(img, 59, 136, 94, 19),
    //    getReady: new Sprite(img, 59, 155, 87, 22)
    //
    //};
}
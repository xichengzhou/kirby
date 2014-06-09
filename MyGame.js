/*
    TGE SPRITESHEETANIMATION OBJECTS TUTORIAL
    This file demonstrates how to create, setup and control SpriteSheetAnimation
    objects. In this file we are loading a spritesheet image and using it to
    create a SpriteSheetAnimation object. We will also create some buttons that
    will help illustrate the animation controls.
 */
MyGame = function()
{
    //Main game constructor
    MyGame.superclass.constructor.call(this);

    //Load the spriteseet image we are using for our animated sprite
    var gameAssets = [
        {id:'spriteSheetImg',   url:'images/running.png'},
        {id:'spriteSheetImg2',   url:'images/star.png'},
        {id:'spriteSheetImg3',   url:'images/worry.png'},
        {id:'back',   url:'images/back2.jpg'},

    ];
    this.assetManager.assignImageAssetList("required", gameAssets);

    //These are default placeholder values for the buttons that will be using
   

    //Go to the GameScreen after loading
    TGE.FirstGameWindow = GameScreen;
}

//MyGame functions
MyGame.prototype =
{
    //No global functions in this tutorial
}
extend(MyGame,TGE.Game);
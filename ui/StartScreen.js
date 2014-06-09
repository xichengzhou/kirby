StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);

	this.backgroundColor = "#CD9B00";
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Game Start ",
        x:200,
        y:100,
        pressFunction:this.newgame.bind(this)
        
    }));
}

StartScreen.prototype = {

	newgame : function() {
		this.transitionToWindow({
			windowClass : GameScreen,
			//fadeTime : 0.75
		});
	}	
}

extend(StartScreen, TGE.Window);
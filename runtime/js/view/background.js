var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var cloud;
        var cloud2;
        var buildings = [];
        var building;
        // ANIMATION VARIABLES HERE:
        
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
           

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill;
            var img = draw.bitmap('img/solaire.jpg');
            background.addChild(img);
            
            var floorFill = draw.bitmap('img/desert.png');
            floorFill.y = groundY -75;
            background.addChild(floorFill);
            


            
            //TODO: 3 - Add a moon and starfield
            var shape = draw.bitmap('img/sun pie.png');
                shape.x= 100;
                shape.y = 10;
                background.addChild(shape);
                
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            // var buildingHeight = 300;
            // for(var i = 0; i < 5; i++) {
            //     building = draw.rect(75, buildingHeight, 'LightGray', 'Black', 1);
            //     building.x = 200*i;
            //     building.y = groundY  - buildingHeight;
                
            //     background.addChild(building);
            //     buildings.push(building);
            // }
            
             // TODO 4: Part 1 - Add a tree
             
                cloud = draw.bitmap('img/cloud.png');
                cloud.width = canvasWidth;
                cloud.y = 0;
                background.addChild(cloud);
        
                cloud2 = draw.bitmap('img/cloud.png');
                cloud2.x = canvasWidth / 2;
                cloud2.y = 0;
                background.addChild(cloud2);
        }
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
           
            
            // TODO 4: Part 2 - Move the tree!
            
            cloud.x = cloud.x - 1.5;
            if(cloud.x < -500) {
                cloud.x = canvasWidth / 2;
            }
            cloud2.x = cloud2.x - 1;
            if(cloud2.x < -600) {
                cloud2.x = canvasWidth / 3;
            }
            
            // TODO 5: Part 2 - Parallax
            for(var i = 0 ; i < buildings.length ; i++) {
                var eachBuilding;
                eachBuilding = buildings[i];
                eachBuilding.x = buildings[i].x - 1;
                if(eachBuilding.x < -150) {
                    buildings[i].x = canvasWidth;
                }
            }    
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

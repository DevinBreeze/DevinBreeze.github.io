var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                
                {type: 'sawblade',x:800,y:groundY -120},
                {type: 'sawblade',x:400,y:groundY -0},
                {type: 'sawblade',x:1200,y:groundY -120},
                {type: 'sawblade',x:1400,y:groundY -0},
                {type: 'sawblade',x:1800,y:groundY -120},
                {type: 'sawblade',x:2200,y:groundY -0},
                {type: 'sawblade',x:2800,y:groundY -120},
                {type: 'sawblade',x:3000,y:groundY -0},
                {type: 'enemy', x:400,y:groundY -50},
                {type: 'enemy', x:1200,y:groundY -50},
                {type: 'enemy', x:2000,y:groundY -50},
                {type: 'enemy', x:2500,y:groundY -50},
                {type: 'enemy', x:2800,y:groundY -50},
                {type: 'enemy', x:3200,y:groundY -50},
                {type: 'flask', x:650,y: groundY -150},
                {type: 'flask', x:1000,y:groundY -150},
                {type: 'flask', x:1500,y: groundY -150},
                {type: 'flask', x:3000,y:groundY -150},
                {type: 'flask', x:2000,y: groundY -150},
                {type: 'flask', x:2200,y:groundY -150},
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        
        
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            
            var obstacleImage = draw.bitmap('img/star.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -50;
            obstacleImage.y = -50;
            
        };  


        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            var type = gameItem.type;
            if (type === 'sawblade') {
                createSawBlade(gameItem.x, gameItem.y);
            }
            else if (type === 'enemy') {
                createEnemy(gameItem.x, gameItem.y);
            }
            else if (type === 'flask') {
                createFlask(gameItem.x, gameItem.y);
            }
        }
        
        function createEnemy (x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/red-eye-orb.png');
            
            redSquare.x = -50;
            redSquare.y = -50;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            
            enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-30);
            };
            
            enemy.onProjectileCollision = function(){
            game.increaseScore(1666);
            console.log('halle hit the enemy');
            enemy.fadeOut();
            };
        }
        
        function createFlask (x, y) {
            var flask =  game.createGameItem('flask',25);
            var redSquare = draw.bitmap('img/flask.png');
            
            redSquare.x = -25;
            redSquare.y = -25;
            flask.addChild(redSquare);
            flask.x = x;
            flask.y = y;
            game.addGameItem(flask);
            flask.velocityX = -1;
            
            flask.onPlayerCollision = function() {
                console.log('Halle got a flask!');
                game.changeIntegrity(15);
                flask.fadeOut();
            };
        }
        
    }   
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
/**
 * Created by eljeffe on 9/20/14.
 */
var brain = {
    init: function() {
        console.log('log');
        brain.game = new Phaser.Game(600, 600, Phaser.AUTO, 'grid-canvas', { preload: brain.preload, create: brain.create, update: brain.update });
    },
    preload: function () {
        brain.game.load.image('bg', 'images/allblack.jpg');
        brain.game.load.spritesheet('testSprite', 'images/testSprite.png', 16, 16);
        brain.game.load.spritesheet('testSprite', 'images/testSprite.png');

    },
    create: function () {

        brain.game.physics.startSystem(Phaser.Physics.ARCADE);

        brain.game.add.sprite(0, 0, 'testSprite');

        // GRID SQUARES

        brain.gridSquares = brain.game.add.group();

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                brain.square = brain.gridSquares.create(j * 10, i, 'square');
            }
        }

        brain.player1 = brain.game.add.sprite(20, 20, 'p1');

        // PLAYER1

        brain.game.arcade.enable(brain.player1);

        brain.player1.body.collideWorldBounds = true;

//        brain.player1.animations.add('left', [0, 1, 2, 3], 10, true);
//
//        brain.player1.animations.add('right', [4, 5, 6, 7], 10, true);
//
//        brain.player1.animations.add('up', [8, 9, 10, 11], 10, true);
//
//        brain.player1.animations.add('down', [12, 13, 14, 15], 10, true);

        brain.cursors = brain.game.input.keyboard.createCursorKeys();

        brain.changeSquareColor = function(gridSquares) {
            debugger;
        };

        brain.triggerCheck = function() {
            return brain.cursors.SPACEBAR.isDown();
        };

    },
    update: function () {

        brain.player1.body.velocity.x = 0;
        brain.player1.body.velocity.y = 0;

        if (brain.cursors.left.isDown) {
            brain.player1.body.x -= 100;
//            brain.player1.animations.play('left');
        }
        else if (brain.cursors.right.isDown) {
            brain.player1.body.x += 100;
//            brain.player1.animations.play('right');
        }
        else if (brain.cursors.up.isDown) {
            brain.player1.body.y -= 100;
//            brain.player1.animations.play('up');
        }
        else if (brain.cursors.down.isDown) {
            brain.player1.body.y += 100;
//            brain.player1.animations.play('down');
        }
        else {
            brain.player1.animations.stop();
//            brain.player1.frame = 4
        }

        brain.game.physics.arcade.overlap(brain.player1, brain.gridSquares, brain.changeSquareColor, brain.triggerCheck);

    }
};
/**
 * Created by eljeffe on 9/20/14.
 */
var brain = {
    init: function() {
        var canvas = document.getElementById('grid-display');
        console.log('log');
        brain.game = new Phaser.Game(600, 600, Phaser.AUTO, canvas, { preload: brain.preload, create: brain.create, update: brain.update });
    },
    preload: function () {
        brain.game.load.image('bg', 'images/allblack.jpg');
        brain.game.load.image('grid', 'images/star.png');
        brain.game.load.image('change', 'images/firstaid.png');
        brain.game.load.image('dude', 'images/diamond.png');
//        brain.game.load.spritesheet('dude', 'images/dude.png');

    },
    create: function () {

        brain.game.physics.startSystem(Phaser.Physics.ARCADE);

        // GRID SQUARES

        brain.gridSquares = brain.game.add.group();

        brain.gridSquares.enableBody = true;

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                brain.square = brain.gridSquares.create(j * 140, i * 140, 'grid');
            }
        }

        // PLAYER1

        brain.player1 = brain.game.add.sprite(10, 10, 'dude');

        brain.game.physics.arcade.enable(brain.player1);

        brain.player1.body.collideWorldBounds = true;

//        brain.player1.animations.add('left', [0, 1, 2, 3], 10, true, false);
//
//        brain.player1.animations.add('right', [4, 5, 6, 7], 10, true, false);

//        brain.player1.animations.add('up', [0, 1, 2, 3], 10, true);
//
//        brain.player1.animations.add('down', [0, 1, 2, 3], 10, true);

        brain.cursors = brain.game.input.keyboard.createCursorKeys();

        brain.spaceBar = brain.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        brain.changeSquareColor = function(player1, gridSquares) {
            console.log('HIT');
            console.log(gridSquares);
            gridSquares.key = 'change';
        };

        brain.triggerCheck = function() {
            console.log('checking spacebar state');
            return brain.spaceBar.isDown();
        };

    },
    update: function () {

        brain.player1.body.velocity.x = 0;
        brain.player1.body.velocity.y = 0;

        if (brain.cursors.left.isDown) {
            brain.player1.body.x -= 10;
//            brain.player1.animations.play('left');
        }
        else if (brain.cursors.right.isDown) {
            brain.player1.body.x += 10;
//            brain.player1.animations.play('right');
        }
        else if (brain.cursors.up.isDown) {
            brain.player1.body.y -= 10;
//            brain.player1.animations.play('left');
        }
        else if (brain.cursors.down.isDown) {
            brain.player1.body.y += 10;
//            brain.player1.animations.play('right');
        }
        else if (brain.spaceBar.isDown){
            brain.game.physics.arcade.overlap(brain.player1, brain.gridSquares, brain.changeSquareColor);
        }
        else {
            brain.player1.animations.stop();
            brain.player1.frame = 4
        }



    }
};
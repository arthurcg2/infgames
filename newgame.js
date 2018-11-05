let map,layer;
let player,cursors;
let mainState = {
  preload: function(){
    this.load.tilemap('map', 'assets/tiles/tilemap.tmx');
    this.load.image('tileset', 'assets/tiles/tileset.png');
    this.load.image('player', 'assets/tiles/tilesnd.png');
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    this.physics.arcade.gravity.y = 700;

    map = this.add.tilemap('map', 64, 64);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();

    player = this.add.sprite(0,0,'player');
    game.physics.arcade.enable(player);
    player.checkWorldBounds = true;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    },
  update: function(){
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
      player.body.velocity.x = -500;
    else if (cursors.right.isDown)
      player.body.velocity.x = 500;
    else
      player.body.velocity.x = 0;
  },
};
let game = new Phaser.Game(1050, 640, Phaser.AUTO, "gameDiv");
game.state.add('main', mainState);
game.state.start('main');

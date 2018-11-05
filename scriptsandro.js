$(function(){
  let imgSrc = 'assets/';
  let sandro;let bullet;let bullets;let enemy;let enemies;let score;let lifes;let gnu;let bill;let envel = 130, explosion, shoot, invkill;
  let mainState = {
    preload: function(){
      game.load.image('background', imgSrc+'background.png');
      game.load.image('sandro', imgSrc+'sandrox.png');
      game.load.image('bullet', imgSrc+'bullet.png');
      game.load.image('enemy', imgSrc+'wndws.png');
      game.load.image('gnu', imgSrc+'GNU.png');
      game.load.image('bill', imgSrc+'bill.png');
      game.load.audio('explosion', imgSrc+'explosion.wav');
      game.load.audio('shoot', imgSrc+'shoot.wav');
      game.load.audio('killed', imgSrc+'invaderkilled.wav');
    },

    create: function(){
      game.add.image(0,0,'background');
      explosion = game.add.audio('explosion');
      shoot = game.add.audio('shoot');
      invkill = game.add.audio('killed');

      sandro = game.add.sprite(300, 570,'sandro');
      sandro.anchor.setTo(1, 0.5);
      game.physics.arcade.enable(sandro);
      sandro.checkWorldBounds = true;
      sandro.body.collideWorldBounds=true;

      this.enemies = game.add.group();
      this.bullets = game.add.group();
      this.powerups = game.add.group();
      this.bosses = game.add.group();
      this.timer =  game.time.events.loop(800, this.addEnemies, this);
      this.timer2 = game.time.events.loop(10000, this.addPowerup, this);
      this.timer3 = game.time.events.loop(70000, this.addBoss, this);
      this.timer4 = game.time.events.loop(1000, this.difficultyProg, this);

      this.score = 0;
      this.labelScore = game.add.text(20, 20, "Pontos: 0", { font: "20px monospace", fill:"#ffffff" });

      this.lifes = 3;
      this.labelLifes = game.add.text(480, 20, "Vidas: 3", { font: "20px monospace", fill:"#ffffff" });


    },
    update: function(){
      let cursors = game.input.keyboard.createCursorKeys();
      if(sandro.alive){
      sandro.body.velocity.setTo(0,0);
        if(cursors.left.isDown || game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
          sandro.body.velocity.x = -350;
        }
        if(cursors.right.isDown || game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
          sandro.body.velocity.x = 350;
        }
        if(game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).justPressed(1000)){
          shoot.play();
          this.fire();
        }
      }
      game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler1, null, this);
      game.physics.arcade.overlap(this.bullets, this.powerups, this.collisionHandler2, null, this);
      game.physics.arcade.overlap(this.bullets, this.bosses, this.collisionHandler3, null, this);
      if(this.lifes===0){
          explosion.play();
          this.youlose();
      }

      if(bill){
        this.enemies.kill();
        this.powerups.kill();
          if (bill.body && bill.body.y > 500){
            this.bosses.kill();
            this.labelLifes.text = 'PERDEU!';
            explosion.play();
            this.youlose();
          }
      }
    },
    fire: function(){
      bullet = game.add.sprite(sandro.x-15, sandro.y-30, 'bullet');
      bullet.anchor.setTo(0.5,0.5);
      this.bullets.add(bullet);
      game.physics.arcade.enable(bullet);
      bullet.body.velocity.y = -600;
      bullet.events.onOutOfBounds.add(function(bullet){
        bullet.kill();
      }, this);
    },
    addEnemies: function(){
      enemy = game.add.sprite(Math.floor(Math.random()*580)+1, -25, 'enemy');
      this.enemies.add(enemy);300
      game.physics.arcade.enable(enemy);
      enemy.body.velocity.y = envel;
      enemy.checkWorldBounds = true;
      enemy.events.onOutOfBounds.add(function(enemy){
        enemy.kill();
        this.lifes--;
        this.labelLifes.text = 'Vidas: ' + this.lifes;
      }, this);
    },
    collisionHandler1: function(bullet, enemy){
      invkill.play();
      bullet.kill();
      enemy.kill();
      this.score++;
      this.labelScore.text = 'Pontos: ' + this.score;
    },
    collisionHandler2: function(bullet, gnu){
      bullet.kill();
      gnu.kill();
      this.lifes++;
      this.labelLifes.text = 'Vidas: ' + this.lifes;
    },
    collisionHandler3: function(bullet, bill){
      bullet.kill();
      billLife--;
      if(billLife==0){
        bill.kill();
        this.score+=50;
        this.labelScore.text = 'Pontos: ' + this.score;
        this.youlose();
        this.labelLifes.text = 'Ganhou!';
      }
    },
    addPowerup: function(){
      gnu = game.add.sprite(Math.floor(Math.random()*580)+1, -25, 'gnu');
      gnu.checkWorldBounds = true;
      game.physics.arcade.enable(gnu);
      gnu.scale.setTo(0.25);
      gnu.body.velocity.y = 150;
      this.powerups.add(gnu);
    },
    addBoss: function(){
      bill = game.add.sprite(175,-200, 'bill');
      billLife = 120;
      bill.checkWorldBounds = true;
      game.physics.arcade.enable(bill);
      bill.scale.setTo(0.5);
      bill.body.velocity.y=45;
      this.bosses.add(bill);
    },
    youlose: function(){
      game.paused = true;
      if(this.score > localStorage.getItem('score')){
        localStorage.setItem('maxScore', this.score);
      }
      localStorage.setItem("score", this.score);
      this.labelLifes.text = 'PERDEU!';

      sandro.kill();
    },
    difficultyProg: function(){
      envel +=3;
    },
  };
  $('#SandroInvaders').css('marginLeft', screen.width/2 - screen.width/5.5);

  let game = new Phaser.Game(600,600, Phaser.AUTO, 'SandroInvaders');
  game.state.add('main', mainState);
  game.state.start('main');
  $('#restart').click(function(){
    window.location.reload(true);
  });
  $('#maxscore').click(function(){
    if(localStorage.getItem('maxScore') == null) localStorage.setItem('maxScore', 0);
    if(localStorage.getItem('score') == null) localStorage.setItem('score', 0);
    alert('Última Pontuação: ' + localStorage.getItem("score") + '\nPontuação Recorde: ' + localStorage.getItem('maxScore'));
  });
  cheet('l a d r a o', function(){
    $('#cheats').css('display', 'block');
    alert('Botão \'50 Vidas\' está ativado!');
      $('#cheats').click(function(){
        mainState.lifes = 50;
        mainState.labelLifes.text = 'Vidas: ' + mainState.lifes;
    });
  });
});

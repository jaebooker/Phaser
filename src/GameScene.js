import { Scene } from 'phaser'

class GameScene extends Scene {

    preload(){
        //this.load.image('logo', 'assets/logo.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create(){
        this.add.image(400, 300, 'sky');
        // const sky = this.add.image(0,0,'sky');
        // sky.setOrigin(0,0);
        this.createPlatforms();
        this.createStarz();
        //const star = this.add.image(400,300,'star');
        //const logo = this.add.image(400, 150, 'logo');
        const message = this.add.text(100,150,'Good Morning, Starshine');
        const message2 = this.add.text(100,180,'The Earth Says Hello');
        this.createPlayer();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.update();
        this.input.on('pointerdown',() => {
            message.text = "You twinkle above us"
            message2.text = "We twinkle below"
        })

        this.input.on('pointerup',() => {
            message.text = "Good Morning, Starshine"
            message2.text = "The Earth Says Hello"
        })

        // this.tweens.add({
        //     targets: logo,
        //     y: 450,
        //     duration: 2000,
        //     ease: 'Power2',
        //     yoyo: true,
        //     loop: -1
        // });
    }

    createPlatforms(){
        //this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    }

    // createStarz(){
    //     for(let i=1;i<40;i+=3){
    //         this.add.image(i*10,i*10,'star');
    //     }
    // }

    createPlayer(){
        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    createStarz(){
        this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(this.stars, this.platforms);
    }

    update(){
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

export default GameScene

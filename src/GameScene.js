import { Scene } from 'phaser'

class GameScene extends Scene {

    preload(){
        this.load.image('logo', 'assets/logo.png');
    }

    create(){
        const logo = this.add.image(400, 150, 'logo');
        const message = this.add.text(100,150,'Good Morning, Starshine');
        const message2 = this.add.text(100,180,'The Earth Says Hello');

        this.input.on('pointerdown',() => {
            message.text = "You twinkle above us"
            message2.text = "We twinkle below"
        })

        this.input.on('pointerup',() => {
            message.text = "Good Morning, Starshine"
            message2.text = "The Earth Says Hello"
        })

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });
    }
}

export default GameScene

const MOVE_LEFT = 1;
const MOVE_RIGHT = 2;

cc.macro.ENABLE_TILEDMAP_CULLING = false;

cc.Class({
    extends: cc.Component,

    properties: {
        maxSpeed: 500,
        jumps: 2,
        maxJumps: 3,
        acceleration: 1500,
        jumpSpeed: 200,
        drag: 600
    },

    // use this for initialization
    onLoad: function () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this._moveFlags = 0;

        this._up = false;

        this.speedX = 200;

        this.body = this.getComponent(cc.RigidBody);

        this.playerAnim = this.getComponent(cc.Animation);
    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
        // this.body.linearVelocity = cc.p(this.speedX,0);
        this.playerAnim.play('run');
         cc.testPlayer = this;
    },

    onKeyDown(event) {
        let speed = this.body.linearVelocity;
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this._moveFlags |= MOVE_LEFT;
                if (this.node.scaleX > 0) {
                    this.node.scaleX *= -1;
                }

                speed.x = -this.speedX;
                this.body.linearVelocity = speed;
                this.playerAnim.play('run');
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._moveFlags |= MOVE_RIGHT;
                if (this.node.scaleX < 0) {
                    this.node.scaleX *= -1;
                }

                speed.x = this.speedX;
                this.body.linearVelocity = speed;
                this.playerAnim.play('run');
                break;
            case cc.KEY.up:
            case cc.KEY.space:
                if (!this._upPressed) {
                    this._up = true;
                }
                this._upPressed = true;

                if (Math.abs(speed.y) < 1) {
                    this.jumps = this.maxJumps;
                }

                if (this.jumps > 0 && this._up) {
                    speed.y = this.jumpSpeed;
                    this.jumps--;
                    if (this.jumps == 1) {
                        this.playerAnim.play('jump');
                    } else if (this.jumps == 0) {
                        this.playerAnim.play('roll');
                    }
                }

                this._up = false;
                this.body.linearVelocity = speed;
                // this.getComponent(cc.RigidBody).linearVelocity.y = 500;
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this._moveFlags &= ~MOVE_LEFT;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._moveFlags &= ~MOVE_RIGHT;
                break;
            case cc.KEY.up:
            case cc.KEY.space:
                this._upPressed = false;
                break;
        }
    },

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 666:
                this.playerAnim.play('run');
                break;
            case 777:
                this.gameCtl.onPlayerContactBoundline();
                break;
        }
    },

});
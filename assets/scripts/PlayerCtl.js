const MOVE_LEFT = 1;
const MOVE_RIGHT = 2;
const StateMachine = require('state-machine');
const FSM = StateMachine.factory({
    init: 'none',
    data: function (player) {
        return {
            player: player
        }
    },
    transitions: [{
            name: 'start',
            from: 'none',
            to: 'running',
        },
        {
            name: 'jump1',
            from: 'running',
            to: 'jumping1'
        },
        {
            name: 'jump2',
            from: 'jumping1',
            to: 'jumping2'
        },
        {
            name: 'drop',
            from: ['jumping1', 'jumping2'],
            to: 'droping'
        },
        {
            name: 'land',
            from: ['jumping1', 'jumping2', 'droping'],
            to: 'running'
        }
    ],
    methods: {
        onStart() {
            this.player.playerAnim.play('run');
        },

        onJump1: function () {
            this.player.playerAnim.play('jump');
            let speed = this.player.body.linearVelocity;
            speed.y = this.player.jumpSpeed;
            this.player.body.linearVelocity = speed;

        },
        onJump2: function () {
            this.player.playerAnim.play('roll');
            let speed = this.player.body.linearVelocity;
            speed.y = this.player.jumpSpeed;
            this.player.body.linearVelocity = speed;
        },
        onDrop: function () {
            this.player.body.gravityScale = 20;
        },
        onLand: function () {
            this.player.body.gravityScale = 6;
            this.player.playerAnim.play('run');
        },
        // onEnterDroping(){
        //     this.player.shadowNode.active = true;
        //     this.player.shadowNode.position = this.player.node.convertToWorldSpaceAR();
        // },
        // onLeaveDroping(){
        //     this.player.shadowNode.active = false;
        // }
    }
});

cc.macro.ENABLE_TILEDMAP_CULLING = false;

cc.Class({
    extends: cc.Component,

    properties: {
        jumpSpeed: 200,
        shadowNode: cc.Node,
    },

    onLoad: function () {
        cc.testPlayer = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.body = this.getComponent(cc.RigidBody);

        this.playerAnim = this.getComponent(cc.Animation);

    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.fsm = new FSM(this);
        this.fsm.start();
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.up:
            case cc.KEY.space:
                if (this.fsm.can('jump1')) {
                    this.fsm.jump1();
                } else if (this.fsm.can('jump2')) {
                    this.fsm.jump2();
                }
                break;
            case cc.KEY.down:
                if (this.fsm.can('drop')) {
                    this.fsm.drop();
                }
                break;
        }
    },

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 666:
                if (this.fsm.can('land')) {
                    this.fsm.land();
                }
                break;
            case 777:
                this.gameCtl.onPlayerContactBoundline();
                break;
        }
    },

    lateUpdate(){
        this.shadowNode.position = this.node.position;
    }
});
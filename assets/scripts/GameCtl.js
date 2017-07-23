const BgCtl = require('BgCtl');
const PlayerCtl = require('PlayerCtl');

cc.Class({
    extends: cc.Component,

    properties: {
        bgCtl:BgCtl,
        playerCtl:PlayerCtl,
    },

    // use this for initialization
    onLoad: function () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        physicsManager.debugDrawFlags = 0;
        // 0;
        // cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit;

    },

    start(){
        // this.bgCtl.init(this);
        this.playerCtl.init(this);
    },

    onPlayerContactBoundline(){
        // this.bgCtl.updateBg();
    },
    
});
cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        },
        

    },

    // use this for initialization
    onLoad: function () {
        // this.camera = this.getComponent(cc.Camera);
    },

    init(gameCtl){
        this.gameCtl = gameCtl;
    },

    // onEnable: function () {
    //     cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    // },
    // onDisable: function () {
    //     cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    // },

    // called every frame, uncomment this function to activate update callback
    lateUpdate: function (dt) {
        let targetWorldPos = this.target.convertToWorldSpaceAR();
        let targetNodePos = this.node.parent.convertToNodeSpaceAR(targetWorldPos);
        // this.node.position = cc.p(targetNodePos.x+200,0);
        this.node.x = targetNodePos.x+200;
        // let targetPos = this.target.convertToWorldSpaceAR();
        // this.node.position = targetPos;

        // let ratio = targetWorldPos.y / cc.winSize.height;
        // this.camera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
    },
});
const Direction = cc.Enum({
    H: -1,
    V: -1,
    ALL: -1
});
const RoadCtl = require('RoadCtl');
cc.Class({
    extends: cc.Camera,

    properties: {
        followingTarget: cc.Node,
        dirction: {
            type: Direction,
            default: Direction.ALL,
        },
        roadCtl:RoadCtl,
    },

    onLoad() {
        cc.testCamera = this;
        // this.node.y = 250;
        this.node.x = cc.winSize.width / 2;
        this.node.y = cc.winSize.height / 2;
        this.offsetX = this.node.convertToWorldSpaceAR().x - this.followingTarget.convertToWorldSpaceAR().x;
    },

    onEnable: function () {
        this._super();
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this);
    },

    onDisable: function () {
        this._super();
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this);
    },

    update: function (dt) {
        let targetWorldPos = this.followingTarget.convertToWorldSpaceAR();
        let targetNodePos = this.node.parent.convertToNodeSpaceAR(targetWorldPos);
        this.node.x = targetNodePos.x + this.offsetX;

        // let ratio = targetWorldPos.y / cc.winSize.height;
        // this.zoomRatio = 1 + (0.5 - ratio) * 0.5;

        let firstRoadNode = this.roadCtl.getFirstRoad();
        if(firstRoadNode.convertToWorldSpaceAR().x < this.node.x - firstRoadNode.width-this.offsetX){
            this.roadCtl.removeRoad();
            this.roadCtl.addRoad();
        }
    },

});
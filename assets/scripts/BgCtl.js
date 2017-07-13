cc.Class({
    extends: cc.Component,

    properties: {
        bgLayer: cc.Node,
        bgPrefab: cc.Prefab,
        bgNode: cc.Node,
    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
        // this._bgWidth = this.bgPrefab.width;
        this.bgWidth = this.bgNode.width;
        this.curBg = 0;
        this.maxBg = 0;
        
        this.addBg();
    },

    updateBg() {
        this.curBg++;
        this.addBg();
    },

    addBg() {
        let newBgNode = cc.instantiate(this.bgPrefab);
        newBgNode.x = (this.maxBg + 1) * this.bgWidth;
        newBgNode.parent = this.bgLayer;
        this.maxBg++;
    },

    removeBg() {

    }


});
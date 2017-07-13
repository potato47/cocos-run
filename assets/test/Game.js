cc.Class({
    extends: cc.Component,

    properties: {
        node1:cc.Node,
        node2:cc.Node,
    },

    onLoad: function () {

        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        let newNode1 = cc.instantiate(this.node1);
        newNode1.y += 200;
        newNode1.parent = this.node;
        
        let newNode2 = cc.instantiate(this.node2);
        newNode2.y += 200;
        newNode2.parent = this.node;
    },

});

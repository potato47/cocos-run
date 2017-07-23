cc.Class({
    extends: cc.Component,

    properties: {
        roadLayout:cc.Node,
        roadPrefabs:[cc.Prefab],
    },

    // use this for initialization
    onLoad: function () {
        this.initRoad();
    },

    initRoad(){
        this.roadLayout.removeAllChildren();
        this.roads = [];
        for(let i = 0; i < 3; i++){
            this.addRoad();
        }
    },

    getFirstRoad(){
        return this.roads[0];
    },

    getLastRoad(){
        return this.roads[this.roads.length-1];
    },

    removeRoad(){
        // cc.log('remove road');
        let removedRoad = this.roads.shift();
        removedRoad.destroy();
    },

    addRoad(){
        // cc.log('add road');
        let n = Math.floor(Math.random()*this.roadPrefabs.length);
        let newRoadNode = cc.instantiate(this.roadPrefabs[n]);
        let lastRoadNode = this.getLastRoad();
        // cc.log("lastRoadNode:"+lastRoadNode);
        if(lastRoadNode){
            newRoadNode.x = lastRoadNode.x+lastRoadNode.width;
        }else{
            newRoadNode.x = -480;
        }
        newRoadNode.y = 0;
        this.roadLayout.addChild(newRoadNode);
        this.roads.push(newRoadNode);
    },
});

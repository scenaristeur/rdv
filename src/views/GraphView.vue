<template>
    <div>
        <!--
        <hr>
        links: {{ links }}
        <hr> -->



 




        <div ref="graph"></div>
        {{ coreCurrent != null && coreCurrent.id }}
        <hr>
        rdvs : {{ rdvs }}
        <hr>
        users: {{ users }}
        <hr>
        posts: {{ posts }}
        <!-- <hr>
        nodes : {{ nodes }}

        {{ ystore.todos }} -->

        <!-- nodes : {{ nodes }} -->
        <hr>

    </div>
</template>

<script>
import { store as ystore } from "@/y_store";
import ForceGraph3D from '3d-force-graph';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as elementResizeDetectorMaker from "element-resize-detector";
import SpriteText from 'three-spritetext';

export default {
    name: 'GraphView',
    data() {
        return {
            ystore,
            graph: null,
            nodes: [],
            links: []
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let graph = this.graph = ForceGraph3D({
                extraRenderers: [new CSS2DRenderer()]
            })(this.$refs.graph)
                .width(100)
                // .nodeId(['@id'])
                .nodeLabel('name')
                //.nodeVal('ve:val')
                //.graphData(this.gData)
                .backgroundColor("#0B0B61")
                .height(window.innerHeight - 64)
                .nodeThreeObject(node => {
                    const nodeEl = document.createElement('div');
                    nodeEl.textContent = node['name']
                    nodeEl.style.color = "#cccccc" //"node.color";
                    nodeEl.className = 'node-label';
                    return new CSS2DObject(nodeEl);
                })
                .nodeThreeObjectExtend(true)
                // .height(this.$refs.graph.element.parent.height)
                .onNodeClick(node => this.focus(node))
                .nodeAutoColorBy('group')
                .linkDirectionalArrowLength(3.5)
                .linkDirectionalArrowRelPos(1)
                .linkCurvature(0.25).linkThreeObjectExtend(true)
                .linkThreeObject(link => {
                    // extend link with text sprite
                    const sprite = new SpriteText(`${link.name}`);
                    sprite.color = 'lightgrey';
                    sprite.textHeight = 1.5;
                    return sprite;
                })
                .linkPositionUpdate((sprite, { start, end }) => {
                    const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
                        [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                    })))

                    // Position sprite
                    Object.assign(sprite.position, middlePos);
                })

            this.graph.graphData({ nodes: this.nodes, links: this.links })
            elementResizeDetectorMaker().listenTo(
                this.$refs.graph,
                el => {
                    this.graph.width(el.offsetWidth)
                    //this.graph.height(window.innerHeight - 64)
                }
            );


            function reportWindowSize() {
                //   heightOutput.textContent = window.innerHeight;
                //   widthOutput.textContent = window.innerWidth;
                graph.height(window.innerHeight - 64) //64
            }

            window.onresize = reportWindowSize;
            this.rdvs = this.$store.state.core.rdvs
            this.updateGraph()
        },
        focus(node) {
            console.log("focus", node)
            this.$store.commit('core/setCoreCurrent', node)
            // Aim at node from outside it
            const distance = 40;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

            const newPos = node.x || node.y || node.z
                ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
                : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)
            this.graph.cameraPosition(newPos, node, 3000)
        },
        updateGraph() {
            this.rdvs.forEach(rdv => {
                console.log(rdv)
                let findNode = this.nodes.find(n => n.id == rdv.uuid)
                if (findNode == null) {
                    this.nodes.push({ id: rdv.uuid, name: rdv.title, group: "rdv" })
                } else {
                    console.log("should update node rdv", findNode)
                }

            });

            this.users.forEach(user => {
                console.log(user)
                let findNode = this.nodes.find(n => n.id == user.uuid)
                if (findNode == null) {
                    this.nodes.push({ id: user.uuid, name: user.name, group: "user" })
                } else {
                    console.log("should update node user", findNode)
                }

            });

            this.posts.forEach(post => {
                console.log(post)
                let findNode = this.nodes.find(n => n.id == post.uuid)
                if (findNode == null) {
                    this.nodes.push({ id: post.uuid, name: post.title, group: "post" })
                } else {
                    console.log("should update node post", findNode)
                }

            });

            this.graph.graphData({ nodes: this.nodes, links: this.links })
        }
    },
    watch: {
        rdvs() {
            this.updateGraph()
        },
        users() {
            this.updateGraph()
        },
        posts() {
            this.updateGraph()
        },
        // nodes() {
        //     this.graph.graphData({ nodes: this.nodes, links: this.links })
        // },
        // links() {
        //     this.graph.graphData({ nodes: this.nodes, links: this.links })
        // },
        coreCurrent() {
            if (this.coreCurrent != null) {
                let node = this.nodes.find(n => n.id == this.coreCurrent.id)
                this.focus(node)
            }
       }
    },
    computed: {
        coreCurrent() {
            return this.$store.state.core.coreCurrent
        },
        rdvs() {
            return this.$store.state.core.rdvs
        },
        users() {
            return this.$store.state.core.users
        },
        posts() {
            return this.$store.state.core.posts
        },



        // nodes() {
        //     return this.ystore.todos.map(t => { return { id: t.id, name: t.name } })
        // },
        // links() {
        //     let links = []
        //     let todos = this.ystore.todos.map(t => {
        //         return JSON.parse(JSON.stringify(t))
        //     })

        //     todos.forEach(t => {
        //        // console.log(t)
        //         let source = t.id
        //        // console.log(source, t.properties)
        //         if (t.properties != undefined) {
        //             for (const [name, prop] of Object.entries(t.properties)) {
        //                 //console.log(`${label}: ${prop.values}`);
        //                 //console.log ("LINK", source, label, prop.values)
        //                 prop.values.forEach(v => {
        //                     if (v.id != undefined) {
        //                       //  console.log("LINK", source, name, v.id)
        //                         let targetExist = this.nodes.find(n => n.id == v.id)
        //                         if (targetExist) {
        //                             let link = { source: source, name: name, target: v.id }
        //                             links.push(link)
        //                         }
        //                     }
        //                 })
        //             }
        //         }
        //     })
        //    // console.log("links", links)
        //     return links
        // }
    }
}
</script>

<style scoped>
.node-label {
    font-size: 12px;
    padding: 1px 4px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    user-select: none;
}
</style>

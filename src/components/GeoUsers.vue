<template>
    <div>
        <hr>
        me {{ clientID }} , users : {{ features.length }} <br>
        {{ users }}
    </div>
</template>

<script>

import { awareness } from "@/y_store";
import Feature from 'ol/Feature.js';
//import { fromLonLat } from 'ol/proj.js';
import Point from 'ol/geom/Point.js';
import { Icon, Style } from 'ol/style.js';
import VectorSource from 'ol/source/Vector.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import marker from "@/assets/marker.png";


export default {
    name: "GeoUsers",
    data() {
        return {
            clientID: null,
            users: {},
            features: []
        }
    },
    methods: {
        init() {






            const vectorSource = new VectorSource({
                features: this.features //[rome, london/*, madrid, paris, berlin*/],
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });

            this.map.addLayer(vectorLayer);
            this.clientID = awareness.clientID
            console.log("init geousers", awareness.clientID)

            // changes or updates ? see https://docs.yjs.dev/api/about-awareness
            // You can observe when a user updates their awareness information
            awareness.on('change', () /*changes*/ => {
                /*Listen to remote and local state changes. Get notified when a state is either added, updated, or removed. */
                //console.log("change", changes)
                // Whenever somebody updates their awareness information,
                // we log all awareness information from all users.
                //console.log("awareness changes", Array.from(awareness.getStates().values()))

                // Array.from(awareness.getStates().values()).forEach(awa => {
                //     console.log("me=", username, "remote ",awa.user.name, awa.position)
                // })


                awareness.getStates().forEach(this.setUserMarker)
                // this.setUsersMarkers()
                console.log("users", this.users)

            })

            // awareness.on('update', updates => {
            //     /*Listen to remote and local awareness changes. This event is called even when the awareness state does not change but is only updated to notify other users that this client is still online. Use this event if you want to propagate awareness state to other users.*/
            //    // console.log("updates", updates)
            //     // Whenever somebody updates their awareness information,
            //     // we log all awareness information from all users.
            //     console.log("awareness updates", updates, Array.from(awareness.getStates().values()))

            //     // Array.from(awareness.getStates().values()).forEach(awa => {
            //     //     console.log("me=", username, "remote ",awa.user.name, awa.position)
            //     // })

            // })
        },
        setUserMarker(state, clientID/*, map*/) {
            //  console.log("state", clientID, state/*, map*/)


            if (clientID != awareness.clientID) {

                if (state.position && state.position.coordinates) {
                    let user = {
                        clientID: clientID,
                        name: state.user.name || 'anon',
                        position: state.position.coordinates
                    }
                    console.log("set marker", clientID, user)
                    this.users[clientID] = user

                    let userFeature = new Feature({
                        geometry: new Point(state.position.coordinates),
                    });



                    userFeature.setStyle(
                        new Style({
                            image: new Icon({
                                color: '#BADA55',
                                crossOrigin: 'anonymous',
                                src: marker,
                                scale: 0.05
                            }),
                        })
                    );

                    this.features.push(userFeature)

                    // const madrid = new Feature({
                    //     geometry: new Point(fromLonLat([-3.683333, 40.4])),
                    // });
                    // const paris = new Feature({
                    //     geometry: new Point(fromLonLat([2.353, 48.8566])),
                    // });
                    // const berlin = new Feature({
                    //     geometry: new Point(fromLonLat([13.3884, 52.5169])),
                    // });



                }
            }

        }

    },
    watch: {
        'map': {
            handler() {
                // console.log(this.map)
                //if (this.map != undefined && this.map.view != undefined) {
                this.init()
                //}
                //  
            },
            deep: false
        }
    },
    computed: {
        map() {
            return this.$store.state.map
        }
    },
}
</script>

<style scoped></style>
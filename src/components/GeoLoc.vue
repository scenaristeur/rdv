<template>
    <div>
        <div id="info" style="display: none;"></div>
        <label for="track">
            track position
            <input id="track" type="checkbox" @click="trackPosition" />
        </label>
        <p>
            position accuracy : <code id="accuracy"></code><br>
            altitude : <code id="altitude"></code><br>
            altitude accuracy : <code id="altitudeAccuracy"></code><br>
            heading : <code id="heading"></code><br>
            speed : <code id="speed"></code>
        </p>

    </div>
</template>

<script>

import { Geolocation } from 'ol';


import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import View from 'ol/View.js';

import { awareness } from "@/y_store";

let username = 'user_' + Date.now()


export default {
    name: "GeoLoc",
    data() {
        return {
            position: null,
            markers: [],
            follow_me: true
            //  tracking : true
        }
    },

    methods: {
        trackPosition(e) {
            console.log(e.target.checked, this.map.view)
            if (e.target.checked == true) {
                this.init()
            }
        },
        init() {
           // console.log("init")
            var view = new View({
                center: [0, 0],
                zoom: 4
            });
            this.map.view = view
            let that = this


            // You can think of your own awareness information as a key-value store.
            // We update our "user" field to propagate relevant user information.
            awareness.setLocalStateField('user', {
                // Define a print name that should be displayed
                name: username,
                // Define a color that should be associated to the user:
                color: '#ffb61e' // should be a hex color
            })

            var geolocation = new Geolocation({
                // enableHighAccuracy must be set to true to have the heading value.
                trackingOptions: {
                    enableHighAccuracy: true
                },
               // projection: that.map.view.getProjection()
            });

            function el(id) {
                return document.getElementById(id);
            }

            el('track').addEventListener('change', function () {
                geolocation.setTracking(this.checked);
            });

            // update the HTML page when the position changes.
            geolocation.on('change', function () {
                console.log(geolocation)
               var coordinates = geolocation.getPosition();
               console.log("me", coordinates)
                that.updateAwarenessPosition(coordinates)
                el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
                el('altitude').innerText = geolocation.getAltitude() + ' [m]';
                el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
                el('heading').innerText = geolocation.getHeading() + ' [rad]';
                el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
                that.map.view.setCenter(coordinates);
               // that.addMarker(coordinates))

            });

            // handle geolocation error.
            geolocation.on('error', function (error) {
                var info = document.getElementById('info');
                info.innerHTML = error.message;
                info.style.display = '';
            });

            var accuracyFeature = new Feature();
            geolocation.on('change:accuracyGeometry', function () {
                accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
            });

            var positionFeature = new Feature();
            positionFeature.setStyle(new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({
                        color: '#3399CC'
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2
                    })
                })
            }));

            geolocation.on('change:position', function () {
                var coordinates = geolocation.getPosition();
                positionFeature.setGeometry(coordinates ?
                    new Point(coordinates) : null);

                that.updateAwarenessPosition(coordinates)

                if (this.follow_me){
                    that.map.view.setCenter(geolocation.getPosition());
                    that.map.view.setZoom(5);
                }



            });

            new VectorLayer({
                map: that.map,
                source: new VectorSource({
                    features: [accuracyFeature, positionFeature]
                })
            });


 
        },
        updateAwarenessPosition(coordinates) {
            console.log(coordinates)
            // You can think of your own awareness information as a key-value store.
            // We update our "user" field to propagate relevant user information.
            awareness.setLocalStateField('position', {
                // Define a print name that should be displayed
                coordinates: coordinates,
                updated: Date.now() 
                // Define a color that should be associated to the user:
                //color: '#ffb61e' // should be a hex color
            })
        },

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
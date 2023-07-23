<template>
    <div>
        <div id="info" style="display: none;"></div>
        <label for="track">
            track position
            <input id="track" type="checkbox"  @click="trackPosition" />
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


export default {
    name: "GeoLoc",
    data() {
        return {
            position: null,
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
            console.log("init")
            var view = new View({
                center: [0, 0],
                zoom: 4
            });
            this.map.view = view
            let that = this
            var geolocation = new Geolocation({
                // enableHighAccuracy must be set to true to have the heading value.
                trackingOptions: {
                    enableHighAccuracy: true
                },
                projection: that.map.view.getProjection()
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
                el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
                el('altitude').innerText = geolocation.getAltitude() + ' [m]';
                el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
                el('heading').innerText = geolocation.getHeading() + ' [rad]';
                el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
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
            });

            new VectorLayer({
                map: that.map,
                source: new VectorSource({
                    features: [accuracyFeature, positionFeature]
                })
            });

        }
    },
    watch: {
        'map': {
            handler() {
                console.log(this.map)
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
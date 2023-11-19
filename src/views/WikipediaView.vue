<template>
    <div>

        <BListGroup v-if="places.length > 0" class="scroll_list">
            <div>
                <BListGroupItem v-for="p in places" :key="p.pageid" href="#" @click="wikipediaClicked(p)">
                    {{ p.title }} à {{ p.dist }} m
                </BListGroupItem>
            </div>
        </BListGroup>


        <!-- {{ places }} -->
    </div>
</template>

<script>
// https://fr.wikipedia.org/w/api.php?origin=*&action=query&list=geosearch&gscoord=43.5796556|1.4011178&prop=coordinates|pageimages&gsradius=10000&gslimit=100&format=json
export default {
    name: "WikipediaView",
    data() {
        return {
            // url: "https://fr.wikipedia.org/w/api.php",
            // //var url = "https://www.mediawiki.org/w/api.php"

            // params: {
            //     //https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=37.7891838%7C-122.4033522&gsradius=10000&gslimit=100
            //     origin: '*',
            //     action: "query",
            //     list: "geosearch",
            //     gscoord: null,// lat + "|" + lon,
            //     prop: "coordinates|pageimages",
            //     gsradius: 10000,
            //     gslimit: 100,
            //     format: "json"
            // }
        }
    },
    methods: {
        wikipediaClicked(place) {
            console.log(place)
        
                this.$store.commit('core/centerToPoint', [place.lon, place.lat])
         

        },

    },
    watch: {
        myPosition() {
            console.log("update pos")
            this.getplaces()
        }
    },
    computed: {
        places() {
            return this.$store.state.core.places
        },
        // profiles() {
        //     return this.$store.state.core.profiles
        // },
        // profile() {
        //     return this.$store.state.core.profile
        // },
    }
}
</script>

<style scoped></style>
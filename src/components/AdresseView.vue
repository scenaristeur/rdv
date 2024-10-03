<template>

        <!-- <b-button v-if="adresseShow == false" @click.stop="showAdresse" variant="primary" size="sm">adresse</b-button>
        <div v-else> -->
            
            

            <!-- <br> -->
            <b-button @click.stop="ouvrir" variant="primary" size="sm">{{ adresse }} </b-button>
            <!-- <b-button  @click.stop="adresseShow = false" variant="primary" size="sm">cacher</b-button> -->
        <!-- </div>   -->
</template>

<script>
export default {
    name: "AdresseView",
    props: ['coordinates'],
    data() {
        return {
            adresse: null,
            adresseShow :false
        }
    },
    mounted() { 
        this.showAdresse()
    },
    methods: {
        async showAdresse() {
            this.adresseShow = true
            let add = await this.adress(this.coordinates)
            let split = add.display_name.split(",")
            this.adresse = split[0]+" "+split[1]+" "+split[2]
        },
        async adress([lon, lat]) {
            let url = "https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json"
            console.log(url)
            let response = await fetch(url);
            // console.log(response)
            // let adresse = await response.json();
            //let add = await response.json().display_name;
            return response.json()
        },
        ouvrir() {
            window.open("https://www.google.com/maps/search/?api=1&query=" + this.adresse)
        }
    },
    computed: {

    }
}
</script>

<style scoped></style>
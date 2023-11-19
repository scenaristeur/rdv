<template>

        <!-- coord {{ coordinates }}, -->
        
        <button v-if="adresseShow == false" @click.stop="showAdresse">adresse</button>
        <div v-else>{{ adresse }} <button  @click.stop="adresseShow = false">cacher</button>

        </div>
   
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
    methods: {
        async showAdresse() {
            this.adresseShow = true
            let add = await this.adress(this.coordinates)
            this.adresse = add.display_name
        },
        async adress([lon, lat]) {
            let url = "https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json"
            console.log(url)
            let response = await fetch(url);
            // console.log(response)
            // let adresse = await response.json();
            //let add = await response.json().display_name;
            return response.json()
        }
    },
    computed: {

    }
}
</script>

<style scoped></style>
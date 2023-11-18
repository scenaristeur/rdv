<template>
    <div>
        <div>
            <BButton @click="showProfile = !showProfile"> Profile</BButton>
            <BModal v-model="showProfile">


                {{ profile }}

                <BListGroup>
                    <BListGroupItem v-for="p in profiles" :key="p.id" href="#" :active="profile == p.id">
                        {{ p.name }}
                    </BListGroupItem>

                </BListGroup>

            </BModal>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileView",
    data() {
        return {
            showProfile: false
        }
    },
    computed: {
        profiles() {
            return this.$store.state.core.profiles
        },
        profile() {
            return this.$store.state.core.profile
        }
    }
}
</script>

<style scoped></style>
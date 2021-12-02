<template>
    <div v-if="active" class="fixed bottom-20 right-20 w-50 p-4">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ToastNotification",
        data(){
            return {
                active: false
            }
        },
        created(){
            this.active = true;
            setTimeout(()=> this.active = false, 3000);
        }
    }
</script>

<style scoped>

</style>
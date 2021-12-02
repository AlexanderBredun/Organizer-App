<template>
    <div class="mb-5">

        <label class="bg-img-loader" ref="imgCover" :style="{backgroundImage: modelValue ? 'url(' + modelValue + ')' : null}">
            <span class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-40 rounded-2xl  z-0"></span>
                <span v-if="!imgLoaded" class="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 block text-2xl mb-1 z-10 text-white">
                    {{label}}
                </span>
            <span class="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 block text-2xl mb-1 z-100 text-white" v-else>
                Удалить изображение
            </span>
            <input @change="changeImgInput($event)" @click="deleteImg($event)"   type="file" accept="image/*" class="h-0 opacity-0" :name="name" >
        </label>
    </div>
</template>

<script>

    export default {
        name: "ImageFormField",
        props: {
            modelValue: {},
            label: String,
            name: String
        },
        emits: ['update:modelValue'],
        data(){
          return {
              imgLoaded: false
          }
        },
        methods:{
            changeImgInput(e){
                const file = e.target.files[0];
                if(file){
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    const vm = this;
                    reader.onload = function () {

                        vm.$refs.imgCover.style.backgroundImage = 'url(' + reader.result + ')';
                        vm.imgLoaded = true;
                        vm.$toast.success('Изображение загружено');
                        vm.$emit('update:modelValue', reader.result)
                    };

                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                        vm.imgLoaded = false;
                        vm.$toast.error('Ошибка при загрузке изображения');
                    };
                }
            },
            deleteImg(e){
                const file = e.target.files[0];
                if(file){
                    e.target.value = '';
                    this.$refs.imgCover.style.backgroundImage = null;
                    this.imgLoaded = false;
                    this.$emit('update:modelValue', '');
                   e.preventDefault();
                }
            }
        }
    }
</script>

<style lang="scss" >
    .bg-img-loader{
        display: block;
        width: 100%;
        max-width: 600px;
        height: 400px;
        background: var(--var-default-img) center center / cover no-repeat;
        position: relative;
        transition: .5s;
        border-radius: 1rem;
        border: 4px solid transparent;
        &:hover{
            border-color: blue;
        }
    }
</style>
<template >

    <div  class="relative max-w-max "  v-click-outside="onClickOutside">
        <div class="rounded-md border-2 border-gray-600 py-2 px-4 pr-8 active-elemtn relative "
             @click="opened = !opened"
             :class="{'opened-list': opened}"
        >

            <div class="flex items-center ">
                <i v-if="icon" class="fas fa-lg mr-4" :class="activeElement.icon"></i>
                <p class="m-0">
                    {{label}} - {{activeElement.title}}
                </p>
            </div>

        </div>
        <transition name="list-fade-in" class="bg-gray-200 rounded-md border-2 border-gray-600 "
             :class="{opened: opened}"
        >
            <ul v-if="opened">
                <li v-for="(el, i) in content"
                    :key="i"
                    @click="changeActive(el)"

                    class="flex items-center py-2 px-4">
                    <i v-if="icon" class="fas fa-lg mr-4" :class="el.icon"></i>
                    <p class="m-0">
                        {{el.title}}
                    </p>
                </li>
            </ul>
        </transition>
    </div>

</template>

<script>
    export default {
        name: "DropDownButton",
        emits:['changeActive'],

        props: {
            content: Array,
            activeStep: {},
            label: String,
            icon: Boolean
        },
        data(){
            return {
                opened: false,
            }
        },
        computed: {
            activeElement(){
                return this.content.filter(el => el.title === this.activeStep)[0]
            }
        },
        methods:{
            onClickOutside () {
               this.opened = false;
            },
            changeActive(el){
                this.opened = false;

                this.$emit('changeActive', el)
            }
        }

    }
</script>

<style scoped lang="scss">
    .list-fade-in-enter-from, .list-fade-in-leave-to {
        opacity: 0;
    }
    .list-fade-in-enter-active, .list-fade-in-leave-active {
        transition: opacity .2s ease;
    }

    .active-elemtn{
        position: relative;
        cursor: pointer;
        transition: .2s;
        &.opened-list{
            border-bottom: 1px solid gray;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            &:after{
                transform: translate3d(0, -50%, 0) rotate(-180deg);
                transform-origin: center;
            }
        }
        &:after{
            content: '⇓';
            display: block;
            font-size: 20px;
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translate3d(0, -50%, 0);
            transition: .2s;
        }
    }
    .opened{
        z-index: 9999;
        border-top: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        transition: .2s;
        li{
            cursor: pointer;
            border-bottom: 1px solid gray;
            &:last-child{
                border-bottom: 0;
            }
        }
    }
</style>
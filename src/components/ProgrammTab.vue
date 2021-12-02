<template>

   <ul v-if="event.programm.length">
       <li class="flex mb-8 pb-8 border-b-2 border-gray-400 items-start"
           v-for="step in event.programm"
           :key="step.id"
       >

           <div class="w-4/5 mr-4 flex items-center">
               <i class="fa-2x fas mr-5" :class="step.icon"></i>
               <p class="text-xl font-300 text-blue-700">
                   {{step.dateStart}} &mdash; {{step.dateEnd}}
               </p>
           </div>
           <div class="w-full">
               <p class="font-bold text-xl">
                   {{step.customTitle || step.title}}
               </p>
               <p class="mb-4" v-if="step.reporter">
                   {{step.reporter}} <span class="programm-dot"></span> <span class="italic uppercase">{{step.lang}}</span>
               </p>
               <p v-if="step.description">
                   {{step.description}}
               </p>
           </div>
       </li>
   </ul>
    <p v-else>
       Тут ничего нет (пока что)
    </p>
</template>

<script>
    export default {
        name: "ProgrammTab",
        props: {
            event: Object
        },

        methods: {
            dateToTime(date){

                return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .programm-dot{
        position: relative;

        &:before{
            content: '•';
            font-size: 18px;
            color: rgba(114, 208, 208, 1);

        }
    }
</style>
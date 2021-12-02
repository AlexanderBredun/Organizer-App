<template>

    <WrapperView maxWidth="900">
        <div class="bg-blue-400 p-5 w-auto flex justify-center items-center text-white">
            <button @click.prevent="getCurrentMonth(dateNow.getFullYear(), dateNow.getMonth()-1)">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
            </button>

            <p class="text-2xl mx-4" >
                {{getMonthYearFormated}}
            </p>
            <button @click.prevent="getCurrentMonth(dateNow.getFullYear(), dateNow.getMonth()+1)">
                <i class="fas fa-arrow-circle-right fa-2x" ></i>
            </button>
        </div>
        <ul class="calendar-month">
            <li v-for="(day, i) in monthDisplay"
                :key="i"
            >
                <p class="calendar-day-number">
                    {{i+1}}
                </p>
                <p v-for="event in dayHasEvents(i+1)"
                   :key="event.id"
                   class="calendar-day-event"
                >
                    <router-link :to="{ name: 'Event', params: { id: event.id}}">
                        {{event.name}}
                    </router-link>
                </p>
            </li>
        </ul>
    </WrapperView>
</template>

<script>
    import WrapperView from '@/components/WrapperView'

    export default {
        name: "Calendar",
        components: {
            WrapperView
        },
        props:{
          events: Array
        },
        data(){
            return {
                monthDisplay: null,
                dateNow: new Date(),
                monthEvents: []
            }
        },
        created(){
            this.getCurrentMonth(this.dateNow.getFullYear(), this.dateNow.getMonth())
        },
        watch: {
            events: function () {
                this.monthHasEvents()
            }
        },
        methods:{
           getCurrentMonth(year, month){

             this.monthDisplay = new Array(new Date(year, month+1, 0).getDate());
             const dateNew = new Date();
             dateNew.setFullYear(year);
             dateNew.setMonth(month);
             this.dateNow = dateNew;
             this.monthHasEvents()
           },
            monthHasEvents(){
               const month = this.dateNow.getMonth();
               this.monthEvents = this.$props.events.filter(el => {
                   const elMonth = new Date(el.date).getMonth();
                   return elMonth === month;
               });
            },
            dayHasEvents(dayNumber){
               const dateNew = this.dateNow;
                dateNew.setDate(dayNumber);
                console.log(dateNew.toLocaleDateString());
               return this.monthEvents.filter(el => new Date(el.date).toLocaleDateString() === dateNew.toLocaleDateString())
            },
        },
        computed: {
            getMonthYearFormated(){

                const month = this.dateNow.toLocaleString('default', { month: 'long' });
                const year = this.dateNow.getFullYear();
                return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
            }
        }


    }
</script>

<style scoped lang="scss">
    .calendar-month{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 110px;

        li{
            padding: 6px;
            width: 100%;
            border-left: 1px solid lightsteelblue;
            border-bottom: 1px solid lightsteelblue;

            &:nth-child(7n), &:last-child{
                border-right: 1px solid lightsteelblue;
            }
            .calendar-day-number{
                text-align: right;
                font-size: 12px;

            }
            .calendar-day-event{
                margin: 5px 0 0;
                padding: 3px;
                background: #60A5FA;
                text-align: center;
                color: #fff;
                border-radius: 2px;
                line-height: 1.2;
                font-size: 11px;
                a{
                    -webkit-line-clamp:2;
                    width: 100%;
                    text-align: left;

                }
            }
        }
    }
</style>
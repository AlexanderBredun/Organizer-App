<template>
  <div class="p-8 pr-40 bg-gray-200 font-bold mb-8 max-w-2xl relative">
      <i class="fas fa-trash absolute right-6 top-4 cursor-pointer" @click="deleteStep"></i>

        <DropDownButton
                class="mb-8"
                @changeActive="iconTitleProgrammStep"
                :content="dropdownContent"
                :activeStep="step.title"
                label="Тип"
                icon
        ></DropDownButton>
      <div class="flex justify-between w-full mb-12">
          <InputFormField
                  dontValidate
                  class="w-1/2 mr-4"
                  label="Начало"
                  name="dateStart"
                  type-input="time"
                  v-model="stepDateStart"
                  @change="changeStartDate"

          ></InputFormField>
          <InputFormField
                  dontValidate
                  class="w-1/2"
                  label="Окончание"
                  name="dateEnd"
                  type-input="time"
                  v-model="stepDateEnd"
                  @change="changeEndDate"
          ></InputFormField>
      </div>
      <InputFormField
              dontValidate
              label="Нестандартный текст (необязательно)"
              name="customTitle"
              v-model="stepCustomTitle"
      ></InputFormField>
      <template v-if="step.title === 'Доклад'">
          <InputFormField
                  dontValidate
                  label="Тема"
                  name="themeReport"
                  v-model="themeReport"
          ></InputFormField>
          <InputFormField
                  dontValidate
                  label="Докладчик"
                  name="reporter"
                  v-model="reporter"
          ></InputFormField>
      </template>

      <InputFormField
              textarea
              dontValidate
              v-if="step.title === 'Другое' || step.title === 'Доклад'"
              label="Описание"
              name="description"
              v-model="description"
      ></InputFormField>

      <DropDownButton
              v-if="step.title === 'Доклад'"
              class="mb-8"
              @changeActive="changeField($event, 'lang')"
              :content="langContent"
              label="Язык"
              :activeStep="step.lang || 'Не указано'"
      ></DropDownButton>
  </div>
</template>

<script>
    import DropDownButton from './ui/DropDownButton'
    import InputFormField from '../components/ui/form/InputFormField'

    const mapFieldProgramm = (field)=> {

        return {
            get(){
                return this.$props.step[field]
            },
            set(value){
                this.$emit('programmFieldUpdate',  {
                    id: this.$props.step.id,
                    [field]: value.toString(),
                })
            }
        }
    };

    export default {
        name: "ProgrammStep",
        components: {
            DropDownButton,
            InputFormField,

        },
        props: {
            step: Object,
        },
        emits:['programmFieldUpdate', 'deleteProgrammStep'],
        data(){
            return {
                dropdownContent: [
                    {
                        icon: 'fa-key',
                        title: 'Регистрация'
                    },
                    {
                        icon: 'fa-calendar-minus',
                        title: 'Открытие'
                    },
                    {
                        icon: 'fa-key',
                        title: 'Перерыв'
                    },
                    {
                        icon: 'fa-coffee',
                        title: 'Coffee Break'
                    },
                    {
                        icon: 'fa-key',
                        title: 'Закрытие'
                    },
                    {
                        icon: 'fa-calendar-minus',
                        title: 'Afterparty'
                    },
                    {
                        icon: 'fa-tv',
                        title: 'Доклад'
                    },
                    {
                        icon: 'fa-calendar-minus',
                        title: 'Другое'
                    }
                ],
                isReportField:false,
                langContent: [
                    {
                        title: 'Не указано'
                    },
                    {
                        title: 'RU'
                    },
                    {
                        title: 'EN'
                    },
                ]


            }
        },
        computed:{
            stepDateStart: mapFieldProgramm('dateStart'),
            stepDateEnd: mapFieldProgramm('dateEnd'),
            stepCustomTitle: mapFieldProgramm('customTitle'),
            themeReport: mapFieldProgramm('themeReport'),
            reporter: mapFieldProgramm('reporter'),
            description: mapFieldProgramm('description'),
        },
        methods:{
            iconTitleProgrammStep(el){

                this.$emit('programmFieldUpdate', {id: this.$props.step.id, ...el})
            },
            changeField(el, field){
                this.$emit('programmFieldUpdate', {id: this.$props.step.id, ...{[field]: el.title}})
            },
            changeStartDate(e){
                if(e.target.value > this.stepDateEnd){
                    this.stepDateEnd = this.stepDateStart;
                }
            },
            changeEndDate(e){
                if(e.target.value < this.stepDateStart){
                    this.stepDateStart = this.stepDateEnd;
                }
            },
            deleteStep(){
                this.$emit('deleteProgrammStep', this.step.id)
            }
        }

    }
</script>

<style scoped>

</style>
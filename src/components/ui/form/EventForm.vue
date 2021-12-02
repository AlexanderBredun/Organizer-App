<template>

    <ValidateFormWrapper class="flex relative space-between w-full" @submitHandler="$emit('submitForm')">
        <div class="w-3/4 mr-32">
            <InputFormField
                    rules="required"
                    label="Название"
                    name="name"
                    v-model="eventName"
            ></InputFormField>

            <InputFormField
                    rules="required"
                    label="Дата"
                    type-input="date"
                    name="date"
                    v-model="eventDate"
            ></InputFormField>
            <InputFormField
                    rules="required"
                    label="Место проведения"
                    name="location"
                    v-model="eventLocation"
            ></InputFormField>
            <InputFormField
                    rules="required"
                    label="Описание"
                    textarea
                    name="description"
                    v-model="eventDescription"
            ></InputFormField>
            <ImageFormField
                    v-model="eventCoverImg"
                    label="Загрузить изображение"
                    name="img-cover"
            ></ImageFormField>

            <h2 class="text-2xl font-bold mb-5">
                Программа
            </h2>

            <component
                    v-for="step in activeEvent.programm"
                    :key="step.id"
                    :step="step"
                    :is="'ProgrammStep'"
                    @programmFieldUpdate="$emit('updateProgrammField', $event)"
                    @deleteProgrammStep = "$emit('deleteProgrammStep', $event)"
            ></component>
            <a href="#" @click.prevent="$emit('addProgrammStep')">+ Добавить этап программы</a>
        </div>
        <div class="sticky h-full top-4 w-1/4">
            <DangerButton @click.prevent="$emit('cancelForm')">
                Отменить
            </DangerButton>
            <SuccerButton type="submit" >
               {{submitText}}
            </SuccerButton>
        </div>

    </ValidateFormWrapper>
</template>

<script>
    import ValidateFormWrapper from './ValidateFormWrapper'
    import InputFormField from './InputFormField'
    import ImageFormField from './ImageFormField'

    import DangerButton from '../DangerButton'
    import SuccerButton from '../SuccerButton'

    import ProgrammStep from '../../ProgrammStep'


    const mapField = (field)=> {
        return {
            get(){
                return this.activeEvent[field]
            },
            set(value){
                this.$emit('updateField', {
                    field,
                    value: value.toString()
                })
            }
        }
    };


    export default {
        name: "EventForm",
        components: {
            ValidateFormWrapper,
            InputFormField,
            ImageFormField,

            DangerButton,
            SuccerButton,
            ProgrammStep
        },
        emits:['submitForm',
            'updateField',
            'cancelForm',
            'updateProgrammField',
            'addProgrammStep',
            'deleteProgrammStep'],
        props: {
            activeEvent: {},
            submitText: String
        },
        computed: {
            eventName: mapField('name'),
            eventDate: mapField('date'),
            eventLocation: mapField('location'),
            eventDescription: mapField('description'),
            eventCoverImg: mapField('img'),
        },
    }
</script>

<style scoped>

</style>
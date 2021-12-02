<template>
    <div class="mb-5" v-if="!dontValidate">

            <label>
                <span class="block text-lg mb-1">
                    {{label}}
                </span>
                <Field v-if="textarea"
                       as="textarea"
                       class="border-2 border-black-400 w-full focus:outline-none  text-xl h-32 p-4 rounded-md"
                       :name="name"
                       :value="modelValue"
                       @input="$emit('update:modelValue', $event.target.value)"
                       :rules="rules"></Field>

                <Field class="border-2 border-black-400 w-full active:inline-0 text-xl h-12 px-4 rounded-md"
                       v-else
                       :type="typeInput"
                       :name="name"
                       @input="$emit('update:modelValue', $event.target.value)"
                       :value="modelValue"
                       :rules="rules"></Field>
            </label>

            <ErrorMessage :name="name"></ErrorMessage>

    </div>
    <div v-else>
        <div class="mb-5">
            <label>
                <span class="block text-lg mb-1">
                    {{label}}
                </span>
                <textarea
                            v-if="textarea"

                           class="border-2 border-black-400 w-full focus:outline-none  text-xl h-32 p-4 rounded-md"
                           :value="modelValue"
                           @input="$emit('update:modelValue', $event.target.value)"
                            v-bind="$attrs"
                ></textarea>
                <input v-else
                       class="border-2 border-black-400 w-full active:inline-0 text-xl h-12 px-4 rounded-md"
                       :type="typeInput"
                       @input="$emit('update:modelValue', $event.target.value)"
                       :value="modelValue"
                       v-bind="$attrs"

                >
            </label>

        </div>
    </div>
</template>

<script>

    import {Field, ErrorMessage, defineRule} from 'vee-validate'
    defineRule("required", (value) => {
        if (!value) {
            return "Это объязательное поле";
        }

        return true;
    });
    defineRule("email", (value) => {
        if (!(/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/).test( value )) {
            return "Введите корректный email";
        }

        return true;
    });
    defineRule("confirmed", (value, [other]) => {
        if (value !== other) {
            return `Пароли не совпадают`;
        }

        return true;
    });

    export default {
        name: "InputFormField",
        components: {
            Field,
            ErrorMessage
        },
        emits: ['update:modelValue'],
        props: {
            modelValue: {},
            textarea: {
                type: Boolean,
                default: false
            },
            label: String,
            typeInput: {
                type: String,
                default: 'text'
            },
            rules: String,
            name: String,
            dontValidate: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>

</style>
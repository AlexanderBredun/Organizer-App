<template>
    <WrapperView :maxWidth="'600'">
        <h2 class="text-2xl font-bold mb-5 text-center">
            Вход
        </h2>
        <ValidateFormWrapper

                @submitHandler="registerUser">
            <InputFormField
                    rules="required|email"
                    label="Email"
                    type-input="email"
                    name="email"
            ></InputFormField>
            <InputFormField
                    rules="required"
                    label="Логин"
                    type-input="text"
                    name="login"
            ></InputFormField>
            <InputFormField
                    rules="required"
                    label="Пароль"
                    type-input="password"
                    name="password"
            ></InputFormField>
            <InputFormField
                    rules="required|confirmed:@password"
                    label="Повторите пароль"
                    type-input="password"
                    name="passwordC0nfirm"
            ></InputFormField>
            <AppButton
                    v-if="!loading"
                    class="mx-auto"
                    type="submit"
                    defaultBtn
            >
                Создать
            </AppButton>
            <Spinner v-else></Spinner>
        </ValidateFormWrapper>
        <p class="text-center">
            Уже есть аккаунт?  <router-link :to="{name: 'Login'}">Войти</router-link>
        </p>

    </WrapperView>


</template>

<script>

    import ValidateFormWrapper from '../components/ui/form/ValidateFormWrapper'
    import InputFormField from '../components/ui/form/InputFormField'
    import AppButton from '../components/ui/AppButton'
    import WrapperView from '../components/WrapperView'
    import Spinner from '@/components/Spinner'

    export default {
        name: "Register",
        components: {
            ValidateFormWrapper,
            InputFormField,
            AppButton,
            WrapperView,
            Spinner
        },
       data(){
            return {
                loading: false
            }
       },
        methods:{
            sameField(value, [other]){
                if (value !== other) {
                    return `Passwords do not match`;
                }

                return true;
        },
            registerUser(e){
                this.loading = true;
                this.$store.dispatch('auth/REGISTER_USER',
                    {
                        email: e.email,
                        password: e.password,
                        login: e.login,
                    })
                   .then(() => {
                       this.$router.push('/login');
                       this.$toast.success('Вы успешно зарегистрировались!');
                       this.loading = false;
                   })
                   .catch((e) => {
                       this.loading = false;
                       if(e.code === 'auth/email-already-in-use'){
                           this.$toast.error('Этот email уже занят, введите другой');
                       }
                       else{
                           this.$toast.error(e.code);
                       }
                   })


            }
        }
    }
</script>

<style scoped>

</style>
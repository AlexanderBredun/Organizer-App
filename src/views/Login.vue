<template>
    <WrapperView :maxWidth="'600'">
        <h2 class="text-2xl font-bold mb-5 text-center">
            Вход
        </h2>
        <ValidateFormWrapper

                @submitHandler="logginIn">
            <InputFormField
                    rules="required|email"
                    label="Email"
                    type-input="text"
                    name="email"
            ></InputFormField>
            <InputFormField
                    rules="required"
                    label="Пароль"
                    type-input="password"
                    name="passwordLogin"
            ></InputFormField>
            <AppButton
                    v-if="!loading"
                    class="mx-auto"
                    type="submit"
                    defaultBtn
            >
                Войти
            </AppButton>
            <Spinner v-else></Spinner>
        </ValidateFormWrapper>
        <p class="text-center">
            Нет аккаунта?  <router-link :to="{name: 'Register'}">Зарегистрируйтесь</router-link>
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
        name: "Login",
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
            logginIn(e){
                this.loading = true;
                this.$store.dispatch('auth/LOGIN_USER', {email: e.email, password: e.passwordLogin})
                    .then(()=>{
                        this.loading = false;
                        this.$router.push(this.$route.params.redirect || '/')
                    })
                    .catch((e)=> {
                        this.$toast.error(e.message)
                        this.loading = false;
                    })
            }
        }
    }
</script>

<style scoped>

</style>
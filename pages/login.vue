<template>
  <a-row class="login">

    <a-col class="login__box">
      <a-form class="login__form">
        <a-form-item>
          <a-input v-model="login.sign_in.email" placeholder="Email">
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="login.sign_in.password" type="password" :placeholder="$t('login.password')">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item class="marginless">
          <a-button type="primary" html-type="submit" class="login__submit" @click="userLogin">
            {{ $t('login.sign_in') }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>

export default {
  components: {
  },
  layout: 'clean',
  data () {
    return {
      login: {
        sign_in: {
          email: '',
          password: ''
        }
      }
    }
  },
  methods: {
    async userLogin () {
      /*try {
        await this.$auth.loginWith('local', { data: this.login })
      } catch (err) {
        this.$message.error('That password was incorrect. Please try again.')
      }*/
    }
  }
}
</script>

<style>
.ant-layout {
  background: none;
}

.layout_clean {
  background: none;
  padding: 0;
  margin: 0;
}

.login {
  max-width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

  .login__box {
    padding: 24px;
    background: white;
    display: flex;
    justify-content: center;
    width: 350px;
    max-width: 100%;
  }

  .login__form {
    width: 100%;
  }
  .login__submit {
    &.ant-btn {
      margin: 0 auto;
      display: table;
      width: 100%;
    }
  }

</style>

<template>
    <v-card>
        <v-container>
            <h2>お問い合わせ</h2>
            <v-form ref="form" v-model="contactFormValidation.valid" lazy-validation>
                <v-text-field
                        v-model="contactForm.name"
                        :rules="contactFormValidation.nameRules"
                        label="名前"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="contactForm.email"
                        :rules="contactFormValidation.emailRules"
                        label="メールアドレス"
                        required
                ></v-text-field>
                <v-textarea
                        v-model="contactForm.contents"
                        :rules="contactFormValidation.contentsRules"
                        label="内容"
                        required
                ></v-textarea>
                <v-btn :loading="loading" :disabled="!contactFormValidation.valid" @click="sendMail()" block large color="info" class="mt-4">送信</v-btn>
                <v-alert
                        :value="alertSuccess"
                        type="success"
                        outline
                        ransition="slide-y-transition"
                        class="mt-4"
                >
                    送信完了しました。
                </v-alert>
                <v-alert
                        :value="alertError"
                        type="error"
                        outline
                        ransition="slide-y-transition"
                        class="mt-4"
                >
                    送信に失敗しました。通信状態をご確認ください。
                </v-alert>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { functions } from "@/plugins/firebase";

export default {
  data: () => ({
    contactForm: {
      name: "",
      contents: "",
      email: ""
    },
    contactFormValidation: {
      valid: false,
      nameRules: [v => !!v || "名前は必須項目です"],
      emailRules: [v => !!v || "メールアドレスは必須項目です"],
      contentsRules: [v => !!v || "内容は必須項目です"]
    },
    alertSuccess: false,
    alertError: false,
    loading: false
  }),
  methods: {
    sendMail: function() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const mailer = functions.httpsCallable("sendMail");

        mailer(this.contactForm)
          .then(result => {
            this.formReset();
            this.showAlertSuccess();
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    showAlertSuccess: function() {
      this.alertSuccess = true;
      setTimeout(() => {
        this.alertSuccess = false;
      }, 3500);
    },
    showAlertError: function() {
      this.alertError = true;
      setTimeout(() => {
        this.alertError = false;
      }, 3500);
    },
    formReset: function() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
</style>

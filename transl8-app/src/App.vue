<template>
  <v-app id="t8-app">
    <v-container fluid id="t8-container">
      <v-layout row>
        <v-flex xs6>
          <v-toolbar class="top-toolbar" prominent color="hwhite" flat>
            <v-layout>
              <v-flex xs2>
                <v-img id="logo" src="./static/logo.png" contain></v-img>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6>
                <v-select 
                  background-color="blurple"
                  dark
                  label="Select a language"
                  prepend-inner-icon="translate"
                  solo
                  color="hwhite"
                  ></v-select>
                </v-flex>
            </v-layout>
          </v-toolbar>
        </v-flex>
        <v-flex xs6>
          <v-toolbar class="top-toolbar" prominent color="blurple" flat>
            <v-layout>
              <v-flex xs6>
                <v-select 
                  color="blurple"
                  prepend-inner-icon="translate"
                  solo
                  reverse
                  label="Select a language"
                  ></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs3></v-flex>
            </v-layout>
          </v-toolbar>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-card tile class="convo" flat color="hwhite">
            <v-container class="convo-container" ref="left-convo">
              
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card tile class="convo" flat color="blurple">
            <v-container class="convo-container right-convo" ref="right-convo">

            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-footer color="blurple" app height="auto">
      <v-container id="footer-container">
        <v-layout row align-center justify-center fill-height>
          <v-flex xs6>
            <v-card tile flat color="hwhite" class="input-card">
                <v-layout row id="left-bar">
                  <v-flex xs1>
                    <v-btn class="record-btn" small dark color="blurple" fab>
                      <v-icon>keyboard_voice</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs11>
                    <v-text-field 
                      append-icon="send" 
                      color="blurple"
                      label="Send a message" 
                      @click:append="sendLeft()"
                      @keyup.enter="sendLeft()"
                      v-model="leftText"
                      flat 
                      light 
                      solo 
                      background-color="hwhite darken-1">
                    </v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card tile flat color="blurple" class="input-card">
                <v-layout reverse row id="right-bar">
                  <v-flex xs1>
                    <v-btn class="record-btn" small light color="hwhite" fab>
                      <v-icon color="blurple">keyboard_voice</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex id="text-input" xs11>
                    <v-text-field 
                      reverse 
                      append-icon="send"
                      @click:append="sendRight()"
                      @keyup.enter="sendRight()"
                      v-model="rightText"
                      color="hwhite darken-1" 
                      label="Send a message" 
                      flat 
                      solo 
                      dark 
                      background-color="blurple darken-1">
                    </v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>

import SentMessage from './components/SentMessage.vue'
import ReceivedMessage from './components/ReceivedMessage.vue'
import Vue from 'vue'

export default {
  name: "App",
  data() {
    return {
      showConfusion: false,
      leftText: '',
      rightText: ''
    }
  },
  components: {
    SentMessage, ReceivedMessage
  },
  methods: {
    injectConfusion: function() {
      this.showConfusion = false;
    },
    sendRight: function() {
      console.log(this.rightText);
      this.sentFactory(this.rightText, 'right-convo')
      this.receivedFactory(this.rightText, 'left-convo');
      this.rightText='';
    },
    sendLeft: function() {
      console.log(this.leftText);
      this.sentFactory(this.leftText, 'left-convo')
      this.receivedFactory(this.leftText, 'right-convo');
      this.leftText='';
    },
    sentFactory: function(message, convo) {
      var Sent = Vue.extend(SentMessage)
      var sent = new Sent({propsData: {text: message, side: convo}})
      sent.$mount()
      this.$refs[convo].appendChild(sent.$el)
      this.$forceUpdate();
    },
    receivedFactory: function(message, convo) {
      var Received = Vue.extend(ReceivedMessage)
      var received = new Received({propsData: {text: message, side: convo}})
      received.$mount()
      this.$refs[convo].appendChild(received.$el)
      this.$forceUpdate();
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600&subset=latin-ext");
#app {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.i-am-confusion {
  border-radius: 30px;
}

#left-bar {
  padding-top: 30px;
  padding-left: 10px;
}

#right-bar {
  padding-top:30px;
  padding-right: 10px;
}

.v-icon.material-icons.theme--dark {
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}

.record-btn {
  margin-left: 10px;
  margin-right: 10px;
}

.convo {
  min-height: 90vh;
  padding: 0px;
}

.convo-container {
  padding-left: 0px;
  padding-right: 0px;
  margin-left: 0px;
  margin-right: 0px;
  min-height: 90%;
  min-width: 100%;
  overflow-x: hidden;
}

.right-convo {
  padding-right: 15px;
}

.v-footer, .input-card {
  min-height: 6vh;
}

.top-toolbar {
  margin: 0px;
  padding: 20px;
  min-height: 10vh;
  align-items: center;
  align-content: center;
}

.v-list .theme--dark, .v-menu__content {
  background: #4F4FE9;
}

.lang-select {
  margin-top: 100px;
  margin-right: 1000px;
}

#t8-app, #t8-container{
  min-height: 100%;
  min-width: 100vw; 
  z-index: 0;
  overflow: hidden;
}

#t8-container, #footer-container {
  margin: 0px;
  padding: 0px;
}

#footer-container {
  min-width: 100vw;
  overflow:hidden;
}
</style>
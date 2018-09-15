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
              <v-flex xs7>
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
              <v-flex xs7>
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


          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card tile class="convo" flat color="blurple">


          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-footer color="blurple" app height="auto">
      <v-container id="footer-container">
        <v-layout row align-center justify-center fill-height>
          <v-flex xs6>
            <v-card tile flat color="hwhite" class="input-card">
                <v-layout row class="bottom-bar">
                  <v-spacer></v-spacer>
                  <v-flex xs1>
                    <v-btn id="audio-input" small dark color="blurple" fab>
                      <v-icon>keyboard_voice</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs11>
                    <v-text-field append-icon="send" color="hwhite" flat light solo background-color="hwhite darken-1">
                    </v-text-field>
                  </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card tile flat color="blurple" class="input-card">
                <v-layout reverse row class="bottom-bar">
                  <v-spacer></v-spacer>
                  <v-flex xs1>
                    <v-btn id="audio-input" small light color="hwhite" fab>
                      <v-icon color="blurple">keyboard_voice</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex id="text-input" xs11>
                    <v-text-field reverse append-icon="send" color="blurple" flat solo dark background-color="blurple darken-1">
                    </v-text-field>
                  </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {}
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
  margin-top: 60px;
}

.v-icon.material-icons.theme--dark {
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}

.convo {
  min-height: 90vh;
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
  min-height: 100vh;
  min-width: 100vw;
  z-index: 0;
}

#t8-container, #footer-container {
  margin: 0px;
  padding: 0px;
}

#footer-container {
  min-width: 100vw;
}
</style>
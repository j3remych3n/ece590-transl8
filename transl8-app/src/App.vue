<template>
  <v-app id="t8-app">
    <v-container fluid id="t8-container">
      <v-layout row>
        <v-flex xs6>
          <v-toolbar class="top-toolbar" light prominent color="hwhite" flat>
            <v-img id="logo" src="./static/logo.png" contain></v-img>
            <v-spacer></v-spacer>
             <v-select 
              background-color="blurple"
              dark
              label="Select a language"
              prepend-inner-icon="translate"
              solo
              class="lang-select"
              ></v-select>
          </v-toolbar>
        </v-flex>
        <v-flex  xs6>
          <v-toolbar class="top-toolbar" prominent color="blurple" flat>
            <v-select 
              color="blurple"
              prepend-inner-icon="translate"
              solo
              ></v-select>
              <v-spacer></v-spacer>
          </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
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

.top-toolbar {
  margin: 0px;
  padding: 0px;
  min-height: 7vh;
  align-items: center;
  align-content: center;
}

#logo {
  margin-top: 20px;
}

.v-layout {
  align-content: center;
  align-items: center;
}

.lang-select {
  margin-top: 100px;
  margin-right: 1000px;
}

#t8-app, #t8-container {
  min-height: 100vh;
  min-width: 100%;
}

#t8-container {
  margin: 0px;
  padding: 0px;
}
</style>
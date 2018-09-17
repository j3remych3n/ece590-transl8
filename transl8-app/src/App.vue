<template>
  <v-app id="t8-app">
    <v-container fluid id="t8-container">
      <v-layout row>
        <v-flex xs6>
          <v-toolbar class="topspacer" v-if="!convoEnabled()" prominent color="hwhite" flat></v-toolbar>
          <v-toolbar class="toptoolbar" prominent color="hwhite" flat>
            <v-layout>
              <v-flex xs2>
                <v-img id="logo" src="./static/logo.png" contain></v-img>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6>
                <v-select 
                  v-model= "nameLeft"
                  v-on:change="updateLeftLang()"
                  :items = "langList()"
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
          <v-toolbar class="topspacer" v-if="!convoEnabled()" prominent color="blurple" flat></v-toolbar>
          <v-toolbar class="toptoolbar" prominent color="blurple" flat>
            <v-layout>
              <v-flex xs6>
                <v-select 
                  v-model= "nameRight"
                  v-on:change="updateRightLang()"
                  :items = "langList()"
                  color="blurple"
                  prepend-inner-icon="translate"
                  solo
                  reverse
                  label="Select a language"
                  ></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs1></v-flex>
                <v-flex xs2>
                  <v-card v-if="convoEnabled()" color="hwhite" id="exit">
                    <v-layout row>
                      <v-spacer></v-spacer>
                      <v-flex xs2>
                        <v-btn @click="openQualtrics()" large absolute icon>
                          <v-icon color="blurple">rate_review</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex xs5>
                        <v-btn @click="resetConvo()" large absolute icon>
                          <v-icon color="blurple">close</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex xs3></v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
            </v-layout>
          </v-toolbar>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-card tile v-bind:class="{convo: convoEnabled(), fscrn: !convoEnabled()}" flat color="hwhite">
            <v-container class="convo-container" ref="left-convo">
              
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card tile v-bind:class="{convo: convoEnabled(), fscrn: !convoEnabled()}" flat color="blurple">
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
            <v-card tile flat v-bind:color="leftRecordColor" class="input-card">
                <v-layout row id="left-bar">
                  <v-flex xs1>
                    <v-btn v-if="!leftRecord && convoEnabled()" @click="startLeftRecord()" class="record-btn" small dark color="blurple" fab>
                      <v-icon>keyboard_voice</v-icon>
                    </v-btn>
                    <v-btn v-if="leftRecord && convoEnabled()" @click="stopLeftRecord()" class="record-btn" small dark color="red" fab>
                      <v-icon color="hwhite">stop</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs11>
                    <v-text-field
                      v-if="convoEnabled()"
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
            <v-card tile flat v-bind:color="rightRecordColor" class="input-card">
                <v-layout reverse row id="right-bar">
                  <v-flex xs1>
                    <v-btn v-if="!rightRecord && convoEnabled()" @click="startRightRecord()" class="record-btn" small light color="hwhite" fab>
                      <v-icon color="blurple">keyboard_voice</v-icon>
                    </v-btn>
                    <v-btn v-if="rightRecord && convoEnabled()" @click="stopRightRecord()" class="record-btn" small dark color="red" fab>
                      <v-icon color="hwhite">stop</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex id="text-input" xs11>
                    <v-text-field 
                      v-if="convoEnabled()"
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
import SentMessage from "./components/SentMessage.vue";
import ReceivedMessage from "./components/ReceivedMessage.vue";

import Vue from "vue";
import { EventBus } from "./event-bus.js";

let https = require("https");
let subscriptionKey = "a4d0c7a5720842ed83e77cb74c6ef0e9";
let speechKey = "efa9e4a359814571bee3694144a4db48";
let host = "api.cognitive.microsofttranslator.com";
let langPath = "/languages?api-version=3.0";
let transPath = "/translate?api-version=3.0";

export default {
  name: "App",
  data() {
    return {
      keys: {
        translate: "",
        speech: ""
      },
      recognition: {},
      righRecognition: {},
      leftRecordColor: "hwhite",
      rightRecordColor: "blurple",
      showConfusion: false,
      leftText: "",
      rightText: "",
      leftRecord: false,
      rightRecord: false,
      nameLeft: "",
      nameRight: "",
      langLeft: {},
      langRight: {},
      langMap: {
        af: { name: "Afrikaans", nativeName: "Afrikaans", dir: "ltr" },
        ar: { name: "Arabic", nativeName: "العربية", dir: "rtl" },
        bg: { name: "Bulgarian", nativeName: "Български", dir: "ltr" },
        bn: { name: "Bangla", nativeName: "বাংলা", dir: "ltr" },
        bs: { name: "Bosnian", nativeName: "bosanski (latinica)", dir: "ltr" },
        ca: { name: "Catalan", nativeName: "Català", dir: "ltr" },
        cs: { name: "Czech", nativeName: "Čeština", dir: "ltr" },
        cy: { name: "Welsh", nativeName: "Welsh", dir: "ltr" },
        da: { name: "Danish", nativeName: "Dansk", dir: "ltr" },
        de: { name: "German", nativeName: "Deutsch", dir: "ltr" },
        el: { name: "Greek", nativeName: "Ελληνικά", dir: "ltr" },
        en: { name: "English", nativeName: "English", dir: "ltr" },
        es: { name: "Spanish", nativeName: "Español", dir: "ltr" },
        et: { name: "Estonian", nativeName: "Eesti", dir: "ltr" },
        fa: { name: "Persian", nativeName: "Persian", dir: "rtl" },
        fi: { name: "Finnish", nativeName: "Suomi", dir: "ltr" },
        fil: { name: "Filipino", nativeName: "Filipino", dir: "ltr" },
        fj: { name: "Fijian", nativeName: "Fijian", dir: "ltr" },
        fr: { name: "French", nativeName: "Français", dir: "ltr" },
        he: { name: "Hebrew", nativeName: "עברית", dir: "rtl" },
        hi: { name: "Hindi", nativeName: "हिंदी", dir: "ltr" },
        hr: { name: "Croatian", nativeName: "Hrvatski", dir: "ltr" },
        ht: {
          name: "Haitian Creole",
          nativeName: "Haitian Creole",
          dir: "ltr"
        },
        hu: { name: "Hungarian", nativeName: "Magyar", dir: "ltr" },
        id: { name: "Indonesian", nativeName: "Indonesia", dir: "ltr" },
        is: { name: "Icelandic", nativeName: "Íslenska", dir: "ltr" },
        it: { name: "Italian", nativeName: "Italiano", dir: "ltr" },
        ja: { name: "Japanese", nativeName: "日本語", dir: "ltr" },
        ko: { name: "Korean", nativeName: "한국어", dir: "ltr" },
        lt: { name: "Lithuanian", nativeName: "Lietuvių", dir: "ltr" },
        lv: { name: "Latvian", nativeName: "Latviešu", dir: "ltr" },
        mg: { name: "Malagasy", nativeName: "Malagasy", dir: "ltr" },
        ms: { name: "Malay", nativeName: "Melayu", dir: "ltr" },
        mt: { name: "Maltese", nativeName: "Il-Malti", dir: "ltr" },
        mww: { name: "Hmong Daw", nativeName: "Hmong Daw", dir: "ltr" },
        nb: { name: "Norwegian", nativeName: "Norsk", dir: "ltr" },
        nl: { name: "Dutch", nativeName: "Nederlands", dir: "ltr" },
        otq: {
          name: "Querétaro Otomi",
          nativeName: "Querétaro Otomi",
          dir: "ltr"
        },
        pl: { name: "Polish", nativeName: "Polski", dir: "ltr" },
        pt: { name: "Portuguese", nativeName: "Português", dir: "ltr" },
        ro: { name: "Romanian", nativeName: "Română", dir: "ltr" },
        ru: { name: "Russian", nativeName: "Русский", dir: "ltr" },
        sk: { name: "Slovak", nativeName: "Slovenčina", dir: "ltr" },
        sl: { name: "Slovenian", nativeName: "Slovenščina", dir: "ltr" },
        sm: { name: "Samoan", nativeName: "Samoan", dir: "ltr" },
        "sr-Cyrl": {
          name: "Serbian (Cyrillic)",
          nativeName: "srpski (ćirilica)",
          dir: "ltr"
        },
        "sr-Latn": {
          name: "Serbian (Latin)",
          nativeName: "srpski (latinica)",
          dir: "ltr"
        },
        sv: { name: "Swedish", nativeName: "Svenska", dir: "ltr" },
        sw: { name: "Kiswahili", nativeName: "Kiswahili", dir: "ltr" },
        ta: { name: "Tamil", nativeName: "தமிழ்", dir: "ltr" },
        te: { name: "Telugu", nativeName: "తెలుగు", dir: "ltr" },
        th: { name: "Thai", nativeName: "ไทย", dir: "ltr" },
        tlh: { name: "Klingon", nativeName: "Klingon", dir: "ltr" },
        to: { name: "Tongan", nativeName: "lea fakatonga", dir: "ltr" },
        tr: { name: "Turkish", nativeName: "Türkçe", dir: "ltr" },
        ty: { name: "Tahitian", nativeName: "Tahitian", dir: "ltr" },
        uk: { name: "Ukrainian", nativeName: "Українська", dir: "ltr" },
        ur: { name: "Urdu", nativeName: "اردو", dir: "rtl" },
        vi: { name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr" },
        yua: { name: "Yucatec Maya", nativeName: "Yucatec Maya", dir: "ltr" },
        yue: {
          name: "Cantonese (Traditional)",
          nativeName: "粵語 (繁體中文)",
          dir: "ltr"
        },
        "zh-Hans": {
          name: "Chinese Simplified",
          nativeName: "简体中文",
          dir: "ltr"
        },
        "zh-Hant": {
          name: "Chinese Traditional",
          nativeName: "繁體中文",
          dir: "ltr"
        }
      }
    };
  },
  components: {
    SentMessage,
    ReceivedMessage
  },
  created: function() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
        console.log(this.recognition + 'is here');
        this.recognition.onsoundstart = function (event) {
          console.log("detected sound left");
        }
    
    this.rightRecognition = new SpeechRecognition();
        console.log(this.rightRecognition + 'is here');
        this.rightRecognition.onsoundstart = function (event) {
          console.log("detected sound right");
        }
    EventBus.$on("confusion", (convo, msg) => {
      const confucius =
        '"' + msg + '" translated poorly, could you please rephrase?';

      if (convo === "left-convo") {
        this.sentFactory(confucius, convo);
        this.receivedFactory(confucius, "right-convo");
      } else {
        this.sentFactory(confucius, convo);
        this.receivedFactory(confucius, "left-convo");
      }
    });
  },
  methods: {
    getLangFromName: function(name) {
      return Object.keys(this.langMap).filter(
        k => this.langMap[k].nativeName == name
      )[0];
    },
    updateLeftLang: function() {
      this.langLeft = this.getLangFromName(this.nameLeft);
      console.log(this.langLeft);
    },
    updateRightLang: function() {
      this.langRight = this.getLangFromName(this.nameRight);
      console.log(this.langRight);
    },
    transHandler: function(factory, convo) {
      return function(response) {
        let body = "";
        response.on("data", function(d) {
          body += d;
        });
        response.on("end", function() {
          let json = JSON.stringify(JSON.parse(body), null, 4);
          let message = JSON.parse(body)[0].translations[0].text;
          factory(message, convo);
        });
        response.on("error", function(e) {
          console.log("Error: " + e.message);
          factory("ERR: Bad translation input", convo);
        });
      };
    },
    get_guid: function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    translate: function(text, lang1, lang2, factory, convo) {
      let content = JSON.stringify([{ Text: text }]);
      let params = '&from=' + lang1 + '&to=' + lang2;
      // let params = "&to=" + lang2;
      let request_params = {
        method: "POST",
        hostname: host,
        path: transPath + params,
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "X-ClientTraceId": this.get_guid()
        }
      };
      let req = https.request(
        request_params,
        this.transHandler(factory, convo)
      );
      req.write(content);
      req.end();
    },
    getLangHandler: function(response) {
      let body = "";
      response.on("data", function(d) {
        body += d;
      });
      response.on("end", function() {
        this.langMap = JSON.parse(body).translation;
        console.log(JSON.stringify(this.langMap));
      });
      response.on("error", function(e) {
        console.log("Error: " + e.message);
      });
    },
    langList: function() {
      return Object.keys(this.langMap).map(k => this.langMap[k].nativeName);
    },
    getLanguages: function() {
      let request_params = {
        method: "GET",
        hostname: host,
        path: langPath,
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey
        }
      };
      let req = https.request(request_params, this.getLangHandler);
      req.end();
    },
    openQualtrics() {
      window.open(
        "https://duke.qualtrics.com/jfe/form/SV_dbt3kA7eeqnrZg9",
        "_blank"
      );
    },
    resetConvo: function() {
      window.location.href = "https://transl8-jeremy-chen.herokuapp.com";
    },
    convoEnabled: function() {
      return (
        Object.keys(this.langLeft).length > 0 &&
        Object.keys(this.langRight).length > 0
      );
    },
    startLeftRecord: function() {
      this.leftRecord = true;
      this.leftRecordColor = "blurple";
      const upper = this;
      // FROM https://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascripr
      this.recognition.onresult = function(event) {
          console.log("received some result");
          var current = event.resultIndex;
          var transcript = event.results[current][0].transcript;
          if(upper.leftText == undefined) {
            upper.leftText = '';
          }
          upper.leftText = transcript;
          console.log(upper.leftText);
          upper.$forceUpdate();
          upper.stopLeftRecord();
        };
      this.recognition.lang = this.langLeft;
      this.recognition.start();
    }, 
    stopLeftRecord: function() {
      this.leftRecord = false;
      this.leftRecordColor = "hwhite";
      this.recognition.stop();
      console.log('end result: ' + this.leftText);
      
    },
    startRightRecord: function() {
      this.rightRecord = true;
      this.rightRecordColor = "hwhite";

      const upper = this;
      // FROM https://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascripr
      this.rightRecognition.onresult = function(event) {
          console.log("received some result");
          var current = event.resultIndex;
          var transcript = event.results[current][0].transcript;
          if(upper.rightText == undefined) {
            upper.rightText = '';
          }
          upper.rightText = transcript;
          console.log(upper.rightText);
          upper.$forceUpdate();
          upper.stopRightRecord();
        };
      this.rightRecognition.lang = this.langRight;
      this.rightRecognition.start();
    },
    stopRightRecord: function() {
      this.rightRecord = false;
      this.rightRecordColor = "blurple";
      this.rightRecognition.stop();
      console.log('end result: ' + this.rightText);
    },
    sendRight: function() {
      console.log(this.rightText);
      this.sentFactory(this.rightText, "right-convo");
      this.receivedFactory(this.rightText, "left-convo");
      
      var msgDiv = document.getElementsByTagName("html")[0];
      console.log(msgDiv);
      msgDiv.scrollTop = msgDiv.scrollHeight;
      this.rightText = "";
    },
    sendLeft: function() {
      console.log(this.leftText);
      this.sentFactory(this.leftText, "left-convo");
      this.receivedFactory(this.leftText, "right-convo");
      
      var msgDiv = document.getElementsByTagName("html")[0];
      console.log(msgDiv);
      msgDiv.scrollTop = msgDiv.scrollHeight;
      this.leftText = "";
    },
    sentFactory: function(message, convo) {
      var regex = "^\\s+$";
      if (!message.match(regex)) {
        var Sent = Vue.extend(SentMessage);
        var sent = new Sent({ propsData: { text: message, side: convo } });
        sent.$mount();
        this.$refs[convo].appendChild(sent.$el);
        this.$forceUpdate();
      }
    },
    receivedFactory: function(message, convo) {
      var regex = "^\\s+$";
      if (!message.match(regex)) {
        if (convo == "left-convo") {
          this.translate(
            message,
            this.langRight,
            this.langLeft,
            this.receivedFactory2,
            convo
          );
        } else {
          this.translate(
            message,
            this.langLeft,
            this.langRight,
            this.receivedFactory2,
            convo
          );
        }
      }
    },
    receivedFactory2: function(message, convo) {
      var Received = Vue.extend(ReceivedMessage);
      var received = new Received({
        propsData: { text: message, side: convo }
      });
      received.$mount();
      this.$refs[convo].appendChild(received.$el);
      this.$forceUpdate();
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600&subset=latin-ext");
#t8-app {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topspacer {
  min-height: 45vh;
}

.text-card-sent {
  margin-top: 20px;
  border-radius: 20px 0px 0px 20px;
  min-height: 50px;
  margin-bottom: 20px;
}

.text-card-received {
  margin-top: 20px;
  border-radius: 0px 20px 20px 0px;
  min-height: 50px;
  margin-bottom: 20px;
}

.fscrn {
  min-height: 90vh;
}

.i-am-confusion {
  border-radius: 30px;
}

#left-bar {
  padding-top: 30px;
  padding-left: 10px;
}

#right-bar {
  padding-top: 30px;
  padding-right: 10px;
}

#exit {
  margin-top: -25px;
  margin-right: -30px;
  min-height: 6vh;
  min-width: 3vw;
  border-radius: 0px 0px 0px 50px;
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
  min-height: 80vh;
  max-height: 80hvh;
  padding: 0px;
  padding-bottom: 75px;
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

.v-footer,
.input-card {
  min-height: 6vh;
}

.toptoolbar {
  margin: 0px;
  padding: 20px;
  min-height: 10vh;
  align-items: center;
  align-content: center;
}

.v-list .theme--dark,
.v-menu__content {
  background: #4f4fe9;
}

.lang-select {
  margin-top: 100px;
  margin-right: 1000px;
}

#t8-app,
#t8-container {
  min-height: 100%;
  min-width: 100vw;
  z-index: 0;
  overflow: hidden;
}

#t8-container,
#footer-container {
  margin: 0px;
  padding: 0px;
}

#footer-container {
  min-width: 100vw;
  overflow: hidden;
}
</style>
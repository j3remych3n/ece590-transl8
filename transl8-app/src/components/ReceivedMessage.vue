<template>
<v-layout row>
    <v-card class="text-card-received" v-bind:color="blockColor" style="margin-left:-25px; margin-top: 20px; border-radius: 0px 20px 20px 0px; min-height: 50px; margin-bottom: 20px;">
        <v-card-text v-bind:color="textColor">{{this.text}}</v-card-text>
        <v-btn
            small
            absolute
            dark
            fab
            top
            right
            color="blurple"
            class="help-btn"
            @click.native.stop="showConfusion = true"
             v-if="side=='left-convo'"
            >?
        </v-btn>
        <v-btn
            small
            absolute
            dark
            fab
            top
            right
            color="blurple darken-1"
            class="help-btn"
            @click.native.stop="showConfusion = true"
             v-if="side=='right-convo'"
            >?
        </v-btn>
    </v-card>
            <!-- REFACTOR THIS TO OWN COMPONENT, CONFUSION MODAL -->
            <v-dialog
                v-model="showConfusion"
                width="300px"
                height="150px"
                hide-overlay
                flat
                >
                <v-card dark color="blurple">
                    <v-card-title class="headline">Confusing translation?</v-card-title>
                    <v-card-actions>
                        <v-layout>
                          <v-spacer></v-spacer>
                          <v-btn light small fab color="blurple darken-1" @click="injectConfusion()">
                            <v-icon color="hwhite">
                              check
                            </v-icon>
                          </v-btn>
                          <v-btn small light fab color="hwhite" @click="showConfusion=false">
                            <v-icon color="blurple">
                              close
                            </v-icon>
                          </v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- END CONFUSION MODAL -->
        <v-spacer></v-spacer>
    </v-layout>
</template>

<script>
import { EventBus } from '../event-bus.js';

export default {
  name: "received-message",
  props: ["text", "side"],
  data() {
    return {
      obfuscatable: true,
      blockColor: "hwhite",
      textColor: "blurple darken-1",
      showConfusion: false
    };
  },
  methods: {
    injectConfusion: function() {
      this.showConfusion = false;
      EventBus.$emit('confusion', this.side, this.text);
    },
    expire: function() {
      this.obfuscatable = false;
    },
    initColors: function() {
      if (this.side == "left-convo") this.blockColor = "hwhite darken-1";
    }
  },
  beforeMount: function() {
    this.initColors();
  }
};
</script>

<style>
.text-card-received {
  margin-top: 20px; border-radius: 0px 20px 20px 0px; min-height: 50px; margin-bottom: 20px;
}
</style>
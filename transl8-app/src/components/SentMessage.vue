<template>
<v-layout>
    <v-spacer></v-spacer>
    <v-card dark class="text-card-sent" v-bind:color="blockColor">
        <v-card-text v-bind:color="textColor">{{this.text}}</v-card-text>
    </v-card>
</v-layout>
</template>

<script>
export default {
    name: "sent-message",
    props: ['text', 'side'],
    data () {
        return{
            blockColor: 'blurple darken-1',
            textColor: 'hwhite'
        }
    },
    methods: {
        initColors: function() {
            if(this.side == 'left-convo') this.blockColor = 'blurple'
        }
    },
    beforeMount: function() {
        this.initColors();
    }
}
</script>

<style>
.text-card-sent {
  margin-top: 20px;
  border-radius: 20px 0px 0px 20px;
  min-height: 50px;
  margin-bottom: 20px;
}
</style>
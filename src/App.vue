<template>
  <div id="app">
    <div class="container grid-lg">
      <div class="columns">
        <div class="column col-12 text-center mb-2">
          <h1>Aufgaben-Generator</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column col-6 col-md-12">
          <h3 class="text-center">Einstellung</h3>

          <div class="card">
            <div class="card-body">

              <h5>Zahlenbereich 1. Faktor / Divisor</h5>
              <div class="columns">
                <div class="column col-6">
                  <div class="input-group" :class="{ 'has-error': error.min1 }">
                    <span class="input-group-addon addon-lg">Von</span>
                    <input class="form-input input-lg" v-model="min1" type="number" placeholder="z.B. 1">
                  </div>
                </div>
                <div class="column col-6">
                  <div class="input-group" :class="{ 'has-error': error.max1 }">
                    <span class="input-group-addon addon-lg">Bis</span>
                    <input class="form-input input-lg" v-model="max1" type="number" placeholder="z.B. 10">
                  </div>
                </div>
              </div>

              <h5 class="mt-3">Zahlenbereich 2. Faktor / Quotient</h5>
              <div class="columns">
                <div class="column col-6">
                  <div class="input-group" :class="{ 'has-error': error.min2 }">
                    <span class="input-group-addon addon-lg">Von</span>
                    <input class="form-input input-lg" v-model="min2" type="number" placeholder="z.B. 1">
                  </div>
                </div>
                <div class="column col-6">
                  <div class="input-group" :class="{ 'has-error': error.max2 }">
                    <span class="input-group-addon addon-lg">Bis</span>
                    <input class="form-input input-lg" v-model="max2" type="number" placeholder="z.B. 10">
                  </div>
                </div>
              </div>

              <h5 class="mt-3">Anzahl der Aufgaben</h5>
              <div class="columns">
                <div class="column col-6">
                  <div class="form-group" :class="{ 'has-error': error.number }">
                    <input class="form-input input-lg" v-model="number" type="number" placeholder="z.B. 20">
                  </div>
                </div>
                <div class="column col-6">
                  <div class="form-group">
                    <button class="btn btn-primary float-right btn-lg" @click="generateTasks">Start <i class="icon icon-arrow-right"></i></button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="column col-6 col-md-12">
          <h3 class="text-center">Ausgabe</h3>

          <div class="empty output" v-if="!result">
            <div class="empty-icon">
              <i class="icon icon-3x icon-stop"></i>
            </div>
            <p class="empty-title h5">Noch kein Ergebnis verfügbar</p>
            <p class="empty-subtitle">Fülle das Formular aus und klicke auf <span class="text-italic">Start</span>,<br />um Aufgaben zu generieren.</p>
          </div>
          <div class="card output" v-else>
            <div class="card-body">
              <div class="columns">
                <div class="column col-6">
                  <h5>Multiplikation</h5>
                  <ul id="mlist">
                    <li v-for="t in mtasks" :key="t">{{ t }}</li>
                  </ul>
                  <button class="btn clip" :class="{ 'btn-success': copied.mlist }" data-clipboard-target="#mlist" @click="copied.mlist = true; copied.dlist = false">
                    <template v-if="!copied.mlist">Kopieren</template>
                    <i v-else class="icon icon-check"></i>
                  </button>
                </div>
                <div class="column col-6">
                  <h5>Division</h5>
                  <ul id="dlist">
                    <li v-for="t in dtasks" :key="t">{{ t }}</li>
                  </ul>
                  <button class="btn clip" :class="{ 'btn-success': copied.dlist }" data-clipboard-target="#dlist" @click="copied.dlist = true; copied.mlist = false">
                    <template v-if="!copied.dlist">Kopieren</template>
                    <i v-else class="icon icon-check"></i>
                  </button>
                </div>
              </div>
              <div class="columns mt-3" v-if="number > maxnumber">
                <div class="column col-12">
                  <p>Maximale Aufgabenzahl erreicht ({{ maxnumber }} Kombinationen möglich)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="columns mt-3 pb-5">
        <div class="column col-12">
          <p>Alle Angaben und Ergebnisse ohne Gewähr</p>
        </div>
      </div>
    </div>

    <footer>
      <div class="container grid-lg">
        <div class="columns">
          <div class="column col-12 text-center text-gray">
            <p>
              <span class="d-block">v{{ $version }}</span>
              Created by <a href="https://twitter.com/devmount" target="_blank">Andreas Müller</a>.
              Download on <a href="https://github.com/devmount/task-generator" target="_blank">GitHub</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'app',
  data () {
    return {
      min1: '',
      max1: '',
      min2: '',
      max2: '',
      number: '',
      error: {
        min1: false,
        max1: false,
        min2: false,
        max2: false,
        number: false,
      },
      maxnumber: '',
      mtasks: [],
      dtasks: [],
      result: false,
      copied: {
        mlist: false,
        dlist: false,
      }
    }
  },
  methods: {
    generateTasks () {
      // check input
      this.error.min1 = (this.min1 === '') ? true : false
      this.error.max1 = (this.max1 === '') ? true : false
      this.error.min2 = (this.min2 === '') ? true : false
      this.error.max2 = (this.max2 === '') ? true : false
      this.error.number = (this.number === '') ? true : false
      // no error occured: create result
      if (!this.error.min1 && !this.error.max1 && !this.error.min2 && !this.error.max2 && !this.error.number) {
        this.result = true
        this.copied.mlist = false, this.copied.dlist = false
        // init lists, integerify inputs
        this.mtasks = [], this.dtasks = []
        this.min1 = Number(this.min1), this.max1 = Number(this.max1), this.min2 = Number(this.min2), this.max2 = Number(this.max2)
        // handle too high task number
        this.maxnumber = (Math.abs(this.min1-this.max1)+1)*(Math.abs(this.min2-this.max2)+1)
        if (this.number > this.maxnumber) {
          this.number = this.maxnumber
        }
        var a, b, r, task
        // generate multiplication tasks
        while (this.mtasks.length < this.number) {
          a = Math.floor(Math.random() * (this.max1 - this.min1 + 1)) + this.min1
          b = Math.floor(Math.random() * (this.max2 - this.min2 + 1)) + this.min2
          r = a * b
          task =  a + ' • ' + b + ' = ' + r
          if (!this.mtasks.includes(task)) {
            this.mtasks.push(task)
          }
        }
        // generate division tasks
        while (this.dtasks.length < this.number) {
          a = Math.floor(Math.random() * (this.max1 - this.min1 + 1)) + this.min1
          b = Math.floor(Math.random() * (this.max2 - this.min2 + 1)) + this.min2
          r = a * b
          // check division by zero
          if (b == 0) {
            r = a
            a = 'n.l.'
          }
          task =  r + ' : ' + b + ' = ' + a
          if (!this.dtasks.includes(task)) {
            this.dtasks.push(task)
          }
        }
      }
    }
  }
});
</script>

<style>
@import '~spectre.css/dist/spectre.min.css';
@import '~spectre.css/dist/spectre-icons.min.css';

#app {
  margin-top: 2em;
  min-height: calc(100vh - 3em);
  position: relative;
}
#app footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
#app footer p {
  color: #bcc3ce;
}
#app footer a {
  color: #8c8a89;
}
#app ul {
  list-style-type: none;
  margin-left: 0;
  font-family: "SF Mono", "Segoe UI Mono", "Roboto Mono", Menlo, Courier, monospace;
  line-height: 1.2;
}
#app .mt-3 {
  margin-top: 1em;
}
#app .pb-5 {
  padding-bottom: 5em;
}
#app .output {
  min-height: 296px;
}
#app .clip {
  min-width: 100px;
}
</style>

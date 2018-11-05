<template>
  <div id="app">
    <div class="container grid-lg">
      <div class="columns">
        <div class="column col-12 text-center">
          <h1>Aufgaben-Generator</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column col-6">
          <h3 class="text-center">Einstellung</h3>

          <div class="card">
            <div class="card-body">

              <h5>Zahlenbereich 1. Faktor / Divisor</h5>
              <div class="columns">
                <div class="column col-6">
                  <div class="form-group">
                    <input class="form-input" :value="min1" type="number" placeholder="Kleinster Wert, z.B. 1">
                  </div>
                </div>
                <div class="column col-6">
                  <div class="form-group">
                    <input class="form-input" :value="max1" type="number" placeholder="Größter Wert, z.B. 10">
                  </div>
                </div>
              </div>

              <h5 class="mt-3">Zahlenbereich 2. Faktor / Quotient</h5>
              <div class="columns">
                <div class="column col-6">
                  <div class="form-group">
                    <input class="form-input" :value="min2" type="number" placeholder="Kleinster Wert, z.B. 1">
                  </div>
                </div>
                <div class="column col-6">
                  <div class="form-group">
                    <input class="form-input" :value="max2" type="number" placeholder="Größter Wert, z.B. 10">
                  </div>
                </div>
              </div>

              <h5 class="mt-3">Anzahl der Aufgaben</h5>
              <div class="columns">
                <div class="column col-6">
                  <div class="form-group">
                    <input class="form-input" :value="number" type="number" placeholder="Aufgabenanzahl, z.B. 20">
                  </div>
                </div>
                <div class="column col-6">
                  <div class="form-group">
                    <button class="btn btn-primary float-right" @click="generateTasks">Aufgaben generieren <i class="icon icon-arrow-right"></i></button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="column col-6">
          <h3 class="text-center">Ausgabe</h3>

          <div class="card output">
            <div class="card-body">

              <div class="columns">
                <div class="column col-6">
                  <h5>Multiplikation</h5>
                  <ul>
                    <li v-for="t in mtasks">{{ t }}</li>
                  </ul>
                </div>
                <div class="column col-6">
                  <h5>Division</h5>
                  <ul>
                    <li v-for="t in dtasks">{{ t }}</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div class="columns mt-3">
        <div class="column col-12">
          <p>Alle Angaben und Ergebnisse ohne Gewähr</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      min1: '',
      max1: '',
      min2: '',
      max2: '',
      number: '',
      mtasks: [],
      dtasks: [],
    }
  },
  methods: {
    generateTasks () {
      this.mtasks = ['1','2','3']
      this.dtasks = ['1','2','3']
    }
  }
}
</script>

<style lang="scss">
$primary-color: #f57c00;

@import "node_modules/spectre.css/src/spectre";
@import "node_modules/spectre.css/src/spectre-icons";
@import "node_modules/spectre.css/src/spectre-exp";

#app {
  margin-top: 60px;
}

.mt-3 {
  margin-top: 1em;
}

.output {
  min-height: 284px;
}
</style>

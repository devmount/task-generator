<template>
  <h1 class="text-center m-0">Aufgaben-Generator</h1>
  <main class="grid grid-cols-2 gap-8">
    <section>
      <h3 class="text-center">Einstellung</h3>

      <form class="card" @submit.prevent="generateTasks">
        <h5>Zahlenbereich 1. Faktor / Divisor</h5>
        <div class="input-group">
          <span class="affix">Von</span>
          <input class="w-full" v-model="min1" type="number" placeholder="z.B. 1" required>
          <span class="affix">bis</span>
          <input class="w-full" v-model="max1" type="number" placeholder="z.B. 10" required>
        </div>

        <h5>Zahlenbereich 2. Faktor / Quotient</h5>
        <div class="input-group">
          <span class="affix">Von</span>
          <input class="w-full" v-model="min2" type="number" placeholder="z.B. 1" required>
          <span class="affix">bis</span>
          <input class="w-full" v-model="max2" type="number" placeholder="z.B. 10" required>
        </div>

        <h5>Anzahl der Aufgaben</h5>
        <div class="flex justify-between">
          <input v-model="number" type="number" placeholder="z.B. 20" required>
          <button type="submit">
            Start
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M9 6l6 6l-6 6" /></svg>
          </button>
        </div>

        <div v-if="number > maxnumber">
          <hr />
          <div class="callout accent">
            <p>Maximale Aufgabenzahl erreicht ({{ maxnumber }} Kombinationen möglich)</p>
          </div>
        </div>
      </form>
    </section>

    <section class="flex-col">
      <h3 class="text-center">Ausgabe</h3>

      <div v-if="!result" class="state empty rounded text-center grow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" /><path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" /><path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" /><path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" /><path d="M17 12h.01" /><path d="M13 12h.01" /></svg>
        <h4>Noch kein Ergebnis verfügbar</h4>
        <p>Fülle das Formular aus und klicke auf <span class="text-italic">Start</span>,<br />um Aufgaben zu generieren.</p>
      </div>

      <div v-else class="card grow">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <h5>Multiplikation</h5>
            <ul id="mlist" class="list-none p-0 font-mono">
              <li v-for="t in mtasks" :key="t">{{ t }}</li>
            </ul>
            <button class="hollow neutral clip" :class="{ 'success': copied.mlist }" @click="copy('M')">
              <template v-if="!copied.mlist">Kopieren</template>
              <template v-else>Kopiert!</template>
            </button>
          </div>
          <div>
            <h5>Division</h5>
            <ul class="list-none p-0 font-mono">
              <li v-for="t in dtasks" :key="t">{{ t }}</li>
            </ul>
            <button class="hollow neutral clip" :class="{ 'success': copied.dlist }" @click="copy('D')">
              <template v-if="!copied.dlist">Kopieren</template>
              <template v-else>Kopiert!</template>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="mt-auto text-center text-muted">
    <p>Alle Angaben und Ergebnisse ohne Gewähr</p>
    <p>
      <span class="block">v{{ $version }}</span>
      Created by <a href="https://twitter.com/devmount" target="_blank">Andreas Müller</a>.
      Download on <a href="https://github.com/devmount/task-generator" target="_blank">GitHub</a>.
    </p>
  </footer>
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
    },
    copy (mode) {
      switch (mode) {
        case 'M':
          navigator.clipboard.writeText(this.mtasks.join('\n'));
          this.copied.mlist = true;
          setTimeout(() => {
            this.copied.mlist = false;
          }, 2000);
          break;
        case 'D':
          navigator.clipboard.writeText(this.dtasks.join('\n'));
          this.copied.dlist = true;
          setTimeout(() => {
            this.copied.dlist = false;
          }, 2000);
          break;
        default:
          break;
      }
    }
  }
});
</script>

<style>
@import '@devmount/sloth.css/sloth.min.css';

:root {
  --color-accent: #3466b5;
}

#app {
  min-height: calc(100vh - 3rem);
}

.mt-auto {
  margin-top: auto;
}
.grow {
  flex-grow: 1;
}
.list-none {
	list-style-type: none;  
}
</style>

<script setup>
import { ref, reactive } from 'vue';

const min1 = ref('');
const max1 = ref('');
const min2 = ref('');
const max2 = ref('');
const number = ref('');
const maxnumber = ref('');
const mtasks = ref([]);
const dtasks = ref([]);
const result = ref(false);
const copied = reactive({
  mlist: false,
  dlist: false,
});

const generateTasks = () => {
  result.value = true;
  copied.mlist = false;
  copied.dlist = false;
  // init lists, integerify inputs
  mtasks.value = [];
  dtasks.value = [];
  min1.value = Number(min1.value);
  max1.value = Number(max1.value);
  min2.value = Number(min2.value);
  max2.value = Number(max2.value);
  // handle too high task number
  maxnumber.value = (Math.abs(min1.value - max1.value) + 1) * (Math.abs(min2.value - max2.value) + 1)
  if (number.value > maxnumber.value) {
    number.value = maxnumber.value
  }
  let a, b, r, task;
  // generate multiplication tasks
  while (mtasks.value.length < number.value) {
    a = Math.floor(Math.random() * (max1.value - min1.value + 1)) + min1.value;
    b = Math.floor(Math.random() * (max2.value - min2.value + 1)) + min2.value;
    r = a * b;
    task = a + ' • ' + b + ' = ' + r;
    if (!mtasks.value.includes(task)) {
      mtasks.value.push(task);
    }
  }
  // generate division tasks
  while (dtasks.value.length < number.value) {
    a = Math.floor(Math.random() * (max1.value - min1.value + 1)) + min1.value;
    b = Math.floor(Math.random() * (max2.value - min2.value + 1)) + min2.value;
    r = a * b;
    // check division by zero
    if (b == 0) {
      r = a;
      a = 'n.l.';
    }
    task = r + ' : ' + b + ' = ' + a;
    if (!dtasks.value.includes(task)) {
      dtasks.value.push(task);
    }
  }
}

const copy = (mode) => {
  switch (mode) {
    case 'M':
      navigator.clipboard.writeText(mtasks.value.join('\n'));
      copied.mlist = true;
      setTimeout(() => {
        copied.mlist = false;
      }, 2000);
      break;
    case 'D':
      navigator.clipboard.writeText(dtasks.value.join('\n'));
      copied.dlist = true;
      setTimeout(() => {
        copied.dlist = false;
      }, 2000);
      break;
    default:
      break;
  }
}
</script>

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

        <div v-if="result && number > maxnumber">
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
            <ul class="list-none p-0 font-mono">
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

.list-none {
  list-style-type: none;  
}
</style>

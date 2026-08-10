<script setup>
import { ref, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n({ useScope: 'global' });

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
      a = t('output.notDefined');
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

watch(locale, (val) => {
  localStorage.setItem('locale', val);
  document.documentElement.lang = val;
  document.title = t('title');
}, { immediate: true });
</script>

<template>
  <h1 class="text-center m-0">{{ t('title') }}</h1>
  <main class="grid grid-cols-2 gap-8">
    <section>
      <h3 class="text-center">{{ t('settings.heading') }}</h3>

      <form class="card" @submit.prevent="generateTasks">
        <h5>{{ t('settings.range1') }}</h5>
        <div class="input-group">
          <span class="affix">{{ t('settings.from') }}</span>
          <input class="w-full" v-model="min1" type="number" :placeholder="t('settings.placeholderMin')" required>
          <span class="affix">{{ t('settings.to') }}</span>
          <input class="w-full" v-model="max1" type="number" :placeholder="t('settings.placeholderMax')" required>
        </div>

        <h5>{{ t('settings.range2') }}</h5>
        <div class="input-group">
          <span class="affix">{{ t('settings.from') }}</span>
          <input class="w-full" v-model="min2" type="number" :placeholder="t('settings.placeholderMin')" required>
          <span class="affix">{{ t('settings.to') }}</span>
          <input class="w-full" v-model="max2" type="number" :placeholder="t('settings.placeholderMax')" required>
        </div>

        <h5>{{ t('settings.count') }}</h5>
        <div class="flex justify-between">
          <input v-model="number" type="number" :placeholder="t('settings.placeholderCount')" required>
          <button type="submit">
            {{ t('settings.start') }}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M9 6l6 6l-6 6" /></svg>
          </button>
        </div>

        <div v-if="result && number > maxnumber">
          <hr />
          <div class="callout accent">
            <p>{{ t('settings.maxReached', { count: maxnumber }) }}</p>
          </div>
        </div>
      </form>
    </section>

    <section class="flex-col">
      <h3 class="text-center">{{ t('output.heading') }}</h3>

      <div v-if="!result" class="state empty rounded text-center grow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
          <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
          <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
          <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
          <path d="M17 12h.01" />
          <path d="M13 12h.01" />
        </svg>
        <h4>{{ t('output.emptyTitle') }}</h4>
        <i18n-t keypath="output.emptyText" tag="p">
          <template #start><i>{{ t('settings.start') }}</i></template>
        </i18n-t>
      </div>

      <div v-else class="card grow">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <h5>{{ t('output.multiplication') }}</h5>
            <ul class="list-none p-0 font-mono">
              <li v-for="mt in mtasks" :key="mt">{{ mt }}</li>
            </ul>
            <button class="hollow neutral clip" :class="{ 'success': copied.mlist }" @click="copy('M')">
              <template v-if="!copied.mlist">{{ t('output.copy') }}</template>
              <template v-else>{{ t('output.copied') }}</template>
            </button>
          </div>
          <div>
            <h5>{{ t('output.division') }}</h5>
            <ul class="list-none p-0 font-mono">
              <li v-for="dt in dtasks" :key="dt">{{ dt }}</li>
            </ul>
            <button class="hollow neutral clip" :class="{ 'success': copied.dlist }" @click="copy('D')">
              <template v-if="!copied.dlist">{{ t('output.copy') }}</template>
              <template v-else>{{ t('output.copied') }}</template>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="mt-auto text-center text-muted">
    <p>
      <select class="sm" v-model="locale">
        <option value="de">Deutsch</option>
        <option value="en">English</option>
      </select>
    </p>
    <p>{{ t('footer.disclaimer') }}</p>
    <p>
      <pre>v{{ $version }}</pre>
      {{ t('footer.createdBy') }} <a href="https://twitter.com/devmount" target="_blank">Andreas Müller</a>.
      {{ t('footer.downloadOn') }} <a href="https://github.com/devmount/task-generator" target="_blank">GitHub</a>.
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

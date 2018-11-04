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
          <h2 class="text-center">Einstellung</h2>
        </div>
        <div class="column col-6">
          <h2 class="text-center">Ausgabe</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "node_modules/spectre.css/src/spectre";
@import "node_modules/spectre.css/src/spectre-icons";
@import "node_modules/spectre.css/src/spectre-exp";

#app {
  margin-top: 60px;
}
</style>

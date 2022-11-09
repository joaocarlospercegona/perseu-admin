<template>
  <q-page class="row q-col-gutter-x-md q-pa-md">
    <div class="col-md-4 col-xs-4" style="max-height: 30vh">
      <q-card
        class="fit cursor-pointer non-selectable"
        clickable
        @click="abrirTela('treinadores')"
      >
        <q-card-section class="fit">
          <div class="fit totalizador-grid">
            <div class="totalizador-valor">{{ treinadores }}</div>
            <div class="totalizador-icone">
              <q-icon name="description" color="primary" size="42px"></q-icon>
            </div>
            <div class="grid-2 totalizador-titulo">Treinadores</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-xs-4" style="max-height: 30vh">
      <q-card
        class="fit cursor-pointer non-selectable"
        clickable
        @click="abrirTela('atletas')"
      >
        <q-card-section class="fit">
          <div class="fit totalizador-grid">
            <div class="totalizador-valor">{{ treinadores }}</div>
            <div class="totalizador-icone">
              <q-icon name="description" color="primary" size="42px"></q-icon>
            </div>
            <div class="grid-2 totalizador-titulo">Atletas</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-xs-4" style="max-height: 30vh">
      <q-card
        class="fit cursor-pointer non-selectable"
        clickable
        @click="abrirTela('equipes')"
      >
        <q-card-section class="fit">
          <div class="fit totalizador-grid">
            <div class="totalizador-valor">{{ treinadores }}</div>
            <div class="totalizador-icone">
              <q-icon name="description" color="primary" size="42px"></q-icon>
            </div>
            <div class="grid-2 totalizador-titulo">Equipes</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      treinadores: 3,
    };
  },
  methods: {
    abrirTela(nome) {
      this.$router.push(`/${nome}`);
    },
  },
});
</script>

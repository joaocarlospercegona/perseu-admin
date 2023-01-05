<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="row justify-between">
        <div class="text-h6">Painel</div>
        <q-toolbar-title class="text-center">
          {{ $route.meta.titulo }}
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="fas fa-bars"
          aria-label="Menu"
          @click="menuPrincipal = !menuPrincipal"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="menuPrincipal"
      bordered
      side="right"
      overlay
      behavior="mobile"
      content-class="bg-grey-1"
    >
      <div class="column justify-between">
        <div
          class="full-width text-center bg-primary q-py-xl"
          @click="$router.push('/')"
        >
          <q-img src="images/logoColorida.png" height="20%" width="50%" />
        </div>
        <q-separator />
        <q-list>
          <div v-for="categoria in categorias" :key="categoria.name">
            <div>
              <q-expansion-item
                v-if="categoria.name"
                :icon="categoria.icon"
                expand-separator
                :ref="'expansion' + categoria.name"
                :label="categoria.name"
                header-class="text-body1 text-dark"
                @before-show="esconderCategorias(categoria.name)"
              >
                <q-list separator class="inset-shadow bg-grey-3">
                  <template v-for="item in categoria.links">
                    <q-item
                      class="text-body1 text-dark padding-item-drawer"
                      active-class="caminho-atual"
                      :exact="item.exact"
                      clickable
                      :to="item.path"
                      @click="itemClick()"
                      :key="item.title"
                      v-if="
                        !item.auth ||
                        item.auth.some((perfil) =>
                          temPerfil(getUsuario.perfis, perfil)
                        )
                      "
                    >
                      <q-item-section side>
                        <q-icon
                          :name="item.icon"
                          color="dark"
                          size="20px"
                        ></q-icon>
                      </q-item-section>
                      <q-item-section>
                        {{ item.title }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-expansion-item>
              <template v-else>
                <q-item
                  class="text-body1 text-dark"
                  active-class="caminho-atual"
                  :exact="categoria.exact"
                  clickable
                  :to="categoria.path"
                  @click="itemClick(categoria.name)"
                >
                  <q-item-section avatar>
                    <q-icon :name="categoria.icon" color="dark"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    {{ categoria.title }}
                  </q-item-section>
                </q-item>
              </template>
              <q-separator />
            </div>
          </div>
          <div>
            <q-separator />
            <router-link to="/logout" style="text-decoration: none">
              <q-item
                class="text-body1 text-negative"
                clickable
                @click="menuPrincipal = false"
              >
                <q-item-section avatar>
                  <q-icon name="fas fa-sign-out-alt" color="negative"></q-icon>
                </q-item-section>
                <q-item-section> Sair </q-item-section>
              </q-item>
            </router-link>
            <q-separator />
          </div>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container class="bg-grey-4">
      <transition
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view :key="$route.fullPath" />
      </transition>
    </q-page-container>
  </q-layout>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  name: "MainLayout",
  data() {
    return {
      itensModal: [],
      path: {
        path: "/",
      },
      usuario: {
        nome: "",
        email: "",
        ativo: true,
        empresas: [],
      },
      menuPrincipal: false,
      categorias: [
        {
          title: "Home",
          icon: "fas fa-home",
          path: "/",
          exact: true,
        },
        {
          icon: "fas fa-user",
          title: "Admins",
          path: "/admins",
        },
        {
          icon: "fas fa-id-badge",
          title: "Treinadores",
          path: "/treinadores",
        },
        {
          icon: "fas fa-users",
          title: "Atletas",
          path: "/atletas",
        },
        {
          icon: "fas fa-sitemap",
          title: "Equipes",
          path: "/equipes",
        },
      ],
      continuarCarregandoTela: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    esconderCategorias(nome) {
      for (let categoria of this.categorias) {
        if (categoria.name && categoria.name != nome) {
          this.$refs["expansion" + categoria.name][0].hide();
        }
      }
    },
    itemClick(nome) {
      this.menuPrincipal = false;
      this.esconderCategorias(nome);
    },
  },
  async created() {
    if (!this.getLogin.token) this.$router.push("/login");
    else {
    }
    this.continuarCarregandoTela = true;
  },
};
</script>

<style lang="sass" scoped>

.caminho-atual
	background-color: $primary !important
	color: white !important
	box-shadow: 1px 2px 2px 1px rgba(0,0,0,0.3) inset, -1px 0px 2px 1px rgba(0,0,0,0.3) inset

	& i
		color: white !important

.padding-item-drawer
	padding-left: 40px
.color-input
	background-color: #ffeb00
</style>

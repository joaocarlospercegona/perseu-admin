const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { titulo: "Dashboard" },
      },
      {
        path: "admins",
        component: () => import("pages/Admin/List.vue"),
        meta: { titulo: "Admins" },
        children: [
          {
            path: "show/:id",
            component: () => import("pages/Admin/Edit.vue"),
            meta: { titulo: "Ver Admin", isShow: true },
          },
          {
            path: "edit",
            component: () => import("pages/Admin/Edit.vue"),
            meta: { titulo: "Criar Admin" },
          },
          {
            path: "edit/:id",
            component: () => import("pages/Admin/Edit.vue"),
            meta: { titulo: "Editar Admin" },
          },
        ],
      },
      {
        path: "atletas",
        component: () => import("pages/Atleta/List.vue"),
        meta: { titulo: "Atletas" },
        children: [
          {
            path: "show/:id",
            component: () => import("pages/Atleta/Edit.vue"),
            meta: { titulo: "Ver Atleta", isShow: true },
          },
          {
            path: "edit",
            component: () => import("pages/Atleta/Edit.vue"),
            meta: { titulo: "Criar Atleta" },
          },
          {
            path: "edit/:id",
            component: () => import("pages/Atleta/Edit.vue"),
            meta: { titulo: "Editar Atleta" },
          },
        ],
      },
      {
        path: "treinadores",
        component: () => import("pages/Treinador/List.vue"),
        meta: { titulo: "Treinadores" },
        children: [
          {
            path: "show/:id",
            component: () => import("pages/Treinador/Edit.vue"),
            meta: { titulo: "Ver Treinador", isShow: true },
          },
          {
            path: "edit",
            component: () => import("pages/Treinador/Edit.vue"),
            meta: { titulo: "Criar Treinador" },
          },
          {
            path: "edit/:id",
            component: () => import("pages/Treinador/Edit.vue"),
            meta: { titulo: "Editar Treinador" },
          },
        ],
      },
      {
        path: "equipes",
        component: () => import("pages/Equipe/List.vue"),
        meta: { titulo: "Equipe" },
        children: [
          {
            path: "show/:id",
            component: () => import("pages/Equipe/Edit.vue"),
            meta: { titulo: "Ver Equipe", isShow: true },
          },
          {
            path: "edit",
            component: () => import("pages/Equipe/Edit.vue"),
            meta: { titulo: "Criar Equipe" },
          },
          {
            path: "edit/:id",
            component: () => import("pages/Equipe/Edit.vue"),
            meta: { titulo: "Editar Equipe" },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/logout",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

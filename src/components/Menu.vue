<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-navbar-brand href="#">Criador de Gráficos</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar>
        <router-link tag="li" to="/" class="nav-item" active-class="active" exact>
          <a class="nav-link">Lista de Gráficos</a>
        </router-link>
        <router-link tag="li" to="/groups" class="nav-item" active-class="active" exact>
          <a class="nav-link">Lista de Grupos de Gráficos</a>
        </router-link>
        <router-link tag="li" to="/view" class="nav-item" active-class="active"
          v-if="$route.name === 'View'">
          <a class="nav-link">Visualização</a>
        </router-link>
        <router-link tag="li" to="/edit" class="nav-item" active-class="active"
          v-if="$route.name === 'Edit'">
          <a class="nav-link">Edição</a>
        </router-link>
        <router-link tag="li" to="/groups/edit" class="nav-item" active-class="active"
          v-if="$route.name === 'GroupsEdit'">
          <a class="nav-link">Edição</a>
        </router-link>
        <router-link tag="li" to="/groups/view" class="nav-item" active-class="active"
          v-if="$route.name === 'GroupsView'">
          <a class="nav-link">Visualização</a>
        </router-link>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

</script>

<style scoped>
</style>

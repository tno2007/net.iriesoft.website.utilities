<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Sable form tester</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/home">Home</b-nav-item>
          <b-nav-item-dropdown text="Tools" right>
            <b-dropdown-item to="/tools/dependants">Dependants</b-dropdown-item>
            <b-dropdown-item to="/tools/formulate">Formulate</b-dropdown-item>
            <b-dropdown-item to="/tools/formulate2">Formulate2</b-dropdown-item>
            <b-dropdown-item to="/tools/time-converter"
              >Time Converter</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--    
    <div class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Iriesoft</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="home"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>
          <router-link
            to="about"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              :class="[
                isActive && 'active',
                isExactActive && 'router-link-exact-active',
              ]"
              class="nav-item"
            >
              <a class="nav-link" :href="href" @click="navigate">About</a>
            </li>
          </router-link>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="http://example.com"
              id="dropdown01"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >Tools</a
            >
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <router-link
                to="/tools/time-converter"
                class="dropdown-item"
                active-class="active"
                >Time converter</router-link
              >
              <router-link
                to="/tools/formulate"
                class="dropdown-item"
                active-class="active"
                >Formulate</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
    -->

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
}
</style>

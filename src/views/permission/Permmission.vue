<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/permission">admin</router-link>| <router-link to="/permission/role">role</router-link> |
    </div>
    <router-view />
  </div>
</template>

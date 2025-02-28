<template>
  <div class="not__found">
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <numbers/>
  </div>
</template>
  
  <script setup>
/* No specific logic needed for this component */
</script>
  
  <style lang="scss" scoped>
.not__found {
  text-align: center;
  margin: 170px 0;

  h1 {
    font-size: 10rem;
    color: rgba(115, 115, 115, 0.7);
  }

  p {
    font-size: 1.5rem;
    margin: 20px 0;
    color: rgba(115, 115, 115, 0.7);    
  }
}
</style>
  
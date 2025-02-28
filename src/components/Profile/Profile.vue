<template>
    <div class="profile">
  <div class="profile-container">
    <div class="profile-box">
        <font-awesome-icon :icon="['fas', 'tags']"  class="profile-tag"/>
      <div class="profile-details">
        <p class="duration-title">Subscription duration:</p>
        <div class="profile-duration">
          <button class="duration-btn">1 month</button>
          <button class="duration-btn">3 months</button>
          <button class="duration-btn">6 months</button>
          <button class="duration-btn active">12 months</button>
        </div>

        <h3>Specifications:</h3>
        <ul>
          <li>Main product duration: <span>12 months</span></li>
          <li>New releases in subscription: <span>Yes</span></li>
          <li>Ability to download media content: <span>Yes</span></li>
          <li>Country: <span>Uzbekistan</span></li>
          <li>Edition type: <span>Digital</span></li>
          <li>Language: <span>English</span></li>
        </ul>
      </div>

      <div class="profile-purchase">
        <p class="price">499 000 sum <span class="old-price">1,599 ₽</span></p>
        <button class="add-to-cart">Subscribe Now</button>
      </div>
    </div>
  </div></div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
</style>
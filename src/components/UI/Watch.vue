<template>
  <router-link :to="`/${type}/${id}`" class="watch-btn">
    <font-awesome-icon icon="play" />
    <span> Watch</span>
  </router-link>
</template>
    
    <script setup>
const props = defineProps({
  type: String,
  id: Number,
});
</script>
   
    <style lang="scss" scoped>
.watch-btn {
  display: flex;
  align-items: center;
  column-gap: 15px;
  height: 50px;
  width: max-content;
  padding: 0 20px;
  background-image: linear-gradient(
    to right top,
    #6ecc63,
    #5cb450,
    #4a9c3e,
    #38852c,
    #266f1a,
    #266f1a,
    #266f1a,
    #266f1a,
    #38852c,
    #4a9c3e,
    #5cb450,
    #6ecc63
  );
  border-radius: 20px;
  font-size: 20px;
  line-height: 1.5;
  color: white;
  cursor: pointer;
  transition: all 0.4s linear;

  &:hover {
    transform: scale(1.07);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
    font-size: 14px;
    column-gap: 8px;
    height: 40px;
    padding: 0 10px;
  }

  @media (max-width: 960px) {
    font-size: 12px;
    column-gap: 6px;
    height: 35px;
    padding: 0 8px;
  }

  & span {
    font-weight: 700;
  }
}
</style>
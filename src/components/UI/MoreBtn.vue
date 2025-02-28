<template>
  <router-link :to="`/${type}/${id}`" class="more-btn">
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 15.25H0V17.75H12.5V15.25ZM20 5.25H0V7.75H20V5.25ZM0 12.75H20V10.25H0V12.75ZM0 0.25V2.75H20V0.25H0Z"
        fill="white"
      />
    </svg>
    <span>More details</span>
  </router-link>
</template>

<script setup>
const props = defineProps({
  type: String,
  id: Number,
});
</script>

<style lang="scss" scoped>
.more-btn {
  display: flex;
  align-items: center;
  column-gap: 10px;
  height: 50px;
  width: max-content;
  padding: 0 15px;
  background: #1d1d1d ;
  border-radius: 20px;
  font-size: 20px;
  line-height: 1.5;
  background: #149A03;
  color: white;
  cursor: pointer;
  transition: all .4s linear;

  & svg{

  @media (max-width: 1200px) {
        max-width: 15px;
  }


  }
  &:hover{
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
    font-weight: 400;
  }
}
</style>
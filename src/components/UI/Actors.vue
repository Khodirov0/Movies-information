<template>
  <div class="actors" v-if="actorsArray ">
    <div class="actor" v-for="actor in actorsArray" :key="actor.id">
      <img v-lazy="imgUrl + actor.profile_path" alt="" />
      <span>{{ actor.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { useActors } from "../../stores/actors";
import { imgUrl } from "../../static";
import { computed, onMounted } from "vue";


const props = defineProps(["type", "id", "count"]);

const actorsStore = useActors();

const actorsArray = computed(() =>
  props.type == "movie" ? actorsStore.actorsMovie : actorsStore.actorsTv
);

onMounted(() => {
  actorsStore.getActors(props.type, props.id, props.count);
});
</script>

 <style lang="scss" scoped>
.actors {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  gap: 15px;


@media(max-width:960px  ) {
  gap: 10px;
}

}
.actor {
  border: 1px solid var(--button-text);
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 3px 10px 3px 3px;
  border-radius: 25px;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;

    @media(max-width:1200px  ) {
  width: 40px;
  height: 40px;
}

@media(max-width:960px  ) {
  width: 30px;
  height: 30px;
}

  }

  & span {
    font-family: Raleway;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;
    text-align: center;
    color: var(--button-text);

    @media(max-width:1200px  ) {
  font-size: 14px;
}

@media(max-width:960px  ) {
  font-size: 12px;
}

  }
}
</style>
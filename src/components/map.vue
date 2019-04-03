<template >

  <md-card class="map">
    <l-map :zoom=13 :center="[3.42158, -76.5205]">
        <l-tile-layer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></l-tile-layer>
      </l-map>
  </md-card>


</template>

<script>

import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
    }
}
</script>

<style lang="scss">
.map {
  height:100% ;
  width: 100%;
  //top: 0 ;
  position: absolute;
  padding: 0%;
  margin: 0%;
}
</style>

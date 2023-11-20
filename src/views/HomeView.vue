<script setup>
import {onMounted, ref, watch} from 'vue';
import {retrieveDevice, setPowerState} from "@/actions/shellyProvider";

const global = ref('');
const relay = ref('');
const device = ref('');

watch(global, () => {
  device.value = global.value.device_status;
  fetchRelayData();
})

const fetchRelayData = async () => {
  relay.value = device.value.relays[0];
  console.log(relay.value);
}

onMounted( async () => {
  global.value = await retrieveDevice();
})

const handlePowerChange = async () => {
  let state = 'on';
  if (relay.value.ison == true) {
    state = 'off';
  }

  await setPowerState(0, state);
  global.value = await retrieveDevice();
}
</script>

<template>
  <main>
    <div v-if="device">
      <h3>Wi-Fi</h3>
      SSID: {{ device.wifi_sta.ssid }} <br />
      IP: {{ device.wifi_sta.ip }}
    </div>

    <div v-if="device">
      <h3>Temperature</h3>
      {{ device.tmp.tC }}°C <br />
      {{ device.tmp.tF }}°F
    </div>

    <div>
      <h3>Relay Status</h3>
      <div v-if="relay.ison" class="relay-on">On</div>
      <div v-else class="relay-off">Off</div>
    </div>

    <div>
      <h3>Actions to device</h3>
      <button @click="handlePowerChange">Change Relay State</button>
    </div>

  </main>
</template>

<style scoped>
  main {
    min-height: 100vh;
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    gap: 1rem;
  }

  .relay-on {
    color: darkgreen;
  }

  .relay-off {
    color: red;
  }
</style>

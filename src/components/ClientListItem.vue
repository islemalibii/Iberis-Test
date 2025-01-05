<template>
  <ion-item v-if="client" :routerLink="'/client/' + client.id" :detail="false" class="list-item">
    <ion-label class="ion-text-wrap">
      <h1>
        {{ client.firstName }} {{ client.lastName }}
        <span class="company">
          <ion-note>{{ client.company?.name}}</ion-note>
          <ion-icon aria-hidden="true" :icon="chevronForward" size="small" v-if="isIos()"></ion-icon>
        </span>
      </h1>
      <p>{{ client.company?.title }}</p>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';

defineProps({
  client: Object,
});

const isIos = () => {
  const win = window as any;
  return win && win.Ionic && win.Ionic.mode === 'ios';
};
</script>

<style scoped>
.list-item {
  --padding-start: 15px;
  --inner-padding-end: 0;
}

.list-item ion-label {
  margin-top: 15px;
  margin-bottom: 15px;
}

.list-item h1 {
  font-weight: 700;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list-item p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
  margin-top: 8px;
}

.list-item .company {
  align-items: center;
  display: flex;
}

.list-item ion-icon {
  color: #c9c9ca;
}

.list-item ion-note {
  font-size: 0.9375rem;
  margin-right: 10px;
  font-weight: normal;
}

.list-item ion-note.md {
  margin-right: 14px;
}


</style>

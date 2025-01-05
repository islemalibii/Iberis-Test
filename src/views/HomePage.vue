<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Clients</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Clients</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ClientListItem v-for="client in clients" :key="client.id" :client="client" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import ClientListItem from '@/components/ClientListItem.vue';
import { getClients, Client } from '@/data/clients';
import { ref, onMounted } from 'vue';

const clients = ref<Client[]>([]);

onMounted(async () => {
  try{
    const fetchedClients = await getClients();
    clients.value = fetchedClients;
    }catch(error){
    console.error('Error getting clients:', error);
  }
});

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
</script>

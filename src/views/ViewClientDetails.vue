<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="client">
      <ion-item>
        <img :src="client.image" alt="Client Image" class="clientImage" />
        <ion-label class="ion-text-wrap">
          <h2>
            {{ client.firstName }} {{ client.lastName }}
          </h2>
        </ion-label>
      </ion-item>

      <div class="ion-padding">
        <h1><span class="title">Title:</span> {{ client.company?.title }}</h1>
        <h3><span class="title">Company:</span> {{ client.company?.name }}</h3>
        <h4><span class="title">E-mail:</span> {{ client.email }}</h4>
        <p><span class="title">Phone:</span> {{ client.phone }}</p>
        <p><span class="title">Age:</span> {{ client.age }}</p>
        <p><span class="title">Address:</span> {{ client.address?.address }}, {{ client.address?.city }}, {{ client.address?.state }}, {{ client.address?.country }}</p>
        <p><span class="title">Department:</span> {{ client.company?.department }}</p>



      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
} from '@ionic/vue';
import { personCircle } from 'ionicons/icons';
import { getClients, Client } from '../data/clients';
import { ref, onMounted } from 'vue';

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return mode === 'ios' ? 'Inbox' : '';
};

const client = ref<Client[]>([]);


const route = useRoute();
const clientId = parseInt(route.params.id as string, 10);


onMounted(async () => {
  try {
    const clients = await getClients();
    console.log('Clients fetched:', clients);
    client.value = clients.find((c) => c.id === clientId) || null; 
    console.log('Client ID:', clientId);

    console.log('Client found:', client.value);
  } catch (error) {
    console.error('Error getting client details:', error);
    client.value = null;
  }
});

</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

ion-label {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 1rem;
}

ion-item h2 {
  font-weight: bold;
  font-size: 1.5rem;
  color: #6A0DAD; 
  margin: 0;
}


h1, h3, h4, p {
  font-size: 1rem;
  margin-bottom: 15px;
  line-height: 1.7;
}


h1 {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.7rem;
}

h3 {
  font-size: 1.3rem;
}

h4 {
  font-size: 1.3rem;
}


.clientImage {
  width: 64px;
  height: 64px; 
  border-radius: 50%; 
  margin-right: 12px; 
  object-fit: cover;
}


.title {
  font-weight: bold;
  color:#D193FF ; 
  margin-right: 6px;
}
</style>

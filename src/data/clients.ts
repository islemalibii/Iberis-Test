import axios from 'axios';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: { name: string };
}


export const getClients = async (): Promise<Client[]> => {
  try{
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
  }catch(error){
    console.error('error getting clients : ', error);
    return [];
  }
};

import axios from 'axios';

axios.defaults.baseURL =
  'https://64870eb0beba6297278fcbfc.mockapi.io/Phonebook/';

export const getPhonesApi = async () => {
  const contacts = await axios.get('/Phones').then(({ data }) => data);
  return contacts;
};

export const addPhoneApi = user => {
  const phone = axios.post('/Phones', user);
  return phone;
};

export const deletePhoneApi = async id => {
  const phone = await axios.delete(`/Phones/${id}`);

  return phone.data;
};

export const updateModelApi = async changeData => {
  const { data } = await axios.put(`/Phones/${changeData.id}/`, {
    Model: changeData.Model,
  });
  return data;
};

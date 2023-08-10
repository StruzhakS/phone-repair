import axios from 'axios';

axios.defaults.baseURL =
  'https://64870eb0beba6297278fcbfc.mockapi.io/Phonebook/';

export const getPhonesApi = async () => {
  const phones = await axios.get('/Phones').then(({ data }) => data);
  return phones;
};

export const getPhoneByIdApi = async id => {
  const { data } = await axios.get(`/Phones/${id}`);
  return data;
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
    Model: changeData.phone.Model,
    Price: changeData.phone.Price,
    Detailprice: changeData.phone.Detailprice,
    Proffit: changeData.phone.Proffit,
    Sold_for: changeData.phone.Sold_for,
    Note: changeData.phone.Note,
  });
  return data;
};

export const updateStatusPhoneApi = async ({ id, check }) => {
  const { data } = await axios.put(`/Phones/${id}/`, { isSold: !check });
  return data;
};

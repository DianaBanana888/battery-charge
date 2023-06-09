import axios from "axios"

const CallAPI = await axios.get('battery-data.json').then((response) => {
  return response.data
}).catch(error => {
  return error;
});

export { CallAPI };

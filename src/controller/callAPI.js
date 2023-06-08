import axios from "axios"

const myController = {
  getUsers: function () {
    axios.get('battery-data.json', {
      // timeout: timeout
    })
      .then(function (response) {
        // Handle the successful response
        console.log('Response:', response.data);
      })
      .catch(function (error) {
        if (axios.isCancel(error)) {
          // Request was canceled
          console.log('Request canceled:', error.message);
        } else {
          // Handle other errors
          console.error('Error:', error);
        }
      });
  }
};

export { myController };

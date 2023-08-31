import axios from 'axios';

const getVideoById = async (id) => {
  try {
    const response = await axios.get(
      `https://project-2-api.herokuapp.com/videos/${id}?api_key=4e15e296-a8f6-4d61-bffb-cad423b094d8`
    );
    document.title = response.data.title;
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getAllVideosSummary = async () => {
  try {
    const response = await axios.get(
      `https://project-2-api.herokuapp.com/videos?api_key=4e15e296-a8f6-4d61-bffb-cad423b094d8`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default { getVideoById, getAllVideosSummary };

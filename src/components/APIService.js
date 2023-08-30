import axios from 'axios';

const getVideoById = async (id) => {
  try {
    const response = await axios.get(
      `https://project-2-api.herokuapp.com/videos/${id}?api_key=<FatemeBagherzadBrainStationAPI>`
    );
    document.title = response.data.title;

    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getAllVideosSummary = async () => {
  try {
    const response = await axios.get(
      'https://project-2-api.herokuapp.com/videos?api_key=<FatemeBagherzadBrainStationAPI>'
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default { getVideoById, getAllVideosSummary };

import axios from 'axios';

const getVideoById = async (id) => {
  try {
    const response = await axios.get(
      `https://unit-3-project-api-0a5620414506.herokuapp.com/videos/${id}?api_key=68532983-3fe4-4171-8e77-7003c567d0dd`
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
      `https://unit-3-project-api-0a5620414506.herokuapp.com/videos?api_key=68532983-3fe4-4171-8e77-7003c567d0dd`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export { getVideoById, getAllVideosSummary };

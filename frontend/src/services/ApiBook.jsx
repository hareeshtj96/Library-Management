import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

export const fetchBooksApi = async (searchTerm = "", page = 1) => {
  const searchQuery = searchTerm ? `?search=${searchTerm}` : "";
  const pageQuery = `&page=${page}`;
  try {
    const response = await axios.get(`${API_URL}${searchQuery}${pageQuery}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

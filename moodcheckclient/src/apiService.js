import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your actual backend URL

export const fetchEmotionData = (url) => {
  return axios.get(`${BASE_URL}/url/emotion?url=${encodeURIComponent(url)}`);
};

export const fetchSentimentData = (url) => {
  return axios.get(`${BASE_URL}/url/sentiment?url=${encodeURIComponent(url)}`);
};

export const fetchTextEmotionData = (text) => {
  return axios.get(`${BASE_URL}/text/emotion?text=${encodeURIComponent(text)}`);
};

export const fetchTextSentimentData = (text) => {
  return axios.get(`${BASE_URL}/text/sentiment?text=${encodeURIComponent(text)}`);
};

import { config } from "@/config";
import axios from "axios";

const apiClient = axios.create({
  baseURL: config.backendUri,
});

export default apiClient;

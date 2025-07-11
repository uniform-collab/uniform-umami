import { UmamiApiClient } from "@umami/api-client";

export function getUmamiClient() {
  const apiUrl = process.env.UMAMI_API_CLIENT_ENDPOINT;
  const apiKey = process.env.UMAMI_API_KEY;
  if (!apiUrl || !apiKey) {
    throw new Error("Umami API credentials are not set.");
  }
  return new UmamiApiClient({ apiEndpoint: apiUrl, apiKey });
}

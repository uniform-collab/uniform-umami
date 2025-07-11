import type { NextApiRequest, NextApiResponse } from "next";
import { getUmamiClient } from "../../../lib/umamiClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const siteId = process.env.UMAMI_SITE_ID;
  if (!siteId) {
    return res.status(500).json({ error: "Umami site ID is not set." });
  }
  try {
    const client = getUmamiClient();
    // Default to last 30 days
    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000;
    const unit = "day";
    const timezone = "UTC";
    const data = await client.getWebsitePageviews(siteId, {
      startAt,
      endAt,
      unit,
      timezone,
    });
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}

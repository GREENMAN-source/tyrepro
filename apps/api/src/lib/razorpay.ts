import Razorpay from "razorpay";
import { env } from "../config/env.js";
import { HttpError } from "./http.js";

export function getRazorpayClient() {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new HttpError(503, "Razorpay credentials are not configured");
  }

  return new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET
  });
}

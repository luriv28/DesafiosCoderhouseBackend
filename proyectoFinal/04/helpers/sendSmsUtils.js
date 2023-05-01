import TwilioSDK from "twilio";
import * as dotenv from "dotenv";
dotenv.config();

const client = TwilioSDK(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendOrder(message) {
  try {
    message = await client.messages.create(message);
  } catch (error) {
    console.log(error);
  }
}

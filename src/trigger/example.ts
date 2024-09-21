import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { getLocationOrigin } from "next/dist/shared/lib/utils";

export const helloWorldTask = task({
  id: "emergency email",
  run: async (payload: any, { ctx }) => {
    logger.log("Sending Emergency Email when button is clicked", { payload, ctx });

    const emailPayLoad = {

      to:  payload.to,
      from: 'paguguo8@gmail.com',
      subject: 'This is an emergency',
      text: 'This is an emegrency do you want the law enforcement to be called',
      html: '</strong this is an emgergency foo ya foo strong/>',
    }

    await wait.for({ seconds: 5 });

    return {
      message: "Hello, world!",
    }
  },
});
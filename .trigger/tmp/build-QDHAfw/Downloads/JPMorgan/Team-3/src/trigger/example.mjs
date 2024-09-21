import {
  logger,
  task,
  wait
} from "../../../../../chunk-EJQKYCZJ.mjs";
import {
  init_esm
} from "../../../../../chunk-FNJ5RO3Q.mjs";

// src/trigger/example.ts
init_esm();
var helloWorldTask = task({
  id: "hello-world",
  run: async (payload, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });
    await wait.for({ seconds: 5 });
    return {
      message: "Hello, world!"
    };
  }
});
export {
  helloWorldTask
};
//# sourceMappingURL=example.mjs.map

import { Store } from "./models/store.js";
import { actions } from "./models/actions.js";
import { counter } from "./models/reducers.js";

const store = new Store(counter);

store.subscribe(() => {
  console.log(`Count: ${store.getState()}`);
});

store.dispatch(actions.INCREMENT);
store.dispatch(actions.INCREMENT);
store.dispatch(actions.DECREMENT);
store.dispatch(actions.RESET);

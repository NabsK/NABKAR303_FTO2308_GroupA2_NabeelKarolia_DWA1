export class Store {
  constructor(counter) {
    this.state = undefined;
    this.counter = counter;
    this.listeners = [];

    this.getState = () => this.state;

    this.dispatch = (action) => {
      this.state = this.counter(this.state, action);
      this.listeners.forEach((listener) => listener());
    };

    this.subscribe = (listener) => {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      };
    };
  }
}

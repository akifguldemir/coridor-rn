import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./Index";

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;

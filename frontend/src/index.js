import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import rootReducer from "./store/index";
import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./interceptors/tokenRequest";
const store = createStore(rootReducer);
const persistor = persistStore(store);
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,

	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

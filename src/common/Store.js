import { createStore } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
// import { persistStore } from "redux-persist";
import reducer from './Reducers';
/*product bo devtool -composeWithDevTools chi de lai apply middleware*/
function configureStore(initialState) {

  const store = createStore(
    reducer,
    initialState,
  );

  return store;
};


const store = configureStore();
// export const persistor = persistStore(store);
export default store;



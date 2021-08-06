import type { AppProps } from 'next/app';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { Provider } from 'react-redux';
import store, { persistor } from 'store';
import ReduxToastr from 'react-redux-toastr';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalStyles } from 'styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            closeOnToastrClick
          />
          <GlobalStyles />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
export default MyApp;

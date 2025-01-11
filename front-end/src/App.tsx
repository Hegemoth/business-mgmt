import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LicenseInfo } from "@mui/x-license-pro";
import pl from 'date-fns/locale/pl';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './layout/Layout';
import MainWrapper from './layout/MainWrapper';
import store, { persistor } from './redux/store';
import Router from './router/Router';
import { createTheme } from './theme/createTheme';

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENSE_KEY);

const theme = createTheme();

const App = () => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <MainWrapper>
              <ToastContainer />
              <Layout>
                <Router />
              </Layout>
            </MainWrapper>
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </PersistGate>
  </ReduxProvider>
);

export default App;

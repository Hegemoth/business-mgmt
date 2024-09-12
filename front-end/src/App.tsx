import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import MainWrapper from './layout/MainWrapper';
import Routes from './routes/Routes';
import { createTheme } from './theme/createTheme';

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <MainWrapper>
        <CssBaseline />
        <ToastContainer />
        <Layout>
          <Routes />
        </Layout>
      </MainWrapper>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;

// import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './redux/store';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import pl from 'date-fns/locale/pl';

// <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
// <ReduxProvider {...{ store }}>
// <PersistGate loading={null} persistor={persistor}>
// </PersistGate>
// </ReduxProvider>
// </LocalizationProvider>

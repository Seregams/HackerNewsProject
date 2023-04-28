import './styles/App.css';
import AppRouter from "./components/AppRouter/AppRouter";
import {useEffect} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {green, grey,} from "@mui/material/colors";


function App() {

  // useEffect(() => {
  //   if(AppRouter.isMounted) {
  //     console.log(AppRouter.isMounted)
  //     // setLoading(false)
  //   }
  // }, [])

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
      info: {
        main: grey[500]
      },
      typography: {
        fontFamily: [
          'Roboto',
        ].join(','),
      },
    },
  });

  return (
      <ThemeProvider theme={theme}>
          <AppRouter/>
      </ThemeProvider>
  );
}

export default App;

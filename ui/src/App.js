import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterProvider} from 'react-router-dom'
// import CarouselHead from './components/mainPaageHead/CaroselHead';
// import NavBar from './components/headNavBar/NavBar';
// import Cards from './components/cards/Cards';
// import SearchArea from './components/searchbox/SearchArea';
import Router from './router/router';

function App() {
  return (
    // <div className="App">
    //   <NavBar/>
    //   <CarouselHead/>
    //   <Cards/>
    //   <SearchArea/>
    // </div>
    <>
    <RouterProvider router={Router}>
    </RouterProvider>
    </>
    
  );
}

export default App;

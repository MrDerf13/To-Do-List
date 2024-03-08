import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPage from "./Pages/AddPage/AddPage.tsx";
import Home from "./Pages/Home/Home.tsx";
import EditPage from "./Pages/EditPage/EditPage.tsx";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </BrowserRouter>
  );
}

export default App;

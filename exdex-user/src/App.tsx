import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.scss";
import 'react-quill/dist/quill.snow.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;

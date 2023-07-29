import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/common/Layout";
import Editor from "./pages/Editor";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";
import Layout2 from "./component/common/Layout2";
import MyEditPage from "./pages/MyEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import HousePage from "./pages/HousePage";
import DailyLifePage from "./pages/DailyLifePage";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/house" element={<HousePage />} />
            <Route path="/dailylife" element={<DailyLifePage />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
          <Route element={<Layout2 />}>
            <Route path="/userinfo/:id" element={<MyPage />} />
            <Route path="/userinfo/:id/edit" element={<MyEditPage />} />
          </Route>
          <Route path="/editor/new" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;

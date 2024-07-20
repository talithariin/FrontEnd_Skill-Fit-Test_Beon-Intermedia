import React, { Suspense } from "react";
import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const DashboardLayout = React.lazy(() => import("./layouts/DashboardLayout"));
const Page404 = React.lazy(() => import("./components/organisms/Page404"));
const PageLoading = React.lazy(() =>
  import("./components/organisms/PageLoading")
);
const ListResident = React.lazy(() => import("./pages/Resident/ListResident"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));

const AppContent = () => {
  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoading />}>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/resident"
        element={
          <Suspense fallback={<PageLoading />}>
            <DashboardLayout>
              <ListResident />
            </DashboardLayout>
          </Suspense>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <AppContent />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

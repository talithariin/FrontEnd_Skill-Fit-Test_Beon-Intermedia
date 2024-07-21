import React, { Suspense } from "react";
import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

const DashboardLayout = React.lazy(() => import("./layouts/DashboardLayout"));
const Page404 = React.lazy(() => import("./components/organisms/Page404"));
const PageLoading = React.lazy(() =>
  import("./components/organisms/PageLoading")
);
const ListResident = React.lazy(() => import("./pages/Resident/ListResident"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const ListHouse = React.lazy(() => import("./pages/House/ListHouse"));
const ListHouseResident = React.lazy(() =>
  import("./pages/HouseResident/ListHouseResident")
);
const ListFeeType = React.lazy(() => import("./pages/FeeType/ListFeeType"));
const ListPayment = React.lazy(() => import("./pages/Payment/ListPayment"));

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
      <Route
        path="/house"
        element={
          <Suspense fallback={<PageLoading />}>
            <DashboardLayout>
              <ListHouse />
            </DashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/house-resident"
        element={
          <Suspense fallback={<PageLoading />}>
            <DashboardLayout>
              <ListHouseResident />
            </DashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/fee-type"
        element={
          <Suspense fallback={<PageLoading />}>
            <DashboardLayout>
              <ListFeeType />
            </DashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/payment"
        element={
          <Suspense fallback={<PageLoading />}>
            <DashboardLayout>
              <ListPayment />
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
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <AppContent />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

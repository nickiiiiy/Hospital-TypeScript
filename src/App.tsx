import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import WithAuthCheck from "./components/HOC/WithAuthCheck";
import WithAuthPublic from "./components/HOC/WithAuthPublic";
import Loading from "./components/Loading";

const Registration = lazy(() => import("./components/pages/Registration"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/registration"
          element={<WithAuthPublic path="/" component={<Registration />} />}
        />
        <Route path="*" element={<Navigate to="/authorization" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;

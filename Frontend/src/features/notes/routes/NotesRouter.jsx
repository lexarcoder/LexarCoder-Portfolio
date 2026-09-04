import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
const Notes = lazy(() => import("../pages/NotesPage")); 
import PageLayout from '../../../layout/components/PageLayout'
import Protected from '../../../features/auth/components/Protected'
import Loading from '../../auth/components/Loading';
3


function NotesRouter() {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route
            element={
              <Protected>
                <PageLayout />
              </Protected>
            }
          >
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default NotesRouter

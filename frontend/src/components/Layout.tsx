import { Outlet } from "react-router-dom";

export function Layout() {
    return (
      <>
      <div className="h-16 m-4 " >
           <h1 className="text-3xl text-center text-weight-800 text-white ">ExpenseTracker</h1>

      <main className="mx-auto max-w-6xl px-8 py-8">
        <Outlet />
        </main>
        </div>
      </>
    )
}


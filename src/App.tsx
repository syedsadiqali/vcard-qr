import { Route, Routes } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { HomePage } from "@/pages/HomePage";
import { GeneratorPage } from "@/pages/GeneratorPage";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<GeneratorPage />} />
        </Routes>
      </main>
    </div>
  );
}

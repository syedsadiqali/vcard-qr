import { NavBar } from "@/components/NavBar";
import { GeneratorPage } from "@/pages/GeneratorPage";
import { HomePage } from "@/pages/HomePage";
import { Route, Routes } from "react-router-dom";

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

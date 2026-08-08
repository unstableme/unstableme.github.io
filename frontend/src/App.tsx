import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatWidget from "./components/chatbot/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SmoothScroll>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Chatbot mounted once — persists across routes, talks to the RAG backend */}
          <ChatWidget />
        </BrowserRouter>
      </SmoothScroll>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

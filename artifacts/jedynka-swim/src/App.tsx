import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout";

// Pages
import Home from "@/pages/home";
import News from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import Athletes from "@/pages/athletes";
import Achievements from "@/pages/achievements";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/aktualnosci" component={News} />
        <Route path="/aktualnosci/:id" component={NewsDetail} />
        <Route path="/zawodnicy" component={Athletes} />
        <Route path="/osiagniecia" component={Achievements} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;

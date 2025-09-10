import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  Outlet,
  NotFoundRoute
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import Page2048 from './pages/2048';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// Create root route
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  ),
})

// Create page routes
const indexRoute = createTanStackRoute({ getParentRoute: () => rootRoute, path: '/', component: Index })
const aboutRoute = createTanStackRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage })
const contactRoute = createTanStackRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage })
const game2048Route = createTanStackRoute({ getParentRoute: () => rootRoute, path: '/2048', component: Page2048 })

// Create the not found route
const notFoundRoute = new NotFoundRoute({ getParentRoute: () => rootRoute, component: NotFound })

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  game2048Route,
])

// Create router
const router = createRouter({ 
  routeTree,
  notFoundRoute,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;
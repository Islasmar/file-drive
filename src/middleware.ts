import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define las rutas públicas, incluyendo la raíz ('/')
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  // Si la ruta no es pública, protege la ruta
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/briefs/new',
    '/briefs/submit',
    '/checkout(.*)',
    '/analysis(.*)',
    '/subscribe(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    let role = (sessionClaims as any)?.metadata?.role;
    const { nextUrl } = req;

    // Fallback: If role is missing from claims, check the user object directly
    // This handles cases where Custom Session Claims are not set up in Clerk Dashboard
    if (userId && !role) {
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            role = user.publicMetadata?.role;
        } catch (e) {
            console.error("Middleware failed to fetch user metadata:", e);
        }
    }

    // Redirect to onboarding if user is logged in but has no role
    // and is not already on onboarding or an api route.
    if (userId && !role && nextUrl.pathname !== '/onboarding' && !nextUrl.pathname.startsWith('/api')) {
        const onboardingUrl = new URL('/onboarding', req.url);
        return Response.redirect(onboardingUrl);
    }

    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

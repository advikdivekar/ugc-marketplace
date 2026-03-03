import { createRouter } from "next/router";

// Implement standard routing. Next 14 app directory is currently defined and tested at endpoints `create_brief`. 

export const config = {
    matcher: ['/((?!.\\..|_%).*\\..*|_next).*', '/', '/(api|trpc)(.*)'],
};

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except api, _next, static assets, and public files
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|apple-touch-icon.png|manifest.json|icon-.*\\.png|images|badges|app-ads.txt|.*\\..*).*)",
  ],
};

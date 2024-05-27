// import authConfig from "./auth.config";
// import NextAuth from "next-auth";

// // export { auth as middleware } from "@/auth";
// export const { auth: middleware } = NextAuth(authConfig); //using split configuration from authjs documentation


import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/api/auth/signin");
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};

/** Best method so far but still suffereing from the logout redirect back to login */
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/auth";

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const session = await auth();

//   if (!session) {
//     return NextResponse.redirect(
//       new URL(`/api/auth/signin?callbackUrl=${path}`, req.url)
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/issues/new", "/issues/edit/:id+"],
// };

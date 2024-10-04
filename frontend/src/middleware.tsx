import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"];
const publicRoutes = ["/auth/login", "/auth/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const isAuthenticated = async () => {
    const token = cookies().get("token")?.value;    

    if (!token) {
      return false;
    }

    const response = await fetch("http://backend-farm:8000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });    

    if (response.ok) {
      return true;
    } else {
      cookies().delete("token")
      return false;
    }
  };  

  if (isProtectedRoute && !(await isAuthenticated())) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

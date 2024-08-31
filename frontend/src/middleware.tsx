import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"];
const publicRoutes = ["/auth/login", "/auth/register"];
const url = process.env.TEST_URL;

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // const isAuthenticated = async () => {
  //   const token = cookies().get("token")?.value;

  //   if (!token) {
  //     return false;
  //   }

  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token}`,
  //     },
  //   });

  //   if (response.ok) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  //   axios.get("http://127.0.0.0:8000/").then(() => {
  //     console.log("tonga");
  //   });
  // };
  const token = cookies().get("token")?.value;
  console.log(url);
  

  try {
    const response = await fetch("http://localhost:8000/api/user");
  
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

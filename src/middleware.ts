  export {default} from "next-auth/middleware"


  export const config = {
    matcher: ["/admin"], // Matches both /admin and any sub-paths
  };
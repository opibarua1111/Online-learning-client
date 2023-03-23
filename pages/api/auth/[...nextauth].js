import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      async authorize(credentials, req) {
        const { name, email, id } = credentials;
        let user = { id, name, email };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

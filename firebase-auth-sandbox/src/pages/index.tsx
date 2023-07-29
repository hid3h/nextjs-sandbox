import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  initializeApp(firebaseConfig);

  const auth = getAuth();
  const email = "";
  const password = "";
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     console.log("user", user);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log("errorCode", errorCode);
  //     console.log("errorMessage", errorMessage);
  //   });

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signin成功");
        const idToken = await user.getIdToken();
        console.log("idToken", idToken);
        const result = await signIn("credentials", {
          email: "hoge@example.com",
          password: "hogehoge",
          redirect: false,
        });
        console.log("result", result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signin失敗");
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
      });
  };

  getSession().then((session) => {
    console.log("session", session);
  });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <button onClick={handleSignIn}>Sign in</button>
      </main>
    </>
  );
}

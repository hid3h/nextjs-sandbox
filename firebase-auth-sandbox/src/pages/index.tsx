import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  checkActionCode,
  applyActionCode,
} from "firebase/auth";
import { api } from "~/utils/api";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  initializeApp(firebaseConfig);

  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const email = process.env.NEXT_PUBLIC_EXAMPLE_EMAIL || "";
  const password = process.env.NEXT_PUBLIC_EXAMPLE_PASSWORD || "";
  const auth = getAuth();

  const searchParams = useSearchParams();
  const actionCode = searchParams.get("oobCode");

  useEffect(() => {
    if (actionCode) {
      checkActionCode(auth, actionCode).then((info) => {
        console.log("info", info);

        applyActionCode(auth, actionCode).catch((error) => {
          console.log("error", error);
        });
      });
    }
  }, [actionCode]);

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
      });
  };

  const handleSignIn = async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("user.emailVerified", user.emailVerified);
  };

  return (
    <>
      <div>
        <button onClick={handleSignUp}>Sign up</button>
      </div>
      <div>
        <button onClick={handleSignIn}>Sign in</button>
      </div>
    </>
  );
}

"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../lib/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { trackLogin, trackClick } from "../../lib/analytics";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Update Firestore with displayName and email
    await setDoc(
      doc(db, "user-profiles", user.uid),
      {
        name: user.displayName || "",
        email: user.email || "",
        updatedAt: new Date(),
      },
      { merge: true } // merge to avoid overwriting other fields
    );

    router.replace("/my-account");
  };

  const handleLogin = async () => {
    try {
      // After successful login
      trackLogin("email");
    } catch (error) {
      trackClick("login_failed", {
        error_message: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button className="btn btn-primary" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}
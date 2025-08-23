declare global {
  interface Window {
    gapi?: any;
  }
}

export const googleSignIn = () => {
  if (typeof window !== "undefined" && window.gapi && window.gapi.auth2) {
    window.gapi.auth2.getAuthInstance().signIn();
  } else {
    alert("Google Sign-In is not available. Please try again later.");
  }
};

// Example stub for handleGoogleLogin if you have a custom function
export const handleGoogleLogin = (customLoginFn?: () => void) => {
  if (typeof customLoginFn === "function") {
    customLoginFn();
  } else {
    googleSignIn();
  }
};
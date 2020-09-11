// import React, { useEffect } from "react";
// import app from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// import { FirebaseContext } from "../context/FirebaseContext";

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };

// app.initializeApp(config);

// const auth = app.auth();
// const firestore = app.firestore();

// const useFirebase = () => {
//   const context = React.useContext(FirebaseContext);

//   if (!context) {
//     throw new Error(`useFirebase must be used within a FirebaseProvider`);
//   }

//   const [user, dispatch] = context;

//   useEffect(() => {
//     const listener = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         dispatch({
//           type: "SET_USER",
//           user: { username: authUser.email },
//         });
//       } else {
//         dispatch({
//           type: "REMOVE_USER",
//         });
//       }
//     });

//     return () => {
//       listener();
//     };
//   }, [dispatch]);

//   const doCreateUserWithEmailAndPassword = (email, password) =>
//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((authUser) => {
//         firestore.collection("users").add({ email });
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//   const doSignInWithEmailAndPassword = (email, password) =>
//     auth.signInWithEmailAndPassword(email, password);

//   const doSignOut = () => auth.signOut();

//   const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

//   const doPasswordUpdate = (password) =>
//     auth.currentUser.updatePassword(password);

//   return {
//     user,
//     dispatch,
//     doCreateUserWithEmailAndPassword,
//     doSignInWithEmailAndPassword,
//     doSignOut,
//     doPasswordReset,
//     doPasswordUpdate,
//   };
// };

// export default useFirebase;

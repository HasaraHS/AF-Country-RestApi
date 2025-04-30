import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
            const token = credentialResponse.credential; 
            const decoded = jwtDecode(token); 
  
            console.log("Decoded User Info:", decoded);
            console.log("Raw Credential Response:", credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;

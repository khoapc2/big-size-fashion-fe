/* eslint-disable */
import React, { useState, useEffect } from "react";
import { getToken } from "../../../firebase/firebase";

function FirebaseNotifications(props) {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
}

FirebaseNotifications.propTypes = {};

export default FirebaseNotifications;

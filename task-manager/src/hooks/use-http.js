import React, { useCallback, useState } from "react";
const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const sendRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, //'https://test-eaa5f-default-rtdb.firebaseio.com/tasks.json
        {
          method: requestConfig.method ? requestConfig.method : "GET", //if method is provided,then make the default value is 'GET'
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null, //İf the body is set,then get the body.If it's not,
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[requestConfig, applyData]);

  return {
    isLoading, //isloading state
    error, //error state
    sendRequests,
  };
};
export default useHttp;

import { useCallback} from "react";
const useHttp=()=>{
    const sendRequest=useCallback(async(url, method, body)=>{
        await fetch(url, {
            method:method,
            body:body,
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>{return response.json()})
        .then(responseData=>{
            return responseData;
        })
        .catch(error=>{
            return new Error(error);
        })
    }, []);

    return {sendRequest}
}
export default useHttp;
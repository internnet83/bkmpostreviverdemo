import React, { useEffect } from "react";
import useBidirectionCommunicator  from "../hooks/useBidirectionCommunicator";
import { currentProfileDetails } from "../fetch/auth.fetch";


const AuthProvider = ({ children }) => {
    const {message , isConnected , send} = useBidirectionCommunicator();

    useEffect(()=>{
        if(isConnected){
            console.log("AuthProvider message from parent 0" , message)
            if(message.type  === "INIT_CHANNEL"){
                console.log("AuthProvider message from parent 1", message.payload)


              


                currentProfileDetails(message.payload?.auth || {}).then((response)=>{
                    console.log("currentProfileDetails :-",response);
                }).catch((error)=>{
                    console.log("currentProfileDetails :-",error);
                })






                

            }
        }
    }, [isConnected , message])

    return <>{children}</>
}


export default AuthProvider;

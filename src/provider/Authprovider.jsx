import React, { useEffect } from "react";
import useBidirectionCommunicator  from "../hooks/useBidirectionCommunicator";
import { currentProfileDetails } from "../fetch/auth.fetch";


const AuthProvider = ({ children }) => {
    const {message , isConnected , send} = useBidirectionCommunicator();

    useEffect(()=>{
        if(isConnected){
            console.log("AuthProvider message from parent" , message)
            if(message.type  === "INIT_CHANNEL"){
                console.log("AuthProvider message from parent" , message.payload)

                let payload = {}
                if(message.payload.isOpenInKapture){
                    payload = {
                        auth_key:message.payload.auth._KAPTURECRM_SESSION,
                    }
                }else{
                    payload = {
                        auth_key : message.payload.auth.MS_SESSION,
                        vitos_auth_key:message.payload.auth.VITOS_ACCESS_TOKEN,
                    }
                }

                console.log("AuthProvider message from parent" ,payload)

                currentProfileDetails(payload).then((response)=>{
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
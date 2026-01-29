import axios from "axios";

export const currentProfileDetails = async ({auth_key , vitos_auth_key}) => {
    axios.get("https://nuiservice.infra.kapturecrm.com/api/auth/verify-user",{headers:{
        "Content-Type": "application/json",
        "session-key":auth_key,
        ...(vitos_auth_key ? { VITOS_ACCESS_TOKEN: vitos_auth_key} : {})

    }}).then((response) => {
        console.log("currentProfileDetails :-",response);
        return response.data;
    }).catch((error) => {
        return error;
    });
}
import axios from "axios";

export const currentProfileDetails = async ({ _KAPTURECRM_SESSION, MS_SESSION, VITOS_ACCESS_TOKEN }) => {
    console.log({ _KAPTURECRM_SESSION, MS_SESSION, VITOS_ACCESS_TOKEN }, "currentProfileDetails auth params");
    axios.get("https://nuiservice.infra.kapturecrm.com/api/auth/verify-user", {
        headers: {
            "Content-Type": "application/json",
            "session-key": _KAPTURECRM_SESSION || MS_SESSION,
            ...(VITOS_ACCESS_TOKEN ? { VITOS_ACCESS_TOKEN } : {})

        }
    }).then((response) => {
        console.log("currentProfileDetails :-", response);
        return response.data;
    }).catch((error) => {
        return error;
    });
}
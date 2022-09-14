import { signOut } from "next-auth/client";


async function CLIENT_LogoutUser(): Promise<void> {

    try {

        signOut();

    } catch(err:Error|unknown) {
        // del// console.log(err);
    }

};


export default CLIENT_LogoutUser;
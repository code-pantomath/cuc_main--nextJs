import NextAuth, { User } from "next-auth";
import Providers from "next-auth/providers";
import { IUserLoginAPIData } from '../../../contacts/interfaces/Interfaces';



interface User__Add {
    id: string | number,
    ip: string,
    uniqueCode?: string,
    wallet: IUserLoginAPIData["wallet"],
}


export default NextAuth ({

    session: {
        jwt: true,
    },

    callbacks: {

        jwt: async (token, user, account, profile, isNewUser) => {
            // The user argument is only passed the first time this callback is called on a new session, after the user signs in
            if (user) {
              // Add a new prop on token for user data
              token.data = user;
            }
            return Promise.resolve(token);
        },

        session: async (session, user) => {
            // Assign user data from JWT to session user
            (session as (User & User__Add)).user = user.data
            return Promise.resolve(session);
        },

    },

    providers: [

        Providers.Credentials({


            async authorize(credentials: IUserLoginAPIData) {

                const { email, name, password, id, ip, uniqueCode, wallet } = credentials;

                if (!email) throw new Error(`Couldn't find the user !`);
                else return { // You can return any object or even an empty one, this will be converted to the JWT...
                    name,
                    email,
                    id,
                    ip,
                    uniqueCode,
                };

            },
            
            
        } as any),

    ],

});

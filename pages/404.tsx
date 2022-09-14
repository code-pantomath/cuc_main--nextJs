import { useRouter } from "next/router";
import { useEffect } from "react";

function Page_404 ({ data }:any) {
    const router = useRouter();

    try {
        useEffect(() => {
            setTimeout(() => !data && router?.replace("/"), 1000);

            return; ///
        }, [])
        
    } catch (e:any) {
        console.error(e?.message || e);
    }

    return <div>Error (404) Page NOT Found !</div>;
}


// export async function getStaticProps() {
  
//     return {
//         // notFound: true, // `redirect` and `notFound` can not both be returned from getStaticProps at the same time.
//         redirect: {
//             destination: '/',
//             permanent: false,
//             // statusCode: 301,
//         },
//     }

// }


export default Page_404;
import { Fragment } from 'react';

import { MantineSize, Paper, Text, useMantineTheme } from "@mantine/core";
import Head from 'next/head';



function TermsOfUse(props:any) {

    const theme = useMantineTheme();

    // const $violet9 = theme.colors.violet[9];
    const $violet6 = theme.colors.violet[6];

    const fontSizeIncrementor = (size:MantineSize, incIdx:number) => theme.fontSizes[size] * incIdx as any;



    return (
        <Fragment>

            <Head>
                <title>Terms of service | {process.env.WEBSITE_DOMAIN_NAME}</title>
                <meta name="description" content={`${process.env.WEBSITE_DOMAIN_NAME} website terms of use and what you must agree to to open an account and keep using the site.`} />
            </Head>



            <Paper m="xl" p="xl" shadow="xl" style={{ width:"75%", maxHeight:"82.75vh", margin: "0 auto", overflow:"auto" }} >


                {/* #__1__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >1. Introduction</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        1.1 These terms and conditions shall govern your use of our website.<br />
                        1.2 By using our website, you accept these terms and conditions in full; accordingly, if you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.<br />
                        1.3 If you register with our website, submit any data to our website or use any of our website services, we will ask you to expressly agree to these terms and conditions.<br />
                        1.4 You must be at least 16 years of age to use our website; by using our website or agreeing to these terms and conditions, you warrant and represent to us that you are at least 16 years of age.<br />
                    </pre>
                </div>

                {/* #__2__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >2. Last update date</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        2.1 These terms and conditions were last updated on 01/08/2022
                    </pre>
                </div>

                {/* #__3__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >3. Copyright notice</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        3.1 Copyright (c) 2022 ${process.env.WEBSITE_DOMAIN_NAME}
                    </pre>
                </div>

                {/* #__4__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >4. Permission to use website</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        4.1 You may:<br />
                        (a) view pages from our website in a web browser;<br />
                        (b) download pages from our website for caching in a web browser;<br />
                        (c) use our website services by means of a web browser;<br />

                        subject to the other provisions of these terms and conditions.<br />
                        4.2 Except as expressly permitted by Section 4.1 or the other provisions of these terms and conditions, you must not download any material from/of our website or save any such material to your computer.<br />
                        4.3 You may only use our website only for  your own personal purposes; you must not use our website for any other purposes.<br />
                        4.4 Except as expressly permitted by these terms and conditions, you must not edit or otherwise modify any material on our website.<br />
                        
                        4.5 Unless you have our permissions, you must not:<br />
                        (a) sell, rent or sub-license material/accounts from our website;<br />
                        (b) exploit our website for a commercial purpose; or<br />

                        4.6 Notwithstanding Section 4.5, you may redistribute our newsletter in print and electronic form to any person.<br />
                        4.7 We reserve the right to suspend or restrict access to our website, to areas of our website and/or to functionality upon our website. We may, for example, suspend access to the website during server maintenance or when we update the website. You must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on the website.<br />
                    </pre>
                </div>

                {/* #__5__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >5. Misuse of website</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        5.1 You must not:<br />
                        (a) use our website in any way or take any action that causes, or may cause, damage to the website or impairment of the performance, availability, accessibility, integrity or security of the website;<br />
                        (b) use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity;<br />
                        (c) hack or otherwise tamper with our website;<br />
                        (d) probe, scan or test the vulnerability of our website without our permission;<br />
                        (e) circumvent any authentication or security systems or processes on or relating to our website;<br />
                        (f) impose an unreasonably large load on our website resources (including bandwidth, storage capacity and processing capacity);<br />
                        (g) decrypt or decipher any communications sent by or to our website without our permission;<br />
                        (h) conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to our website without our express written consent;<br />
                        (i) access or otherwise interact with our website using any robot, spider or other automated means, except for the purpose of search engine indexing;<br />
                        (j) use our website except by means of our public interfaces;<br />
                        (k) violate the directives set out in the robots.txt file for our website;<br />
                        (l) do anything that interferes with the normal use of our website.<br />

                        5.2 You must ensure that all the information you supply to us through our website, or in relation to our website, is true, accurate, current, complete and non-misleading.<br />
                    </pre>
                </div>

                {/* #__6__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >6. Registration and accounts</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        6. Registration and accounts<br />
                        6.1 To be eligible for an account on our website under this Section 6, you must not be resident or situated in the US.<br />
                        6.2 You may register for an account with our website by completing and submitting the account registration form on our website.<br />
                        6.3 You must not allow any other person to use your account to access the website.<br />
                        6.4 You must notify us in writing immediately if you become aware of any unauthorised use of your account.<br />
                        6.5 You must not use any other person's account to access the website, unless you have that person's express permission to do so.<br />
                    </pre>
                </div>

                {/* #__7__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >7. User login details</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        7.1 If you register for an account with our website, you will be asked to enter some details such as name, email, password, etc...<br />
                        7.2 Your user Name/ID must not be liable to mislead and must comply with the content rules set out in Section 10; you must not use your account or user ID for or in connection with the impersonation of any person. <br />
                        7.3 You must keep your password confidential.<br />
                        7.4 You must notify us in writing immediately if you become aware of any disclosure of your password.<br />
                        7.55vh You are responsible for any activity on our website arising out of any failure to keep your password confidential, and may be held liable for any losses arising out of such a failure.<br />
                    </pre>
                </div>

                {/* #__8__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >8. Cancellation and suspension of account</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        8.1 We may:<br />
                        (a) suspend your account;<br />
                        (b) cancel your account; and/or<br />
                        (c) edit your account details,<br />

                        at any time in our sole discretion with or without notice to you.<br />
                        8.2 We will usually cancel an account if it remains unused for a continuous period of 6 months.<br />
                        8.3 You may cancel your account only by getting in touch with us via email.<br />
                    </pre>
                </div>

                {/* #__9__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >9. Our rights to use your collected data content</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        9.1 In these terms and conditions, &quot;your collected data content&quot; means materials (including without limitation text, e-mail addresses, IP address, ISP name, activity records on our website, and in addition, any data that you submit to us or our website for storage or publication on, processing by, or transmission via, our website.<br />
                        9.2 You grant to us a worldwide, irrevocable, non-exclusive, royalty-free licence to use, store, adapt, translate and distribute your collected data content in any existing or future OR store your content on and in relation to this website and any successor website with your specific consent to use your collected data content in relation to this website.<br />
                        9.3 You grant to us the right to sub-license the rights licensed under Section 9.2.<br />
                        9.4 You grant to us the right to bring an action for infringement of the rights licensed under Section 9.2.<br />
                        9.5 You hereby waive all your moral rights in your collected data content to the maximum extent permitted by applicable law; and you warrant and represent that all other moral rights in your collected data content have been waived to the maximum extent permitted by applicable law.<br />
                        9.6 You may not edit your account registration data after being registered on our website without contacting us via email.<br />
                        9.7 Without prejudice to our other rights under these terms and conditions, if you breach any provision of these terms and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions in any way, we may delete, remove, or edit any or all of your account data.<br />
                    </pre>
                </div>

                {/* #__10__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >10. Rules about registration data content</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        10.1 You warrant and represent that your content will comply with these terms and conditions.<br />
                        10.2 The registration data content must not contain any names or terms with sexual, criminal, addictive or offensive connotations.<br />
                        
                        10.3 The registration data content, and the use of your content by us in accordance with these terms and conditions, must not:<br />
                        (a) be libellous or maliciously false;<br />
                        (b) be obscene or indecent;<br />
                        (e) be in breach of racial or religious hatred or discrimination legislation;<br />
                        (f) be blasphemous;<br />
                        (h) contains violence connotations in an explicit manner;<br />
                        (i) be pornographic, lewd, suggestive or sexually explicit;<br />
                        (g) be untrue, false, or inaccurate;<br />
                        (k) contains offensive, deceptive, fraudulent, threatening, abusive, harassing, anti-social, menacing, hateful, discriminatory or inflammatory connotations.<br />
                    </pre>
                </div>

                {/* #__11__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >11. Limited warranties</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        11.1 We do not warrant or represent:<br />
                        (a) the completeness or accuracy of the exchange rate conversion information at payment time;<br />
                        (b) that the material on the website is 24/7 up to date;<br />
                        (c) that the website will operate without fault; or<br />
                        (d) that the website or any service on the website will remain available.<br />

                        11.2 We reserve the right to discontinue or alter any or all of our website services, and to stop publishing our website, at any time in our sole discretion without notice or explanation; and save to the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any website services, or if we stop publishing the website.<br />
                        11.3 To the maximum extent permitted by applicable law and subject to Section 12.1, we exclude all representations and warranties relating to the subject matter of these terms and conditions, our website and the use of our website.<br />
                    </pre>
                </div>

                {/* #__12__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >12. Limitations and exclusions of liability</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        12.1 Nothing in these terms and conditions will:<br />
                        (a) limit any liabilities in any way that is not permitted under applicable law; or<br />
                        (b) exclude any liabilities that may not be excluded under applicable law.<br />
                        
                        12.2 The limitations and exclusions of liability set out in this Section 12 and elsewhere in these terms and conditions: <br />
                        (a) are subject to Section 12.1; and<br />
                        (b) govern all liabilities arising under these terms and conditions or relating to the subject matter of these terms and conditions, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty, except to the extent expressly provided otherwise in these terms and conditions.<br />
                        
                        12.3 We will not be liable for any loss of your account data or damage of any nature.<br />
                        12.4 We will not be liable to you in respect of any losses arising out of any event or events beyond our reasonable control.<br />
                        12.5 We will not be liable to you in respect of any losses during the process before the payment being completly done, and the transaction's status of success being saved to our records and showed to you.<br />
                        12.6 We will not be liable to you in respect of any loss or corruption of any data, database or software.<br />
                        12.7 We will not be liable to you in respect of any special, indirect or consequential loss or damage.<br />
                        12.8 You accept that we have an interest in limiting the personal liability of ours and, having regard to that interest, you acknowledge that we are a limited liability entity; you agree that you will not bring any claim personally against us in respect of any losses you suffer in connection with the website or these terms and conditions (this will not, of course, limit or exclude the liability of the limited liability entity itself for the acts and omissions of ours).<br />
                    </pre>
                </div>

                {/* #__13__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >13. Breaches of these terms and conditions</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        13.1 Without prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions in any way, we may: <br />
                        (a) send you one or more formal warnings;<br />
                        (b) temporarily suspend your access to our website;<br />
                        (c) permanently prohibit you from accessing our website;<br />
                        (d) block computers using your IP address from accessing our website;<br />
                        (e) contact any or all of your internet service providers and request that they block your access to our website;<br />
                        (f) temporarily suspend your account on our website;<br />
                        (g) suspend or delete your account on our website.<br />
                        
                        13.2 Where we suspend or prohibit or block your access to our website or a part of our website, you must not take any action to circumvent such suspension or prohibition or blocking (including without limitation creating and/or using a different account).<br />
                    </pre>
                </div>

                {/* #__14__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >14. Variation</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        14.1 We may revise these terms and conditions from time to time.<br />
                        14.2 The revised terms and conditions shall apply to the use of our website from the date of publication of the revised terms and conditions on the website, and you hereby waive any right you may otherwise have to be notified of, or to consent to, revisions of these terms and conditions. OR We will give you written notice of any revision of these terms and conditions, and the revised terms and conditions will apply to the use of our website from the date that we give you such notice; if you do not agree to the revised terms and conditions, you must stop using our website.<br />
                        14.3 If you have given your express agreement to these terms and conditions, we will ask for your express agreement to any revision of these terms and conditions; and if you do not give your express agreement to the revised terms and conditions within such period as we may specify, we will disable or delete your account on the website, and you must stop using the website.<br />
                    </pre>
                </div>

                {/* #__15__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >15. Assignment</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                    15.1 You hereby agree that we may assign, transfer, sub-contract or otherwise deal with our rights and/or obligations under these terms and conditions. <br />
                    15.2 You may not without our prior written consent assign, transfer, sub-contract or otherwise deal with any of your rights and/or obligations under these terms and conditions. <br />
                    </pre>
                </div>

                {/* #__16__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >16. Severability</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        16.1 If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect.<br />
                        16.2 If any unlawful and/or unenforceable provision of these terms and conditions would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect. <br />
                    </pre>
                </div>

                {/* #__17__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >17. Third-party rights</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        17.1 A contract under these terms and conditions is for our benefit and your benefit, and is not intended to benefit or be enforceable by any third party.<br />
                        17.2 The exercise of the parties' rights under a contract under these terms and conditions is not subject to the consent of any third party.<br />
                    </pre>
                </div>

                {/* #__18__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >18. Using the credits wallet feature</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        18.1 You have the right to use the wallet credits only to pay for our services within our website's closed system, nothing more.<br />
                        18.2 We have the right to observe all of the wallet details at any time.<br />
                        18.3 We do not have access to and do not keep records of any of the payment methods personal information you use to add credits.<br />
                        18.4 We only keep records of the transition tied account, amount, type, and date.<br />
                        18.5 After adding credits, you have up to 5 days to contact us and ask for a refund, otherwise, it is completely impossible to refund the added amount.<br />
                        18.6 In case of a credits transaction to another user wallet on our system, an amount of 1Credit/1$ will be cut off from the transferred amount.<br />
                        18.7 In case of a refund, only a maximum of 65% - 75% of the added amount wall be refund.<br />
                        18.8 In case of a refund, it will take 5-15 working days, or even more under some specific circumstances.<br />
                    </pre>
                </div>

                {/* #__19__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >19. Entire agreement</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        19.1 Subject to Section 12.1, these terms and conditions, together with our privacy and cookies policy, shall constitute the entire agreement between you and us in relation to your use of our website and shall supersede all previous agreements between you and us in relation to your use of our website.<br />
                    </pre>
                </div>

                {/* #__20__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >20. The law</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        20.1 These terms and conditions shall be governed by and construed in accordance with the law.<br />
                    </pre>
                </div>

                {/* #__21__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >21. Statutory and regulatory disclosures</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        21.1 We are not a registered company in a trade register;<br />
                        21.2 This project was run by a collective of ambitious individuals.<br />
                    </pre>
                </div>

                {/* #__22__ */}
                <div style={{marginBottom:"4.5%"}} >
                    <Text style={{ fontSize:fontSizeIncrementor("xl", 1.5) }} color={$violet6} >22. Our contact details</Text>
                    <pre style={{ whiteSpace:"pre-wrap", lineHeight:"3.25vh", textAlign:"justify", paddingLeft:".5%", }} >
                        22.1 You can contact us:<br />
                        (a) using our website contact chat;<br />
                        (b) by email, using the email address published on our website.<br />
                    </pre>
                </div>


            </Paper>

        </Fragment>
    );
}


export default TermsOfUse;
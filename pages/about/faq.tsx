import { Fragment } from 'react';

import { Accordion, MantineSize, Paper, Text, useMantineTheme } from "@mantine/core";
import { Clock, Coin, Receipt, Star, Video } from 'tabler-icons-react';
import QnAAccordionItemQuestion from '../../components/QnAAccordionItemQuestion';
import QnAAccordionItemAnswer from '../../components/QnAAccordionItemAnswer';
import Head from 'next/head';
import { useRouter } from 'next/router';



function QNA () {
    const router = useRouter();

    const theme = useMantineTheme();

    const $violet6 = theme.colors.violet[6];


    return (
        <Fragment>

            <Head>
                <title>FAQ | {process.env.WEBSITE_DOMAIN_NAME}</title>
                <meta name="description" content={`Answering frequent asked question about how exactly ${process.env.WEBSITE_DOMAIN_NAME} website and its ervices work. (FAQ).`} />
            </Head>



            <Text size='xl' mt="md" align='center' color='#fd0' >Question <span style={{color:$violet6}}>&</span> Answers</Text>

            <Paper m="xl" p="xs" radius="lg" shadow="md" style={{ width:"75%", margin: "4.25% auto" }} >

                <Accordion iconPosition='right' iconSize={28} >

                    
                    {/* __#1__ */}
                    <Accordion.Item label={<QnAAccordionItemQuestion q="What do you offer"/>}>
                        <QnAAccordionItemAnswer a="We offer services to bring you oficial Udemy courses for a lower price." uppercase />
                    </Accordion.Item>


                    {/* __#2__ */}
                    <Accordion.Item label={<QnAAccordionItemQuestion q="Do you own the courses content" icon={<Video color="#fd0" />} />}>
                        <QnAAccordionItemAnswer a="NO, We do not own any content on Udemy, We only grab it for you." />
                    </Accordion.Item>


                    {/* __#3__ */}
                    <Accordion.Item label={<QnAAccordionItemQuestion q="How do I receive the content after the service being done" icon={<Receipt color="#fd0" />} />}>
                        <QnAAccordionItemAnswer>
                            You can choose between: <br/>
                            <span style={{color:"#fd0"}} >1.</span> Getting an account access details of a new Udemy account that contains the course. (NOT a second-hand account). <br/>
                            <span style={{color:"#fd0"}} >2.</span> Getting the course as a gift directly to your own Udemy account. 
                        </QnAAccordionItemAnswer>
                    </Accordion.Item>


                    {/* __#4__ */}
                    <Accordion.Item label={<QnAAccordionItemQuestion q="Do you sell 'second-hand' accounts" />}>
                        <QnAAccordionItemAnswer a="No, emphatically." uppercase />
                    </Accordion.Item>


                    {/* __#5__ */}
                    <Accordion.Item label={<QnAAccordionItemQuestion q="How can I pay for the service" icon={<Coin color="#fd0" />} />}>
                        <QnAAccordionItemAnswer >
                            You can add credits to the wallet using several payment methods such as: <br/>
                            <span style={{color:"#fd0"}} >Credit/Debit Cards, Crypto Currencies, E-wallets.</span> <br/>
                            the amount you pay will be automatically converted to USD and added as credits to the wallet. (1 Credit = 1 USD) <br/>
                            then, you can pay for the services using the personal wallet associated with your account on our website.
                        </QnAAccordionItemAnswer>
                    </Accordion.Item>


                    {/* __#6__ */}
                    <Accordion.Item label={<QnAAccordionItemQuestion q="How much time does it take for the service to be done" icon={<Clock color="#fd0" />} />}>
                        <QnAAccordionItemAnswer a="Usually, 3h to 12h. 48h at most." />
                    </Accordion.Item>


                    {/* __#7__ */}
                    <Accordion.Item label={<QnAAccordionItemQuestion q="Is the service always guaranteed to be done successfully" icon={<Star color="#fd0" />} />}>
                        <QnAAccordionItemAnswer a="Not always, but you are always guaranteed to get a refund in case we couldn't complete it successfully." uppercase />
                    </Accordion.Item>


                    
                </Accordion>

            </Paper>

        </Fragment>
    );
}


export default QNA;

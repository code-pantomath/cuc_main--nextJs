import { Text, Badge, useMantineTheme, } from "@mantine/core";
import { FC, } from "react";


interface IQnAAccordionItemAnswer {
    a?: string,
    uppercase?: boolean,
}

const QnAAccordionItemAnswer: FC<IQnAAccordionItemAnswer> = ({ children, a:answer, uppercase, }) => {

    const theme = useMantineTheme();


    return (
        
        <Badge mt="md" mb="md" p="xl" radius="xl" style={{ width:"100%", height:"auto", overflow:"hidden", }} variant="gradient" gradient={{ from: theme.colors.violet[9], to: theme.colors.violet[6] }} >
            <Text style={{ textTransform:uppercase?"uppercase":"none", wordWrap:"break-word", overflowWrap:"break-word", fontSize:"1.55vh" }} >
                {children || answer}
            </Text>
        </Badge>

    );
}


export default QnAAccordionItemAnswer;
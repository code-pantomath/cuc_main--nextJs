import { Group, ThemeIcon, Text, MantineTheme, useMantineTheme, } from "@mantine/core";
import { FC, } from "react";
import { Icon, QuestionMark } from "tabler-icons-react";


interface IQnAAccordionItemQuestion {
    q?: string,
    icon?: Icon | JSX.Element,
    theme?: MantineTheme,
}

const QnAAccordionItemQuestion: FC<IQnAAccordionItemQuestion> = ({ children, icon, q:question, }) => {

    const theme = useMantineTheme();


    return (
        
        <Group>
            <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ from: theme.colors.violet[9], to: theme.colors.violet[6] }} >
                {icon || <QuestionMark color="#fd0" />}
            </ThemeIcon>
            <Text size="xl" >{children || question} ?</Text>
        </Group>

    );
}


export default QnAAccordionItemQuestion;
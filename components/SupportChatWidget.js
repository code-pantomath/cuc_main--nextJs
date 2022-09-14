import dynamic from "next/dynamic";
// import { toggleWidget } from "react-chat-widget";


const SupportChatWidget = dynamic(() => import("react-chat-widget").then((mod) => mod.Widget), {
  loading: () => <>Loading&nbsp;&hellip;</>,
  ssr: false,
});

export default SupportChatWidget;



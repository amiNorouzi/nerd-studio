
import { LangParams } from "@/services/types"
import HomeLoading from "../../loading";
import dynamic from "next/dynamic";

const ContactUs = dynamic(() => import("@/components/pages/contact-us"), {
  loading: () => <HomeLoading />,
});
function ContactUsPage({ params}: LangParams){
  return (<ContactUs params={params}/>)
}
export default ContactUsPage
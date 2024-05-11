import { LangParams } from "@/services/types"
import HomeLoading from "../../loading";
import dynamic from "next/dynamic";


const AboutUsPage = dynamic(() => import("@/components/pages/about-us"), {
  loading: () => <HomeLoading />,
});
function AboutUs({ params}: LangParams) {
    return ( <AboutUsPage params={ params}/> );
}
 
export default AboutUs;


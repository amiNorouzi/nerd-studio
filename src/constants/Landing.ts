import {
  TbBrandApple,
  TbBrandChrome,
  TbBrandDiscord,
  TbBrandFirefox,
  TbCamera,
  TbCode,
  TbLanguage,
  TbMessages,
  TbMusic,
  TbWriting,
} from "react-icons/tb";
import { IconType } from "react-icons";

export const rewards = [
  {
    title: "Users",
    sub: "+200K users",
    img: "medal.png",
    id: "sdsdc121v",
  },
  {
    title: "Followers",
    sub: "+1M followers",
    img: "notify-heart.png",
    id: "sd79sdcv",
  },
  {
    title: "Generate",
    sub: "+10M generate/day",
    img: "premium.png",
    id: "sds1451dcv",
  },
];

export const steps = [
  {
    img: "step1.svg",
    title: "Easy Sign up",
    sub: "Empower your songwriting skills and create masterpieces with Write a Song.",
    id: "sdv61b",
    number: "NumberStepOne.svg",
  },
  {
    img: "step2.svg",
    title: "Add Extension",
    sub: "Empower your songwriting skills and create masterpieces with Write a Song.",
    id: "s8dvb",
    number: "NumberStepTow.svg",
  },
  {
    img: "step3.svg",
    title: "Enjoy Nerd Studio",
    sub: "Empower your songwriting skills and create masterpieces with Write a Song.",
    id: "sdv156b",
    number: "NumberStepThree.svg",
  },
];

export const starsArray = [1, 2, 3, 4, 5];

export const brandsArray: IconType[] = [
  TbBrandApple,
  TbBrandChrome,
  TbBrandDiscord,
  TbBrandFirefox,
];

interface BtnFeature {
  name: string;
  id: string;
  Icon: IconType;
  description:string
}

export const btnFeature: BtnFeature[] = [
  {
    name: "Rewrite",
    id: "21asr;g",
    Icon: TbWriting,
    description:'Rewrite.ai is a transformative platform at the forefront of linguistic innovation, leveraging the power of artificial intelligence to revolutionize content rewriting. With its cutting-edge algorithms and natural language processing capabilities, Rewrite.ai redefines traditional approaches to text rewriting. From paraphrasing to summarizing, the platform seamlessly generates high-quality,' +
      ' contextually relevant content in a fraction of the time it would take manually. Whether it\'s refreshing existing content for SEO optimization or creating diverse variations for A/B testing, Rewrite.ai empowers users with unparalleled efficiency and precision, driving productivity and elevating content quality to new heights in the digital age.'
  },
  {
    name: "Translate",
    id: "494srg",
    Icon: TbLanguage,
    description:'AI-driven translation is a transformative force reshaping global communication and breaking down language barriers like never before. Harnessing advanced neural network architectures and deep learning algorithms, AI translation platforms such as Lingua.AI are revolutionizing the way we bridge linguistic divides. With unparalleled accuracy and speed, these systems can seamlessly translate vast amounts of text, audio, and even visual content across multiple languages with remarkable fluency and nuance. From business documents to literature, AI translation not only facilitates cross-cultural exchange but also enhances accessibility and inclusivity on a global scale,' +
      ' fostering collaboration and understanding in an increasingly interconnected world.'
  },
  {
    name: "Chat",
    id: "156as;dv",
    Icon: TbMessages,
    description:"Engaging in conversation with AI-driven chatbots opens up a realm of possibilities for dynamic and intuitive interactions. These chatbots, such as Chatty.AI, are powered by sophisticated natural language processing models that enable them to understand and respond to human inquiries with remarkable accuracy and context sensitivity. Whether it's providing customer support, offering personalized recommendations, or even simulating human-like conversation, AI chatbots enhance user experiences by delivering instant, accessible assistance around the clock. With continuous learning and adaptation, these virtual assistants evolve to better serve their users, making interactions smoother," +
      " more efficient."
  },
  {
    name: "Image",
    id: "sv;av1697",
    Icon: TbCamera,
    description:'Image generation powered by artificial intelligence represents a groundbreaking leap in the realm of visual creativity. Leveraging deep learning techniques such as Generative Adversarial Networks (GANs), platforms like PixelGen.AI empower users to effortlessly produce stunning and photorealistic images from scratch or based on input prompts. By learning from vast datasets of existing images, AI algorithms can understand and replicate visual features, textures, and styles with astonishing fidelity, opening up a world of possibilities for artists, designers, and content creators. From generating realistic landscapes to crafting imaginative characters.'

  },
  {
    name: "Audio",
    id: "41sdv;b56",
    Icon: TbMusic,
    description:'Audio generation with AI heralds a new era of sonic innovation, empowering users to create immersive and customized audio experiences with unprecedented ease and versatility. Utilizing advanced machine learning algorithms like WaveNet and DeepWave, platforms such as SoundSynth.AI enable the synthesis of lifelike sounds, music, and voices from scratch or based on provided input. Whether it\'s generating realistic instrumentals, crafting bespoke sound effects for multimedia projects, or even synthesizing natural-sounding speech, AI-driven audio generation offers a transformative blend of efficiency and creativity. With the ability to learn from vast audio datasets, these algorithms capture the intricacies of tone, timbre, and rhythm, '

  },
  {
    name: "Code",
    id: "89cd;kb56",
    Icon: TbCode,
    description:'Code generation powered by artificial intelligence represents a paradigm shift in software development, streamlining the coding process and accelerating innovation. By leveraging sophisticated machine learning models such as GPT (Generative Pre-trained Transformer), platforms like CodeGen.AI enable developers to automatically generate high-quality code snippets tailored to specific tasks or programming languages. From routine tasks like variable declaration to complex algorithm implementation, AI-driven code generation offers unparalleled efficiency and accuracy, reducing the time and effort required to bring ideas to fruition. '

  },
];

export const openAiLogo = [
  {
    nameAI: "DALL·E",
    image: "openAl.png",
    id: "chs;as+vc40c56",
  },
  {
    nameAI: "PaLM",
    image: "image2.png",
    id: "chs;c4FMKc-56",
  },
  {
    nameAI: "Gemini",
    image: "gemini.png",
    id: "chWAZAa6r;56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#grc56",
  },
  {
    nameAI: "Stable Diffusion",
    image: "image1.png",
    id: "ch4d5h56",
  },
  {
    nameAI: "PaLM",
    image: "image2.png",
    id: "chs;c4c-56",
  },
  {
    nameAI: "Gemini",
    image: "gemini.png",
    id: "chs;c;56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#grQZOc56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#asv6==grc56",
  },
  {
    nameAI: "Stable Diffusion",
    image: "image1.png",
    id: "chs;c4XM.c!56",
  },
  {
    nameAI: "Gemini",
    image: "gemini.png",
    id: "chDasv46SV;56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#grZAW66f",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#gevqePPbqerc56",
  },
  {
    nameAI: "Stable Diffusion",
    image: "image1.png",
    id: "chs;c4avtc!56",
  },
];

export const ServiceSection = [
  {
    name: "Website",
    name2: "Apps",
    image: "service-3.svg",
    id: "1",
  },
  {
    name: "Apps",
    name2: "Mobile",
    image: "service-2.svg",
    id: "2",
  },
  {
    name: "Extension",
    image: "service-1.svg",
    id: "3",
  },
];

export const FooterLinks = [
  { name: "About" },
  { name: "Features" },
  { name: "Pricing" },
  { name: "News" },
  { name: "Help" },
];

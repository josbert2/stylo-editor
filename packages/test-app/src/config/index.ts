export interface MetadataConfig {
    title: string;
    description: string;
    author: string;
    keywords: string[];
    logo: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    socialMedia: {
      twitter: string;
      github: string;
      linkedin: string;
    };
    themeColor: string;
  }
  
  const metadata: MetadataConfig = {
    title: "Stylo Editor - Your Creative Playground",
    description: "A React component library for building style editors and design systems.",
    author: "Josbert Developer",
    keywords: ["React", "UI Components", "Style Editor", "Design System"],
    logo: {
      src: "/logo.png",
      alt: "Stylo Editor Logo",
      width: 120,
      height: 40,
    },
    socialMedia: {
      twitter: "@josbertdev",
      github: "https://github.com/josbert",
      linkedin: "https://linkedin.com/in/josbert",
    },
    themeColor: "#3b82f6",
  };
  
  export default metadata;
/**
 * ==============================================================================
 * PORTFOLIO CONTENT CONFIGURATION (content.js)
 * ==============================================================================
 * Welcome to your portfolio configuration file!
 *
 * YOU DO NOT NEED TO EDIT HTML OR CSS.
 * Everything on your website (name, role, tagline, photo, about text, experience,
 * skills, and contact information) is controlled directly from this single file.
 *
 * Simply edit the values inside the `siteContent` object below, save this file,
 * and refresh your browser to see your changes live.
 * ==============================================================================
 */

const siteContent = {
  // ----------------------------------------------------------------------------
  // 1. PERSONAL INFORMATION
  // ----------------------------------------------------------------------------

  // Your full name - shown in the navbar logo, hero heading, page title, and footer
  name: "Areeb Ahmad",

  // Your primary job title / role - displayed with a typing animation in the Hero
  role: "WordPress Developer",

  // A brief professional summary displayed directly beneath your name and role
  tagline: "I specialize in designing and developing modern, responsive, and high-performance WordPress websites that combine creative design with seamless functionality. My goal is to transform ideas into engaging digital experiences that enhance user experience, strengthen online presence, and help businesses grow successfully.",

  // Your location or status - displayed as a badge in the Hero section
  // Example: "Lahore, Pakistan", "London, UK", or "Remote / Worldwide"
  location: "Faisalabad, Pakistan",

  // Path to your profile picture relative to index.html
  // Replace the image file inside the 'assets/' folder or update this path.
  // If the file is missing, the site will automatically display an elegant circle with your initials "AA".
  photo: "assets/portfolio.jpg",

  // ----------------------------------------------------------------------------
  // 2. ABOUT SECTION
  // ----------------------------------------------------------------------------

  // The main heading for the About Me section
  aboutTitle: "About Me",

  // The paragraphs in the About section, displayed in this exact order.
  // You can edit the text inside any quotes, or add/remove paragraphs as needed.
  about: [
    "Hi, I'm Areeb, a passionate WordPress Developer dedicated to creating modern, responsive, and high-quality websites. I am currently pursuing my Bachelor of Science (BS) degree while continuously expanding my knowledge and skills in web development.",
    "With one year of hands-on experience in WordPress development, I specialize in building visually appealing, user-friendly, and functional websites that align with business goals and brand identities. I enjoy transforming creative ideas into professional digital experiences by combining clean design, seamless functionality, and optimized performance.",
    "My focus is on developing websites that provide an excellent user experience across all devices, ensuring they are responsive, easy to navigate, and built with attention to detail. I am also passionate about learning new technologies, exploring modern design trends, and improving my development skills to deliver better digital solutions.",
    "I believe every website should do more than just look good; it should create value, build credibility, and help businesses establish a strong online presence. My goal is to continue growing as a WordPress Developer while creating meaningful digital experiences through creativity, dedication, and continuous improvement."
  ],

  // ----------------------------------------------------------------------------
  // 3. SKILLS
  // ----------------------------------------------------------------------------

  // List of technical skills, displayed as pill-shaped tags in the About section.
  // HOW TO ADD MORE SKILLS:
  // Simply add more strings separated by commas inside the square brackets [ ].
  // Examples to add: "Elementor", "PHP", "WooCommerce", "SEO", "Responsive Design",
  // "Custom Themes", "HTML5 & CSS3", "Speed Optimization", "ACF".
  skills: [
    "WordPress Developer",
    "Prompt Engineering"
    // "Elementor",
    // "PHP",
    // "WooCommerce",
    // "SEO",
    // "Responsive Design"
  ],

  // ----------------------------------------------------------------------------
  // 4. WORK EXPERIENCE
  // ----------------------------------------------------------------------------

  // An array of experience cards rendered in the Experience timeline.
  //
  // HOW TO ADD A NEW EXPERIENCE:
  // Copy one of the objects inside { ... }, add a comma after the previous one,
  // and paste it below. Every entry will automatically render on the website!
  //
  // Example:
  // {
  //   role: "Senior WordPress Specialist",
  //   company: "Acme Web Solutions",
  //   duration: "2024 - Present",
  //   description: "Engineered high-converting e-commerce stores with WooCommerce and custom plugin integrations."
  // }
  experience: [
    {
      role: "WordPress Developer",
      company: "Freelancer",
      duration: "1 Year",
      description: "Designed and developed responsive WordPress websites with custom themes and ongoing maintenance for business clients."
    },
    {
      role: "Prompt Engineer",
      company: "Freelance",
      duration: "1 Year",
      description: "Crafted, evaluated, and optimized advanced prompts for large language models to automate workflows, streamline development, and generate high-quality AI solutions."
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. CONTACT DETAILS
  // ----------------------------------------------------------------------------

  // Your contact information rendered in the Contact section.
  // Phone will be rendered as a clickable "tel:" link.
  // Email will be rendered as a clickable "mailto:" link.
  contact: {
    phone: "+92 305-1113614",
    email: "mianareeb3614@gmail.com"
  }
};

// Export to window object for standalone browser usage without CORS or bundling issues
if (typeof window !== "undefined") {
  window.siteContent = siteContent;
}

// Export for Node/CommonJS environments if imported in build tools
if (typeof module !== "undefined" && module.exports) {
  module.exports = siteContent;
}

# Areeb Ahmad - Personal Portfolio Website

A sleek, premium, dark-mode personal portfolio website for **Areeb Ahmad (WordPress Developer)**. Built with semantic HTML5, modern CSS3, and vanilla JavaScript—no frameworks, external dependencies, or build tools required.

---

## 📁 File Structure

```text
areeb-portfolio/
│
├── index.html       # Clean HTML5 structure and layout scaffolding
├── styles.css       # Complete design system, colors, layout, and animations
├── script.js        # Content renderer, typing effect, scroll animations & interactive menu
├── content.js       # ⭐ ALL editable text, contact details, and image path in one file
├── assets/          # Media directory
│   └── profile.jpg  # Profile photo (with automatic fallback to "AA" initials circle)
└── README.md        # Documentation and maintenance guide
```

---

## 🚀 How to Open the Website in a Browser

No Node.js, npm, or build step is required:

1. **Direct Double-Click**:
   - Double-click `index.html` in your file explorer (or right-click `index.html` -> **Open with** -> **Google Chrome**, **Microsoft Edge**, **Brave**, or **Firefox**).
2. **With VS Code Live Server (Optional)**:
   - If you use Visual Studio Code, right-click `index.html` and choose **"Open with Live Server"**.

---

## ✏️ How to Edit Content (`content.js`)

**You never need to edit `index.html` or `styles.css`.** Everything is controlled by changing values inside `content.js`. Open `content.js` in any text editor (such as Notepad or VS Code), edit the fields, and save.

### 1. Update Name, Role, Tagline, & Location
```javascript
name: "Areeb Ahmad",
role: "WordPress Developer",
tagline: "I specialize in designing and developing modern...",
location: "Lahore, Pakistan", // Or your city, country
```

### 2. Update the About Me Paragraphs
The paragraphs are stored in an array. Edit any sentence inside the quotes or add new paragraphs:
```javascript
aboutTitle: "About Me",
about: [
  "Hi, I'm Areeb...",
  "With one year of hands-on experience...",
  "My focus is on developing websites...",
  "I believe every website should do more..."
]
```

### 3. Add or Remove Skills
To add more skill pills, simply add more quoted strings separated by commas:
```javascript
skills: [
  "WordPress Developer",
  "Elementor",
  "WooCommerce",
  "PHP",
  "SEO",
  "Responsive Design",
  "Speed Optimization"
]
```

### 4. Add a New Work Experience Card
To add another job or freelance project to your timeline, copy an experience block and add it to the `experience` array. The website will automatically render the new timeline card:
```javascript
experience: [
  {
    role: "WordPress Developer",
    company: "Freelance",
    duration: "1 Year",
    description: "Built custom client themes, integrated WooCommerce stores, and optimized core web vitals."
  },
  // Example of adding a new entry:
  {
    role: "Senior WordPress Specialist",
    company: "Digital Agency",
    duration: "2024 - Present",
    description: "Spearheaded custom theme development and high-converting e-commerce solutions for enterprise clients."
  }
]
```

### 5. Update Contact Details
```javascript
contact: {
  phone: "+92 300 1234567",
  email: "areeb.ahmad@example.com"
}
```
- The phone number automatically creates a one-click `tel:` link.
- The email address automatically creates a one-click `mailto:` link.

---

## 🖼️ How to Replace the Profile Photo

1. Place your photo inside the `assets/` folder and name it `profile.jpg` (e.g. `assets/profile.jpg`).
2. Alternatively, if your photo has a different filename or extension (like `my-photo.png`), update line `photo:` in `content.js`:
   ```javascript
   photo: "assets/my-photo.png",
   ```
3. **Graceful Fallback**: If the photo file is missing or fails to load, the website automatically displays an initials circle with **"AA"** inside an animated glow ring.

---

## 🎨 Color Palette Reference

All colors are defined as CSS variables in `:root` inside `styles.css`:

| Variable | Hex Code | Usage |
| :--- | :--- | :--- |
| `--black` | `#080808` | Primary background color |
| `--charcoal` | `#171317` | Cards, navigation bar, contrasting surfaces |
| `--maroon` | `#310D19` | Buttons, timeline accent, borders, hover glows |
| `--off-white` | `#F5F1F2` | Headings, body typography, active text |

---

## ✨ Built-in Animations & Features

- **Hero Typing Effect**: Animates your role letter-by-letter with a blinking cursor.
- **Scroll Reveal**: Sections and cards glide smoothly into view as you scroll.
- **Experience Timeline**: The vertical accent line draws downward matching your scroll position.
- **Glow & Hover States**: Buttons and cards lift with a rich maroon glow on hover.
- **Dynamic Copyright**: The footer year automatically reflects the current year.
- **Mobile Hamburger Menu**: Accessible slide-down navigation on screens below 768px.
- **Accessibility**: Honors the user's `prefers-reduced-motion` settings.

# Static Pages for Apps

This repository hosts static HTML pages for various mobile applications, including privacy policies, terms and conditions, about pages, and other legal/informational content.

## 📱 Current Apps

### Quit Smoking - Android App
A mobile application designed to help people quit smoking and live healthier lives.

**Pages:**
- Privacy Policy
- Terms & Conditions
- About Us

## 🔄 Versioning System

Each app maintains two types of pages:

1. **Latest Version** (Root directory)
   - Located directly in the app folder (e.g., `smoking/policy.html`)
   - Always points to the current version
   - Used for production apps

2. **Archived Versions** (URL directory)
   - Located in `url/{page-type}/version/v-{major}-{minor}/`
   - Maintains historical versions of policies
   - Useful for compliance and user reference

## 🚀 Adding a New App

To add pages for a new application:

1. Create a new directory with your app name:
   ```
   sites/
   └── your-app-name/
   ```

2. Add your HTML pages:
   ```
   your-app-name/
   ├── about.html
   ├── policy.html
   ├── terms.html
   └── assets/
       ├── ic_logo-yourapp.png
       ├── style.css
       └── main.js
   ```

3. Create version structure:
   ```
   your-app-name/
   └── url/
       ├── about/version/v-1-0/about.html
       ├── policy/version/v-1-0/policy.html
       └── terms/version/v-1-0/terms.html
   ```

## 📧 Contact

For questions or support, contact: **gobinda.nandi.public@gmail.com**

## ☕ Support

If you find these resources helpful, consider [buying me a coffee](https://www.buymeacoffee.com/iGobinda)!

## 📄 License

This repository contains legal documents and static pages for mobile applications. Please ensure all content complies with relevant laws and regulations in your jurisdiction.

---

**Developer:** Gobinda Nandi  
**Location:** India


# Aditya Kumar - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations
- **Fast Performance**: Built with Vite for optimal build and development speed
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Easy to Update**: Component-based architecture for easy content updates

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy to portfolio.unsortedbytes.in

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The build files will be in the `dist` folder**

3. **Deploy using your preferred method:**

   #### Option 1: Using Nginx
   - Upload the `dist` folder contents to your server
   - Configure Nginx to serve the files:
   
   ```nginx
   server {
       listen 80;
       server_name portfolio.unsortedbytes.in;
       root /var/www/portfolio/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

   #### Option 2: Using Vercel
   ```bash
   npm install -g vercel
   vercel --prod
   ```

   #### Option 3: Using Netlify
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

## 📝 Customization

To update your information:

1. **Hero Section**: Edit `src/components/Hero.tsx`
2. **About Section**: Edit `src/components/About.tsx`
3. **Experience**: Edit `src/components/Experience.tsx`
4. **Projects**: Edit `src/components/Projects.tsx`
5. **Skills**: Edit `src/components/Skills.tsx`
6. **Contact Info**: Edit `src/components/Contact.tsx`

## 📧 Contact

- Email: adi.bytes@gmail.com
- GitHub: [@unsortedbytes](https://github.com/unsortedbytes)
- LinkedIn: [Aditya Kumar](https://www.linkedin.com/in/aditya-kumar-b7b79b22b/)

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ by Aditya Kumar

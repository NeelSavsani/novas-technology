# Cloudflare Pages Free Deployment Guide for Nova's Technology

Aapka project 100% Cloudflare Pages Free Plan ke liye configure ho chuka hai. Kutch bhi remove nahi kiya gaya hai aur sari cheeje (Security Headers, Clean URLs, Dynamic Lead Routing via WhatsApp, Local Inquiries Backup, 404 Custom Page, Sitemap) perfectly set hain.

---

## Method 1: Direct Upload (Sabse aasan - Sirf 1 Minute me Live!)

1. **Cloudflare Dashboard par jayein:**
   - [https://dash.cloudflare.com/](https://dash.cloudflare.com/) par login karein (Free account).

2. **Pages section open karein:**
   - Left sidebar me **Workers & Pages** par click karein.
   - **Create application** button par click karein.
   - **Pages** tab select karein.
   - **Upload assets** option chuniye.

3. **Project Name dalein:**
   - Project Name: 
ovas-technology (ya jo aap chahein).
   - Click **Create project**.

4. **Files Upload karein:**
   - Upload folder button par click karein aur is directory ke sare files aur folders (ssets, css, js, saare .html files, _headers, _redirects, sitemap.xml, obots.txt) ko drag & drop karein:
     C:\Users\prince prajapati\.gemini\antigravity\scratch\novas-technology
   - Click **Deploy site**.

5. **Site Live Ho Gayi!**
   - Cloudflare aapko turant ek free fast URL de dega:
     https://novas-technology.pages.dev (Free SSL Certificate ke saath).

6. **Apna Custom Domain connect karein (Optional):**
   - Cloudflare Pages project me **Custom domains** tab par click karein.
   - Apna domain name dalein (e.g. 
ovastechnology.com).
   - Cloudflare automatically free HTTPS SSL activate kar dega.

---

## Method 2: GitHub se Deploy karein (Auto Deploy on Push)

1. Is folder ko apne GitHub repository me push karein.
2. Cloudflare Pages me jakar **Connect to Git** select karein.
3. Apna repository choose karein:
   - **Framework preset**: None
   - **Build command**: (Empty chhod dein)
   - **Build output directory**: / (ya empty)
4. Click **Save and Deploy**.

---

## Cloudflare Free Plan Configurations Already Included:

1. **_headers File**:
   - Cloudflare CDN caching for images/CSS/JS (1 year immutable cache).
   - Enterprise security headers (X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Referrer-Policy).

2. **_redirects File**:
   - Clean URLs support (jaise /about, /services, /portfolio, /contact bina .html lagaye bhi open honge).

3. **404.html Custom Page**:
   - Agar koi galat URL open kare toh branded 404 page dikhega jisme Home, Portfolio, Services, aur WhatsApp direct button shamil hain.

4. **100% Free Real-Time Lead Delivery (WhatsApp + Browser Storage)**:
   - Koi bhi client website par quote ya inquiry form submit karega toh turant **+91 73833 20403 (Divy Patel)** par WhatsApp trigger button generate hoga saari details ke saath.
   - Ek local audit copy client ke browser me 
ovas_inquiries me bhi save rehti hai.
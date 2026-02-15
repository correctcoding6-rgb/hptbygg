# 📸 Image Management Guide

This guide explains how to add and manage images for your HPT Bygg website.

## 🗂️ Folder Structure

```
images/
├── hero/       → Hero section image (1 image)
└── gallery/    → Gallery slideshow images (unlimited)
```

## 🎯 How to Add Images

### Step 1: Add Your Image Files

Place your image files in the appropriate folders:

- **Hero Section** (`images/hero/`)
  - Add 1 high-quality image
  - Recommended size: 1920x1080 or larger
  - Example: `hero-main.jpg`

- **Gallery** (`images/gallery/`)
  - Add as many images as you want
  - All images will appear in the slideshow
  - Name files descriptively
  - Examples: `kitchen-cabinet.jpg`, `oak-staircase.jpg`, `live-edge-table.jpg`

### Step 2: Update the Configuration

Open `script.js` and find the `IMAGE_CONFIG` section at the top (around line 3).

#### Update Hero Image

```javascript
const IMAGE_CONFIG = {
  hero: 'images/hero/your-image-name.jpg',  // ← Change this to match your filename
```

#### Update Gallery Images

```javascript
  gallery: [
    { url: 'images/gallery/image1.jpg', caption: 'Your caption here' },
    { url: 'images/gallery/image2.jpg', caption: 'Another caption' },
    { url: 'images/gallery/image3.jpg', caption: 'More captions' },
    // Add as many as you want!
  ]
};
```

## ✅ Supported Image Formats

- `.jpg` / `.jpeg` (recommended for photos)
- `.png` (good for graphics with transparency)
- `.webp` (modern format, great compression)

## 💡 Tips

1. **Optimize your images** before uploading for faster page load times
2. **Use descriptive filenames** like `oak-kitchen-cabinet.jpg` instead of `IMG_1234.jpg`
3. **Keep consistent quality** - all gallery images should be similar resolution
4. **Write good captions** - they appear when users hover over gallery images

## 🔄 Example: Adding a New Gallery Image

1. Save your image to `images/gallery/custom-furniture.jpg`
2. Open `script.js`
3. Find the `gallery:` array in `IMAGE_CONFIG`
4. Add a new line:
   ```javascript
   { url: 'images/gallery/custom-furniture.jpg', caption: 'Handgjorda möbler' },
   ```
5. Save and refresh your browser

## ❓ Troubleshooting

**Image not showing?**
- Check that the filename in `script.js` exactly matches the actual file (including extension)
- Check that the image is in the correct folder
- Check browser console (F12) for errors

**Image looks stretched?**
- Make sure your image has the correct aspect ratio
- Gallery images work best as squares (1:1 ratio)
- Hero image works best as landscape (16:9 ratio)

---

**Questions?** Check the image paths in `script.js` match your actual filenames exactly!

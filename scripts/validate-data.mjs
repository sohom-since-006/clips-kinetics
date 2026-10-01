import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function validate() {
  console.log('--- Running Clips Kinetics Data Validation ---');
  let errors = [];

  // 1. Validate site.js
  const { siteConfig } = await import('../src/data/site.js');
  
  if (!siteConfig.phone || !/^\d+$/.test(siteConfig.phone)) {
    errors.push(`siteConfig.phone must contain digits only. Found: "${siteConfig.phone}"`);
  }

  siteConfig.socials.forEach((social) => {
    if (!social.url.startsWith('https://')) {
      errors.push(`Social url for "${social.name}" must start with https://. Found: "${social.url}"`);
    }
  });

  // 2. Validate videos.js
  const { videoSections } = await import('../src/data/videos.js');
  const seenVideoIds = new Set();

  videoSections.forEach((section) => {
    const validFilters = section.filters ? section.filters.map(f => f.id) : null;

    section.videos.forEach((video) => {
      // Rule: No 'title' field
      if (video.title !== undefined) {
        errors.push(`Video "${video.id}" contains forbidden field 'title'. Videos must not show titles.`);
      }

      // Rule: Unique id
      if (seenVideoIds.has(video.id)) {
        errors.push(`Duplicate video id found: "${video.id}"`);
      }
      seenVideoIds.add(video.id);

      // Rule: Valid driveId
      if (!video.driveId || /[\s/]/.test(video.driveId)) {
        errors.push(`Invalid driveId in video "${video.id}": "${video.driveId}"`);
      }

      // Rule: Filter exists in section filters
      if (video.filter && validFilters && !validFilters.includes(video.filter)) {
        errors.push(`Video "${video.id}" has filter "${video.filter}" which is not defined in section "${section.id}" filters.`);
      }

      // Check coverImage exists if specified
      if (video.coverImage) {
        const fullCoverPath = path.join(rootDir, 'public', video.coverImage);
        if (!fs.existsSync(fullCoverPath)) {
          errors.push(`Video cover image not found on disk: "${video.coverImage}" (resolved: ${fullCoverPath})`);
        }
      }
    });
  });

  // 3. Validate images.js
  const { galleries } = await import('../src/data/images.js');
  const seenImageIds = new Set();

  Object.values(galleries).forEach((gallery) => {
    gallery.items.forEach((item) => {
      if (seenImageIds.has(item.id)) {
        errors.push(`Duplicate image id found: "${item.id}"`);
      }
      seenImageIds.add(item.id);

      if (!item.alt || typeof item.alt !== 'string' || item.alt.trim().length === 0) {
        errors.push(`Image "${item.id}" is missing required 'alt' text.`);
      }

      if (!item.width || !item.height) {
        errors.push(`Image "${item.id}" is missing width or height dimensions.`);
      }

      const fullImagePath = path.join(rootDir, 'public', item.src);
      if (!fs.existsSync(fullImagePath)) {
        errors.push(`Gallery image not found on disk: "${item.src}" (resolved: ${fullImagePath})`);
      }
    });
  });

  // 4. Validate services.js
  const { services, shootingPackages } = await import('../src/data/services.js');
  if (!services || services.length !== 6) {
    errors.push(`Expected 6 services. Found: ${services?.length || 0}`);
  }

  // 5. Validate shootingPackages
  if (!shootingPackages || shootingPackages.length !== 8) {
    errors.push(`Expected 8 shooting packages. Found: ${shootingPackages?.length || 0}`);
  } else {
    shootingPackages.forEach((pkg) => {
      if (!pkg.id || !pkg.title || !pkg.quoteMessage) {
        errors.push(`Shooting package "${pkg.id || 'unknown'}" missing required fields.`);
      }
      if (pkg.price !== undefined) {
        errors.push(`Shooting package "${pkg.id}" must not display prices. Pricing is quote-only via WhatsApp.`);
      }
    });
  }

  // 6. Validate testimonials.js
  const { initialTestimonials } = await import('../src/data/testimonials.js');
  if (!initialTestimonials || initialTestimonials.length < 6) {
    errors.push(`Expected at least 6 testimonials. Found: ${initialTestimonials?.length || 0}`);
  } else {
    initialTestimonials.forEach((test) => {
      if (!test.id || !test.name || !test.text || !test.rating) {
        errors.push(`Testimonial "${test.id || 'unknown'}" missing required fields.`);
      }
    });
  }

  if (errors.length > 0) {
    console.error(`\nValidation FAILED with ${errors.length} error(s):`);
    errors.forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
    process.exit(1);
  } else {
    console.log(`✓ All data files passed validation!`);
    console.log(`  - ${seenVideoIds.size} videos checked.`);
    console.log(`  - ${seenImageIds.size} gallery assets checked.`);
    console.log(`  - ${services.length} core services verified.`);
    console.log(`  - ${shootingPackages?.length || 0} shooting packages verified.`);
    console.log(`  - ${initialTestimonials.length} client testimonials verified.`);
    console.log(`  - Social links and contact info verified.`);
  }
}

validate().catch((err) => {
  console.error('Validation script error:', err);
  process.exit(1);
});

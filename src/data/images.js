/**
 * Gallery Images Data (Commercial & Restaurant Branding)
 * 
 * Rules:
 * - Every image has src, alt, width, height
 * - Alt text is neutral, descriptive, and never leaks client personal info
 * - Lightbox enabled for full-size inspection
 */

export const galleries = {
  restaurantBranding: {
    id: "restaurant-branding",
    title: "Restaurant Branding",
    description: "Appetising menu designs, promotional social posters, and aesthetic culinary visual identities.",
    aspectRatio: "4:5",
    items: [
      {
        id: "rest-1",
        src: "/images/gallery/rest-1.webp",
        alt: "Gourmet burger promotional social media creative",
        width: 1080,
        height: 1350,
        category: "Social Creative"
      },
      {
        id: "rest-2",
        src: "/images/gallery/rest-2.webp",
        alt: "Artisan cafe and bakery seasonal beverage poster",
        width: 1080,
        height: 1350,
        category: "Special Menu"
      },
      {
        id: "rest-3",
        src: "/images/gallery/rest-3.webp",
        alt: "Fine dining restaurant weekend special announcement banner",
        width: 1080,
        height: 1350,
        category: "Promotional Banner"
      },
      {
        id: "rest-4",
        src: "/images/gallery/rest-4.webp",
        alt: "Wood-fired pizzeria craft branding and launch post",
        width: 1080,
        height: 1350,
        category: "Brand Identity"
      }
    ]
  }
};

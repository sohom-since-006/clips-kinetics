/**
 * Video Data Definitions
 * 
 * STRICT RULES:
 * 1. NO video names, client names, or file names may appear on the website.
 * 2. NO 'title' property on video objects.
 * 3. 'internalNote' is strictly for your internal reference and is NEVER rendered in UI.
 * 4. Only store the Google Drive file ID (e.g. '1234567890abcdefghijklmnopqrstuvw').
 * 5. Aspect ratios: '9:16' for vertical (reels/shorts), '16:9' for horizontal (YouTube/events).
 */

export const videoSections = [
  {
    id: "short-form",
    heading: "Short-Form Edits",
    description: "High-paced 9:16 vertical cuts optimised for peak retention on Instagram Reels, YouTube Shorts, and TikTok.",
    aspectRatio: "9:16",
    filters: [
      { id: "all", label: "All Edits" },
      { id: "commercial", label: "Brand & Commercial" },
      { id: "podcast", label: "Podcast Clips" },
      { id: "entertainment", label: "Entertainment & Gaming" },
      { id: "travel", label: "Travel & Lifestyle" }
    ],
    videos: [
      {
        id: "short-1",
        driveId: "1p0G2dJv1O9YhF7_v2yJk3LMnoPQrStUv",
        aspectRatio: "9:16",
        filter: "commercial",
        coverImage: "/images/covers/short-1.webp",
        internalNote: "Gym Apparel Promotional Reel"
      },
      {
        id: "short-2",
        driveId: "1q1H3eKw2P0ZiG8_w3zKl4MNopQRsTuVw",
        aspectRatio: "9:16",
        filter: "podcast",
        coverImage: "/images/covers/short-2.webp",
        internalNote: "Founder Mindset Interview Cut"
      },
      {
        id: "short-3",
        driveId: "1r2I4fLx3Q1AjH9_x4aLm5NOpqRStUvWx",
        aspectRatio: "9:16",
        filter: "entertainment",
        coverImage: "/images/covers/short-3.webp",
        internalNote: "Gaming Stream Highlight Hook"
      },
      {
        id: "short-4",
        driveId: "1s3J5gMy4R2BkI0_y5bMn6OPqrSTuVwXy",
        aspectRatio: "9:16",
        filter: "travel",
        coverImage: "/images/covers/short-4.webp",
        internalNote: "Mountains Sunset Drone & Beat Cut"
      },
      {
        id: "short-5",
        driveId: "1t4K6hNz5S3ClJ1_z6cNo7PQrsTUvWxYz",
        aspectRatio: "9:16",
        filter: "commercial",
        coverImage: "/images/covers/short-5.webp",
        internalNote: "Cafe Special Menu Launch Reel"
      },
      {
        id: "short-6",
        driveId: "1u5L7iO06T4DmK2_07dOp8QRstUVwXyZa",
        aspectRatio: "9:16",
        filter: "entertainment",
        coverImage: "/images/covers/short-6.webp",
        internalNote: "Street Magic Reaction Short"
      }
    ]
  },
  {
    id: "long-form",
    heading: "Long-Form Edits",
    description: "Structured narrative flow, documentary storytelling, and YouTube full-length video editing.",
    aspectRatio: "16:9",
    videos: [
      {
        id: "long-1",
        driveId: "1v6M8jP17U5EnL3_18ePq9RStuVWxYzAb",
        aspectRatio: "16:9",
        coverImage: "/images/covers/long-1.webp",
        internalNote: "Documentary Deep Dive"
      },
      {
        id: "long-2",
        driveId: "1w7N9kQ28V6FoM4_29fQr0STuvWXyZaBc",
        aspectRatio: "16:9",
        coverImage: "/images/covers/long-2.webp",
        internalNote: "Tech Review & Benchmark Video"
      },
      {
        id: "long-3",
        driveId: "1x8O0lR39W7GpN5_30gRs1TUvwXYZabCd",
        aspectRatio: "16:9",
        coverImage: "/images/covers/long-3.webp",
        internalNote: "Finance Breakdown Essay"
      },
      {
        id: "long-4",
        driveId: "1y9P1mS40X8HqO6_41hSt2UVwxYZabCde",
        aspectRatio: "16:9",
        coverImage: "/images/covers/long-4.webp",
        internalNote: "Travel Documentary Episode"
      }
    ]
  },
  {
    id: "events",
    heading: "Event Coverage",
    description: "Capturing the energy, atmosphere, and key moments of live corporate showcases and celebrations.",
    aspectRatio: "16:9",
    videos: [
      {
        id: "event-1",
        driveId: "1z0Q2nT51Y9IrP7_52iTu3VWxyZAbCdef",
        aspectRatio: "16:9",
        coverImage: "/images/covers/event-1.webp",
        internalNote: "Corporate Annual Gala Aftermovie"
      },
      {
        id: "event-2",
        driveId: "1a1R3oU62Z0JsQ8_63jUv4WXyzBCdefg",
        aspectRatio: "16:9",
        coverImage: "/images/covers/event-2.webp",
        internalNote: "College Fest Highlights Film"
      }
    ]
  },
  {
    id: "festivals-shoots",
    heading: "Festivals & Cinematic Shoots",
    description: "Colourful cinematic grading, slow-motion framing, and traditional cultural aesthetic captures.",
    aspectRatio: "16:9",
    videos: [
      {
        id: "fest-1",
        driveId: "1b2S4pV73A1KtR9_74kVw5XYzaCdefgh",
        aspectRatio: "16:9",
        coverImage: "/images/covers/fest-1.webp",
        internalNote: "Durga Puja Immersion Cinematic Montage"
      },
      {
        id: "fest-2",
        driveId: "1c3T5qW84B2LuS0_85lWx6YZabDefghi",
        aspectRatio: "16:9",
        coverImage: "/images/covers/fest-2.webp",
        internalNote: "Traditional Wedding Cinematic Teaser"
      }
    ]
  }
];

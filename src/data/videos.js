/**
 * Video Data Definitions
 * 
 * STRICT RULES:
 * 1. NO video names, client names, or file names may appear on the website.
 * 2. NO 'title' property on video objects.
 * 3. 'internalNote' is strictly for Sohom's private reference and is NEVER rendered in UI.
 * 4. Only store clean Google Drive file IDs or share links (cleaned automatically).
 * 5. Aspect ratios: '9:16' for vertical (reels/shorts), '16:9' for horizontal (YouTube/cinematic).
 */

export const videoSections = [
  {
    id: "brand-reels",
    heading: "Brand Commercials & Client Reels",
    badge: "Featured Collaborations",
    description: "High-conversion promotional reels, product showcases, and official brand advertisements crafted for business growth.",
    aspectRatio: "9:16",
    isHighlighted: true,
    videos: [
      {
        id: "brand-1",
        driveId: "1ySXg1c-AGWVJMT5G3SFzo73_fmmwgvei",
        aspectRatio: "9:16",
        internalNote: "Autoptions Delhi"
      },
      {
        id: "brand-2",
        driveId: "149q56JJ4uhaQmRPCaC5Sw9Oqs3Aw_7Vk",
        aspectRatio: "9:16",
        internalNote: "Kotak Stockshaala 1"
      },
      {
        id: "brand-3",
        driveId: "1ZEM64sM2LJtNuymoV8kbNgeSxMgjYPVL",
        aspectRatio: "9:16",
        internalNote: "Orlando's Pro"
      },
      {
        id: "brand-4",
        driveId: "1oAPGYtQN_Hct00uZK47rpNoshlcEXcW9",
        aspectRatio: "9:16",
        internalNote: "Khandelwal Motorcraft"
      },
      {
        id: "brand-5",
        driveId: "1Q9WB9v8e9HjqP1ShKs93Ndaxj9SpH5xn",
        aspectRatio: "9:16",
        internalNote: "Drzzln Courtyard"
      },
      {
        id: "brand-6",
        driveId: "1tjDh3HoVvnHMGLG3nJOtLQ1euo5j37-x",
        aspectRatio: "9:16",
        internalNote: "Reliable Landscaping LLC"
      },
      {
        id: "brand-7",
        driveId: "192cz56FZZnsen7AU1VC_of8Unb_Lt3UG",
        aspectRatio: "9:16",
        internalNote: "Kotak Stockshaala 2"
      },
      {
        id: "brand-8",
        driveId: "1ulMmEdKppBnRkDvuxa3bzzCHUUXXiIbw",
        aspectRatio: "9:16",
        internalNote: "Job Grade"
      },
      {
        id: "brand-9",
        driveId: "1mbjmYsCnJa62LzXs6BrNDuAsXmAnyxTa",
        aspectRatio: "9:16",
        internalNote: "Autoptions"
      },
      {
        id: "brand-10",
        driveId: "1HUqmpaCCVYC3rKMJp9NFfbhIG2AIcjzH",
        aspectRatio: "9:16",
        internalNote: "Carpet Planet"
      }
    ]
  },
  {
    id: "content-creators",
    heading: "Content Creators & Viral Reels",
    badge: "Retention Focused",
    description: "Fast-paced, hook-driven edits built for creators, coaches, and digital entrepreneurs across Instagram and YouTube Shorts.",
    aspectRatio: "9:16",
    isHighlighted: false,
    videos: [
      {
        id: "creator-1",
        driveId: "1WBrLrEDOTN7v5qQ6p79JT3rLTQj0lyP2",
        aspectRatio: "9:16",
        internalNote: "Motivational"
      },
      {
        id: "creator-2",
        driveId: "16zLin6zv-uwZkZMmpK5sVRJ3fqIJ6_4Z",
        aspectRatio: "9:16",
        internalNote: "Facts Reels client 1"
      },
      {
        id: "creator-3",
        driveId: "1LQCxhB-KSq5Js9g4sobn7qWsyfwNEp1B",
        aspectRatio: "9:16",
        internalNote: "Makeup Related 1"
      },
      {
        id: "creator-4",
        driveId: "1q4JJNmN6CzWlc87ByYy_DL7mgrEgQj-A",
        aspectRatio: "9:16",
        internalNote: "Digital Marketing"
      },
      {
        id: "creator-5",
        driveId: "1adSPhiOcnBu0oBSLa6I_pzNanrCiP7h2",
        aspectRatio: "9:16",
        internalNote: "Finance Knowledge sharing"
      },
      {
        id: "creator-6",
        driveId: "108Jo7722MGi0CkT74UsJ4HWaLFUMh3_l",
        aspectRatio: "9:16",
        internalNote: "Women Inspiring Stories"
      },
      {
        id: "creator-7",
        driveId: "18DQW_4qgYRwPs8COSB5677T6dBoT7C3I",
        aspectRatio: "9:16",
        internalNote: "Software Dropshipping Idea"
      },
      {
        id: "creator-8",
        driveId: "1WI9QvbrddLpF4-9aL90eLQCZOju3cc3m",
        aspectRatio: "9:16",
        internalNote: "Facts Sharing Reel 1"
      },
      {
        id: "creator-9",
        driveId: "1ZjI7OkQllDVMSXrkWYYN1RamtRpK8rS_",
        aspectRatio: "9:16",
        internalNote: "Health Improvement Idea suggestion"
      },
      {
        id: "creator-10",
        driveId: "1-YA6KUD2QitA9Neou8DmEXRazd9vA_HG",
        aspectRatio: "9:16",
        internalNote: "Online Business"
      },
      {
        id: "creator-11",
        driveId: "1IXjNAdWDKGe7Eyk6W8bLtJpMwMftqr_c",
        aspectRatio: "9:16",
        internalNote: "Makeup Related 2"
      },
      {
        id: "creator-12",
        driveId: "1ulBh_FtFmJ2RavQa881ykYmD5XMqVur_",
        aspectRatio: "9:16",
        internalNote: "Doctor Client Suggestion video"
      },
      {
        id: "creator-13",
        driveId: "1iFEv3jWYZI8T5p5eA54MYeXsHAcSiSo2",
        aspectRatio: "9:16",
        internalNote: "Facebook Ads"
      },
      {
        id: "creator-14",
        driveId: "1CWAD467g1723RhhAQbGgIObfRa7BUFML",
        aspectRatio: "9:16",
        internalNote: "Facts Reels Client 2"
      },
      {
        id: "creator-15",
        driveId: "1hu-mtfxDJmC7y0_9oP5LMU0VEdRPKU-f",
        aspectRatio: "9:16",
        internalNote: "Affiliate marketing"
      },
      {
        id: "creator-16",
        driveId: "1Q9WB9v8e9HjqP1ShKs93Ndaxj9SpH5xn",
        aspectRatio: "9:16",
        internalNote: "Content Creation Suggestion"
      },
      {
        id: "creator-17",
        driveId: "1PPU1To4Vp5lPVhAlMexWJK5lRGSKo0vN",
        aspectRatio: "9:16",
        internalNote: "Online Earning 1"
      },
      {
        id: "creator-18",
        driveId: "1bMJwU4XU-rHBwMocRNZe2zzGMIvvkyLm",
        aspectRatio: "9:16",
        internalNote: "Reality About society and Earning necessity"
      },
      {
        id: "creator-19",
        driveId: "1WDKRlsid8yzx-6oTQG7Zb_aMrcA3Y4Wo",
        aspectRatio: "9:16",
        internalNote: "Facts Sharing Reel 2"
      },
      {
        id: "creator-20",
        driveId: "1UrASmhzWbrZ4ZUhauJews1adTmg66Qyf",
        aspectRatio: "9:16",
        internalNote: "Skills learning Suggestion"
      },
      {
        id: "creator-21",
        driveId: "10Y6Zqm7s5_VW55We7YhZKi2zxlNDcrtG",
        aspectRatio: "9:16",
        internalNote: "Makeup Related 3"
      },
      {
        id: "creator-22",
        driveId: "1WBJtaLhO4rOIcvdboZrXhM4VIfhB59Xu",
        aspectRatio: "9:16",
        internalNote: "Facts Sharing"
      },
      {
        id: "creator-23",
        driveId: "1KcMS2aMQaUO_EU8It5ojjnXaQfCGWpaM",
        aspectRatio: "9:16",
        internalNote: "Online Earning 2"
      },
      {
        id: "creator-24",
        driveId: "1W4By9r55Ib5Vle3WPQ5mUOStSz7anv7N",
        aspectRatio: "9:16",
        internalNote: "Facebook ads setup"
      },
      {
        id: "creator-25",
        driveId: "12OPUBts7lcxXgnZ4-EdGKRGm3KyCigg1",
        aspectRatio: "9:16",
        internalNote: "Facts Reels client 3"
      }
    ]
  },
  {
    id: "event-edits",
    heading: "Event Coverage & Sports Edits",
    badge: "High Energy",
    description: "Dynamic multi-cam synchronisation, beat-matched aftermovies, sports highlights, and summit recaps.",
    aspectRatio: "9:16",
    isHighlighted: false,
    videos: [
      {
        id: "event-1",
        driveId: "13nucwp4NhPQnygwnHI94Yzjwug8c5tHX",
        aspectRatio: "9:16",
        internalNote: "Pickleball by Padel India Official 1"
      },
      {
        id: "event-2",
        driveId: "1f-80kEHkOBv1fqwRJw4IBk3JpK2BFQio",
        aspectRatio: "9:16",
        internalNote: "Khaufnama 1"
      },
      {
        id: "event-3",
        driveId: "1z0qyFiEpiVyq7L39PtgcsPxvymTuOOOX",
        aspectRatio: "9:16",
        internalNote: "Wellness Summit 3.0"
      },
      {
        id: "event-4",
        driveId: "1ZGCOW-X0fyWpjjGL5tQSUkHr0rrEfgWC",
        aspectRatio: "9:16",
        internalNote: "Poetry"
      },
      {
        id: "event-5",
        driveId: "12QeW9b1pU-vURmnrVZQNKR4I8La6tXBp",
        aspectRatio: "9:16",
        internalNote: "Pickleball by Padel India Official 2"
      },
      {
        id: "event-6",
        driveId: "1k_7MKGguAqxE6tiQMYjSnMHaLNFYqanV",
        aspectRatio: "9:16",
        internalNote: "Group Rally Highlight reel of Scouts"
      },
      {
        id: "event-7",
        driveId: "1RvbRVCXF7QkB8UPP80lHCRUHRti_op-_",
        aspectRatio: "9:16",
        internalNote: "Khaufnama 2"
      },
      {
        id: "event-8",
        driveId: "1L6STcKapFvFEufP1-hvnWizh-PzGLF-Z",
        aspectRatio: "9:16",
        internalNote: "Pickleball by Padel India Official 3"
      },
      {
        id: "event-9",
        driveId: "18YWlkZYocGubJk-cLw1x2rqOupAm9_g2",
        aspectRatio: "9:16",
        internalNote: "College Event"
      }
    ]
  },
  {
    id: "cinematic-shoots",
    heading: "Cinematic Shoots & Cultural Teasers",
    badge: "Colour Graded",
    description: "Atmospheric framing, cinematic colour grading, traditional festival documentation, and narrative pacing.",
    aspectRatio: "9:16",
    isHighlighted: false,
    videos: [
      {
        id: "cine-1",
        driveId: "1eBsmht7cXmjtOMhhyhLGbqt4fO_sKmkK",
        aspectRatio: "9:16",
        internalNote: "Agomoni Shoot and edit"
      },
      {
        id: "cine-2",
        driveId: "1kNM-_RAozlSNH7w9BR1oIPu2efAHlHzo",
        aspectRatio: "9:16",
        internalNote: "Durga Puja Video 1"
      },
      {
        id: "cine-3",
        driveId: "1V2xq1lrPQu3apyY5dXXZtvfwrzt_1wdD",
        aspectRatio: "9:16",
        internalNote: "Durga Puja Video 2"
      },
      {
        id: "cine-4",
        driveId: "1uyI8gZFXoQC_wQ2D1fxFObj3JfrNtvL8",
        aspectRatio: "9:16",
        internalNote: "Durga Puja Video 3"
      },
      {
        id: "cine-5",
        driveId: "1yKb7quOH9_HWfMCY-xMnLlPw0xhdfCgF",
        aspectRatio: "9:16",
        internalNote: "Durga Puja Video 4"
      },
      {
        id: "cine-6",
        driveId: "1SIYeoNBBmn-Md5esegoLjAPPnIiZvKwB",
        aspectRatio: "9:16",
        internalNote: "Durga Puja Video 5"
      },
      {
        id: "cine-7",
        driveId: "1YVdOELyX_KFZmdlAYAvQMjNtF5cVEwUH",
        aspectRatio: "9:16",
        internalNote: "Durga Puja Video 6"
      }
    ]
  },
  {
    id: "long-form",
    heading: "Long-Form YouTube & Narratives",
    badge: "16:9 Landscape",
    description: "Comprehensive documentary editing, structured informational narratives, and YouTube storytelling with pacing and B-roll integration.",
    aspectRatio: "16:9",
    isHighlighted: false,
    videos: [
      {
        id: "long-1",
        driveId: "1-y5M9wqdCqPTTJWCXjrGVGWQtB_xefo9",
        aspectRatio: "16:9",
        internalNote: "Jasu Singh Introduction Video"
      },
      {
        id: "long-2",
        driveId: "1__VBKhiqKtIXo8fY_NVKKoT_iV6vSpqf",
        aspectRatio: "16:9",
        internalNote: "Facts Sharing Information vid"
      },
      {
        id: "long-3",
        driveId: "1Wh4dYkG7RvC5Z8-XwhW6lfZsMcdcDybc",
        aspectRatio: "16:9",
        internalNote: "Facts Sharing Info Vid"
      }
    ]
  }
];

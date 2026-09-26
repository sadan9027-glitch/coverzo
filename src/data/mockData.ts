import { Product, DeviceModel, Order } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCbEIgx6AY-_6sn_mTZmyzzDJoqe9PEJVFIQnTGZ4BIl703nrO9LlAuT8u0T1ktOjZiAA3jZPb1cIw19-ZaZ1_U4ZTwaeSLwNhliIKcImjUfbZY2uSbL-b9wTS4ekZAN4LNX2ZfbaY32Bj_d4geHuAp8B1XsevL5JvdiGGyDlKgQpaY5c5xAuRzjqIVlaIJwv1AWoT7hFHvOuLxDhWQzykP1UG_7jHWN_ITl-dcxwNoWAk2aCAk6TfMoA";

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBo5D3VhJa-pTAPWmP8Q3GKQ3Wk8qc3SeevvVIF35v2GgR82Nz0usJcDj05iOP-roFr_Qm6epcAx74v4Fe9gkQUmj4ad5KU5HB79emfvQg9Bn32qKFawGC2K3HRE8HFXeLkNu-Tu0xnvZzz01R4Q6VkkW60FymI8tw-iDzSeX3QwbqoSbPArvQHtIVg0Tn40MDJE1BV_wgiv1kP4TulUyrWWbpRyb6lR-lJWffwKXdqIutkG4vCf2XqdQ";

export const RAHUL_AVATAR = "https://lh3.googleusercontent.com/aida/AEtjO1URz2pIVvKAO2Xj3PgMmDYiF1AB45O2et_MmQ9k_C-PHhiAjkYFAQxms_Z8UGvcnwQwS84A3GjZZ2AQx0R6w1EunKWtFL497Mo7iPTWz5_-ZnQXgfnOCS9jB_qTa9qCK05soWTgS2UEmitJqRaJG6y-yFuHw7m7yHPXMnAwmUK1Q5sr8IONSla5yNcpfJEhnYMUbhjDrJZA6SgHwp8RMRwdwOPJzcOCifikvDihKA4vmhb0VyNstYhQcsU6";

export const PRODUCTS: Product[] = [
  {
    id: "frost-shield-magsafe",
    name: "FrostShield Armor MagSafe Case",
    tagline: "Frosted Translucent Matte Finish • Zero Smudge Coating",
    subtitle: "iPhone 15 Pro • Matte Smoke",
    price: 799,
    originalPrice: 1499,
    discountPercent: 47,
    rating: 4.9,
    reviewCount: 1280,
    badge: "Flash Deal Drop",
    badgeColor: "secondary",
    isBestseller: true,
    category: "magsafe",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXIUsTl2qOTD2TKa9ledVuh9nc6t8LexWDGHQjzsz0PaixS7BdoGs63sgyWuYhzNIpcQFLkNUVUBL8PPwQF55QzuWNy6xSuZ3oLtPoBlwdcYm334TL8u8X74MezpdtRmFYWKx56tzH9t0xtVJjjT5pOOd_Jh0hsUDxWDEERMBoz_CgXda5-S9eK90dUE3x7LaA66bjz3aIozThBGxPDmaRAsEb9uixXyX9P6daz9evPiLevLbh2rbdAw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBov4Rn6KDBpjezNN4i5zEEb5sbINXRoJOWJCjcItWHKPxW_IB1uoHjdOGzHNgLuSzvLFy-WAolSrnUR_8A5p9ccUlxh--sErMDQKfNkFO_we-xvjmdOcNVDmVN-Jy4SEpd7-4TqzfiAeUpXWJX-TsztANh12J2BPHXv0Ob_W58Qh6hg9aBVo1FONVAjxQ03N1TV5tww2d_uJHw7O-orhOHWk2-TJ-c21RpM84Qv9IOtnyPmeLg1w_afg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAccqQsl3_rlbEBJXkk0R-xkzYICSLFTYyoo48-tN-NfzO2GlBZuMICKKv8Gp_DCGTO9iVM_luYPAy7pKjMv-QES3a1RR1oOUHK2XISjeBKf5fjb4hP5_1rhlvf_ACKmFbGMeL1s9THXziOgtBwBhltvhx3y6IzrvWyDRCiScBsI6oaPmc7rvOsar1f0JgO804YFs-XoU0AgSAUiBTe3hpuBdnEXQ0Lp-V-dMWIaM_JyvUBcSyAa6QiKw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbbygTViJ-x6mdQCtMD_iC2K_I5WKXuMN9gNenhfno-HTHYNVmA55qDEvahqn2W58N9m8LbLNKFAlAdT0FgfBRjfAcw-2XvU27_BDDcQ8pk2Wzw96RcsZ3e3ogqjWpAB4-ufAIy-t9DIL8OAE6XEqH1ssKjl-hqEWWtUJlynkw6qM-Nsrlqvf7SAopWQ1aRjnUkQ8r1HWzDs0OasBnTE2zxa0kGziZhPZz-S8x9soHY3zElUEcxSjopA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZR5jkZCveWovxgfl9yf51j2WK2YT2L-iCk5cg_3T5l80Ufn_glJWwq-oXwqKSy2YRbKeE93Yw2_BHRNntrVAyfPzyIZ0bneUnxlqy4cDCIF4TDqhGgxVvHMH-IjvzEHHpaEPwcp0-szVs0sdxSO_oehz8PWOo6oI5yeUyO2ciNqbJTKwh8YKE-1D3TKr6JgFE9hWK9nbnoC8OtSGSlHHl70fEa41eXJQGlDqnmtjW4saTuKHfr1oFMQ"
    ],
    colors: [
      { name: "Deep Space Black", hex: "#1c1b1d", inStock: true },
      { name: "Natural Titanium Gray", hex: "#8f8e94", inStock: true },
      { name: "Pacific Deep Blue", hex: "#203a54", inStock: true },
      { name: "Sierra Pine Green", hex: "#2f4f41", inStock: true }
    ],
    compatibleModels: ["iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 15", "iPhone 14 Pro"],
    description: "Every case features laser-cut camera rings, tactile buttons, and heat dissipation tailored strictly to your device dimensions. Zero fit errors or return hassles.",
    features: [
      { icon: "verified_user", title: "Bayer German TPU", desc: "Ultra-clear anti-yellowing resin + 9H scratch-proof PC." },
      { icon: "shield", title: "12ft Military Drop", desc: "4-corner air suspension bumpers absorb 98% kinetic impact." },
      { icon: "adjust", title: "N52 Magnets", desc: "2,400g magnetic pull snap. Locks fast onto car mounts." },
      { icon: "lens", title: "1.5mm Camera Lip", desc: "CNC machined metal ring prevents direct lens surface scratches." }
    ]
  },
  {
    id: "titanium-armor-bumper",
    name: "Titanium Armor Bumper Case",
    tagline: "Heavy-Duty Hybrid Shock Protection with Metal Kickstand",
    subtitle: "Reinforced Air-Pockets",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 840,
    badge: "12ft Drop Test",
    badgeColor: "tertiary",
    category: "armor",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsQHXRAThWpC3W28LAM_zOXsAHWy5fYg5u1Ok8XpjETFr8zvBXw-nMZymdwSizOBoDeYpfEHV3M8fHVyeWzmh-otfVznO2uazgReUtS1l5T5-4zpusBaxdG07NQaFJa4Xbjcm6eeG8Gu3PYejq1kT8hWLhtKp2lQcla-tq0U7fFZE1KTHsHtP-mwtztiCXsVlbGhKN2EtYkhb1itFbOWSAOMd5qseR1eYh4iUkGw5Tx1tOzg-_kqqow",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYcToB1M7iI4QmKJC7ofNDp90dGToZQOfhQKDy9j3ujGc9zLO-j6XDM6jG2bqCheJGHM5CgzYOyD8_Po5UkwcwAIClCi6wguhlQGOMNNEM_znfUUymx4co9_ppNvFoTnWqWaypDiECUE_cCgFZLCYUDNH-ZiWeg97j4dIb8mY2dfqRi2m_Zy6iGFOGKidf8K6F7bUcQB1tM5_Socey1ChEbqjKoZFljRNyzhRZ9o9grOZRhqLGstlQJQ"
    ],
    colors: [
      { name: "Gunmetal Gray", hex: "#4b4f56", inStock: true },
      { name: "Stealth Black", hex: "#111111", inStock: true },
      { name: "Alpine Silver", hex: "#c4c7cc", inStock: true }
    ],
    compatibleModels: ["iPhone 15 Pro", "iPhone 15 Pro Max", "Galaxy S24 Ultra"],
    description: "Multi-layered shock absorbent poly-alloy structure with integrated aerospace aluminum alloy kickstand ring and 12ft drop protection rating.",
    features: [
      { icon: "shield", title: "Dual Layer Armor", desc: "Hard polycarbonate shell infused with internal honeycomb TPU." },
      { icon: "straighten", title: "Reinforced Corners", desc: "Air-pocket suspension cushioning on all 4 corners." },
      { icon: "view_in_ar", title: "Built-in Ring Stand", desc: "Horizontal and vertical hands-free media viewing angles." }
    ]
  },
  {
    id: "crystal-clear-gel",
    name: "Crystal Clear Pure-Gel Case",
    tagline: "Ultra-Clear Optical Grade Resin • 6-Month Anti-Yellow Warranty",
    subtitle: "Zero-Smudge Coating",
    price: 499,
    originalPrice: 999,
    discountPercent: 50,
    rating: 4.7,
    reviewCount: 3120,
    badge: "6mo Anti-Yellow",
    badgeColor: "primary",
    category: "clear",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcKtbocVXOezYwjzN1v50CqEYRe-_IFmgUAsu6fyL1CCn-5DgG-TzVaQEsp6rnMFbni2J3ojpOdVeLmBCsbvdltCvepNuw79hAtCKHFeIvF34d4HCj_gTb8ZtvOF_5lsRZAHjDtR7NbIhTN1DRxdYmGSPr_QcyOMmotW7YwGjOPXSjXkWIOWajsHtAFEd7O4qxudFYeIjxpqgYu_X22xJTfey2xJcVnOO53Dv9hz-B084KLApgE8ZQbg"
    ],
    colors: [
      { name: "Pure Clear", hex: "#e5e7eb", inStock: true },
      { name: "Smoke Tint", hex: "#374151", inStock: true }
    ],
    compatibleModels: ["iPhone 15 Pro", "iPhone 15", "Galaxy S24 Ultra", "OnePlus 12"],
    description: "Optical-grade clarity engineered to show off the natural titanium finish with microdot matrix technology that stops watermark rainbow effects.",
    features: [
      { icon: "auto_awesome", title: "Anti-Yellow Chemistry", desc: "Infused with UV-blocking molecular compounds." },
      { icon: "lens", title: "Raised Bezels", desc: "0.8mm screen lip and 1.2mm camera shield." }
    ]
  },
  {
    id: "cyberpunk-neon-holo",
    name: "Cyberpunk Neon Holo Case",
    tagline: "Dynamic Color-Shifting Polycarb with Holographic Depth",
    subtitle: "Color-Shifting Polycarb",
    price: 849,
    originalPrice: 1699,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 920,
    badge: "Trending Now",
    badgeColor: "secondary",
    category: "matte",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCngkuQJthMaqlX1HwNDfzqvzJc28STdX5m80LflfFsVpBf-yMlmqnXjwVsr_dCXzwdEHNl6RhXF6l0SpB3Lrhx-pqebHlZ73S4fgLvh1EBiFQc0ostB8Nc6MDJzgs7c7oMZsfx_BTfgHpI1VCN2lfMr2nKOI7cF9eHTbsNEXZOzyd6bKapLsYYD1MHsB2AU6474n-h5B8WkK05g_0wIoSZBfYAvUh0hL7Bgfk1bFkekn2BV3P3ZmNUvw"
    ],
    colors: [
      { name: "Iridescent Prism", hex: "#8b5cf6", inStock: true },
      { name: "Cyberpunk Violet", hex: "#6366f1", inStock: true }
    ],
    compatibleModels: ["iPhone 15 Pro", "iPhone 15 Pro Max", "Nothing Phone (2)"],
    description: "Spectacular prismatic light refraction changes hue as you tilt the phone, while retaining shockproof drop protection.",
    features: [
      { icon: "palette", title: "Holographic Layer", desc: "Embedded prism foil won't scratch or fade over time." },
      { icon: "flash_on", title: "Wireless Charging Ready", desc: "Thin back panel supports Qi and wireless power banks." }
    ]
  },
  {
    id: "9h-diamond-glass",
    name: "9H Diamond Tempered Glass",
    tagline: "Edge-to-Edge EZ-Fit Alignment Tray • Oleophobic Electroplated",
    subtitle: "iPhone 15 Pro • EZ-Fit Tray",
    price: 399,
    originalPrice: 799,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 2450,
    badge: "Ready to Ship",
    badgeColor: "tertiary",
    category: "glass",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBH_YhBAfmdOE43-j-i_3t-T3tGVRHIKOiEVpopVfVMbphD2dyiCDK2ssHxF15GZzhDbd1FzrIcbRWctJhHNI3EB53moL-RsGxxjts6j77nc55LjHkVxxmDkveP6vkaOWPWB_K3fknyg_isXjtbFw4YgrunXVvGKIH18LBvQvDHfYrbr1vQVTNFEorMzw0utmqhvBvmn01K4k-VQteTycqcMzoo7Dn3f-TPCVGSjOlM-ahL1Qjw6prQ9w",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpMGLUNIYspnHOfO4MzGAFU5ZBTe8432p9UDsjXtf5zZetY1oBN29aEHHG9_Im_5QFv75vh3H1Y_fVHPsjUgwETYaOW5rf6zZ_6rxM8j5r1R9IaafOEdZDKEFpeNCsT1yBumtUNSVgiG9FuIkq0izFPLNliU1HLQFGi8eod7bJsdu77m2CUuKJrCzEmGvM6HW9-9TmG0SFl2-rH728-lueOqa2L2qbmqVlN4ApVZdLceCdbesdz42LQA"
    ],
    colors: [
      { name: "High Transparency Clear", hex: "#ffffff", inStock: true }
    ],
    compatibleModels: ["iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 15", "iPhone 14 Pro"],
    description: "Double-tempered aluminosilicate glass with zero bubble auto-alignment tray. Includes dust remover and 2.5D rounded edges.",
    features: [
      { icon: "diamond", title: "9H Hardness", desc: "Resists keys, sand, and pocket metal scratch abrasions." },
      { icon: "install_mobile", title: "EZ-Fit Applicator", desc: "10-second foolproof installation with instant vacuum seal." }
    ]
  }
];

export const DEVICE_MODELS: DeviceModel[] = [
  // Apple iPhone 15
  { id: "ip-15-pm", name: "iPhone 15 Pro Max", brand: "apple", displaySize: '6.7" Display • Titanium', highlight: "Titanium", caseCount: 156, series: "iPhone 15 Series", isPopular: true },
  { id: "ip-15-p", name: "iPhone 15 Pro", brand: "apple", displaySize: '6.1" Display • Action Button', highlight: "Action Button", caseCount: 142, series: "iPhone 15 Series", isPopular: true },
  { id: "ip-15-plus", name: "iPhone 15 Plus", brand: "apple", displaySize: '6.7" Display', highlight: "Plus", caseCount: 94, series: "iPhone 15 Series", isPopular: false },
  { id: "ip-15", name: "iPhone 15", brand: "apple", displaySize: '6.1" Dynamic Island', highlight: "Dynamic Island", caseCount: 138, series: "iPhone 15 Series", isPopular: true },
  // Apple iPhone 14
  { id: "ip-14-pm", name: "iPhone 14 Pro Max", brand: "apple", displaySize: '6.7" Display', highlight: "Pro Max", caseCount: 120, series: "iPhone 14 Series", isPopular: true },
  { id: "ip-14-p", name: "iPhone 14 Pro", brand: "apple", displaySize: '6.1" Display', highlight: "Pro", caseCount: 118, series: "iPhone 14 Series", isPopular: true },
  { id: "ip-14-plus", name: "iPhone 14 Plus", brand: "apple", displaySize: '6.7" Display', highlight: "Plus", caseCount: 84, series: "iPhone 14 Series", isPopular: false },
  { id: "ip-14", name: "iPhone 14", brand: "apple", displaySize: '6.1" Display', highlight: "Standard", caseCount: 108, series: "iPhone 14 Series", isPopular: false },
  // Apple iPhone 13
  { id: "ip-13-pm", name: "iPhone 13 Pro Max", brand: "apple", displaySize: '6.7" Display', highlight: "Pro Max", caseCount: 92, series: "iPhone 13 Series", isPopular: false },
  { id: "ip-13-p", name: "iPhone 13 Pro", brand: "apple", displaySize: '6.1" Display', highlight: "Pro", caseCount: 88, series: "iPhone 13 Series", isPopular: false },
  { id: "ip-13", name: "iPhone 13", brand: "apple", displaySize: '6.1" Display', highlight: "Standard", caseCount: 110, series: "iPhone 13 Series", isPopular: false },

  // Samsung
  { id: "s-24-u", name: "Galaxy S24 Ultra", brand: "samsung", displaySize: '6.8" Flat Dynamic AMOLED', highlight: "Armor Aluminum", caseCount: 98, series: "Galaxy S24 Series", isPopular: true },
  { id: "s-24-plus", name: "Galaxy S24+", brand: "samsung", displaySize: '6.7" Display', highlight: "Plus", caseCount: 65, series: "Galaxy S24 Series", isPopular: false },
  { id: "s-24", name: "Galaxy S24", brand: "samsung", displaySize: '6.2" Display', highlight: "Compact", caseCount: 72, series: "Galaxy S24 Series", isPopular: false },
  { id: "s-23-u", name: "Galaxy S23 Ultra", brand: "samsung", displaySize: '6.8" Edge Display', highlight: "S-Pen", caseCount: 85, series: "Galaxy S23 Series", isPopular: true },

  // OnePlus
  { id: "op-12", name: "OnePlus 12", brand: "oneplus", displaySize: '6.82" ProXDR Display', highlight: "Hasselblad Ring", caseCount: 76, series: "OnePlus Flagship", isPopular: true },
  { id: "op-12r", name: "OnePlus 12R", brand: "oneplus", displaySize: '6.78" AMOLED', highlight: "Performance", caseCount: 52, series: "OnePlus Flagship", isPopular: false },

  // Nothing
  { id: "np-2", name: "Nothing Phone (2)", brand: "nothing", displaySize: '6.7" Transparent Glyph', highlight: "Glyph Matrix", caseCount: 54, series: "Nothing Series", isPopular: true },
  { id: "np-2a", name: "Nothing Phone (2a)", brand: "nothing", displaySize: '6.7" Flexible AMOLED', highlight: "Centered Eyes", caseCount: 38, series: "Nothing Series", isPopular: false },

  // Vivo
  { id: "v-x100p", name: "Vivo X100 Pro", brand: "vivo", displaySize: '6.78" ZEISS APO Telephoto', highlight: "ZEISS Halo", caseCount: 42, series: "Vivo X Series", isPopular: true },
  { id: "v-v30p", name: "Vivo V30 Pro", brand: "vivo", displaySize: '6.78" Aura Portrait', highlight: "Slim Curved", caseCount: 36, series: "Vivo V Series", isPopular: false },

  // Google Pixel
  { id: "px-8p", name: "Google Pixel 8 Pro", brand: "google", displaySize: '6.7" Super Actua', highlight: "Camera Visor", caseCount: 58, series: "Pixel 8 Series", isPopular: true },
  { id: "px-8", name: "Google Pixel 8", brand: "google", displaySize: '6.2" Actua', highlight: "Compact", caseCount: 49, series: "Pixel 8 Series", isPopular: false },

  // Xiaomi
  { id: "mi-14u", name: "Xiaomi 14 Ultra", brand: "xiaomi", displaySize: '6.73" Leica Quad Camera', highlight: "Leica Summilux", caseCount: 44, series: "Xiaomi 14 Series", isPopular: true }
];

export const INITIAL_ACTIVE_ORDER: Order = {
  id: "#CVZ-10492",
  date: "Today, 2:15 PM",
  status: "In Transit",
  paymentMethod: "UPI",
  totalAmount: 998,
  awb: "849204921",
  courier: "Delhivery Express Priority",
  expectedDelivery: "Tomorrow by 8:00 PM",
  items: [
    {
      productName: "Frosted MagSafe Case",
      variant: "Space Black",
      model: "iPhone 15 Pro",
      quantity: 1,
      price: 799,
      originalPrice: 1499,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm2uu6m5-83YXFdMRmSztBygRYO-D9kx1z2JkXB7tH_UTGnbBBIj9p-GVt0BYg0w4U4arrOayPz0pjTGs_zd3H9awifckIroN08bkmVDQhsS4u78rtDrJ4N-EZD2zon7HcMaMmZzLPY6d70qNUE_rK1zVfM3Tp15q7ZtaeDjqDEjbL_f1MCFS0LPbNt_hynyQe8FWa-x2FrlnHVlJlWqH62jrJf__ts8ObmMCxZML3qQuyHSWGsH4P0g"
    }
  ],
  steps: [
    {
      title: "Order Confirmed",
      desc: "Payment received via UPI",
      time: "Today, 2:15 PM",
      completed: true,
      icon: "check"
    },
    {
      title: "Packed & Quality Checked",
      desc: "Passed 5-point drop inspection",
      time: "Today, 3:45 PM",
      completed: true,
      icon: "check"
    },
    {
      title: "In Transit • Bengaluru Sort Facility",
      desc: "Handed over to Delhivery logistics",
      time: "Today, 5:10 PM",
      completed: false,
      active: true,
      icon: "local_shipping"
    },
    {
      title: "Out for Delivery",
      desc: "Assigned to courier agent",
      time: "Tomorrow",
      completed: false,
      icon: "home_pin"
    }
  ]
};

export const PAST_ORDERS: Order[] = [
  {
    id: "#CVZ-09284",
    date: "Delivered on 14 Mar 2025",
    status: "Delivered",
    paymentMethod: "Paid via UPI",
    totalAmount: 399,
    items: [
      {
        productName: "9H Diamond Tempered Glass",
        variant: "EZ-Fit Tray Pack",
        model: "iPhone 15 Pro",
        quantity: 1,
        price: 399,
        originalPrice: 799,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVJ4d8mGDNGp77Ez8WDFwHwuFS9n6kvOLzVbZ5CO3G7i1Tolrga-5rE12WbG7dHfG4_AAzW7rfhTi-0pnONZjacxH3xoMPafsIbaUFmRrKUMytl7lchwXZkLK0Z7OmW4wegcWV8QQTU1_nX6pYXVD6iR8sJA9Fis8S_H--w1kGRT6FltL3CgS89ukrHOJV9pP59i1GJASJiZvUG0cZcaN5v_4rR5dQI9u_cM_IRVwhqBZnPdLlFbRg6A",
        returnEligible: true,
        returnDaysRemaining: 3
      }
    ]
  },
  {
    id: "#CVZ-08119",
    date: "Delivered on 22 Jan 2025",
    status: "Delivered",
    paymentMethod: "Paid via Card",
    totalAmount: 999,
    items: [
      {
        productName: "Titanium Armor Drop Case",
        variant: "Gunmetal Gray",
        model: "iPhone 14 Pro Max",
        quantity: 1,
        price: 999,
        originalPrice: 1999,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYcToB1M7iI4QmKJC7ofNDp90dGToZQOfhQKDy9j3ujGc9zLO-j6XDM6jG2bqCheJGHM5CgzYOyD8_Po5UkwcwAIClCi6wguhlQGOMNNEM_znfUUymx4co9_ppNvFoTnWqWaypDiECUE_cCgFZLCYUDNH-ZiWeg97j4dIb8mY2dfqRi2m_Zy6iGFOGKidf8K6F7bUcQB1tM5_Socey1ChEbqjKoZFljRNyzhRZ9o9grOZRhqLGstlQJQ",
        returnEligible: false
      }
    ]
  }
];

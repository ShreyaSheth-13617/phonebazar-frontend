/** Classifieds-style listings (one used phone per ad). */

export const MOCK_LISTINGS = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        brand: "Apple",
        price: 62999,
        condition: "Like New",
        storage: "256 GB",
        city: "Mumbai",
        batteryHealth: 94,
        defects: "Minor scratch on frame (see photos). Screen protector applied.",
        description: "Selling after upgrade to 15 Pro. Original box and charging cable included. Invoice available for warranty check.",
        image: "https://images.unsplash.com/photo-1592750475338-84b45ab18754?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1592750475338-84b45ab18754?w=600&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=600&fit=crop&q=80",
        ],
        verified: true,
        postedAt: "2026-03-18",
        seller: {
            name: "Rahul S.",
            memberSince: "Jan 2025",
            listingsCount: 3,
            phone: "+91 98765 43210",
        },
    },
    {
        id: 2,
        name: "Samsung S23 Ultra",
        brand: "Samsung",
        price: 54999,
        condition: "Excellent",
        storage: "512 GB",
        city: "Bengaluru",
        batteryHealth: 91,
        defects: "None reported.",
        description: "S Pen included. No dents. Used with case since day one.",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop&q=80",
        ],
        verified: true,
        postedAt: "2026-03-17",
        seller: {
            name: "Priya M.",
            memberSince: "Nov 2024",
            listingsCount: 8,
            phone: "+91 91234 56789",
        },
    },
    {
        id: 3,
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 38999,
        condition: "Good",
        storage: "256 GB",
        city: "Pune",
        batteryHealth: 88,
        defects: "Small scuff near charging port.",
        description: "Daily driver, works perfectly. Warp charger included.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&q=80",
        ],
        verified: false,
        postedAt: "2026-03-15",
        seller: {
            name: "Amit K.",
            memberSince: "Mar 2026",
            listingsCount: 1,
            phone: "+91 99887 76655",
        },
    },
    {
        id: 4,
        name: "Google Pixel 8",
        brand: "Google",
        price: 41999,
        condition: "Like New",
        storage: "128 GB",
        city: "Hyderabad",
        batteryHealth: 96,
        defects: "None.",
        description: "Clean Android, great camera. Selling due to switch to work phone.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=80",
        ],
        verified: true,
        postedAt: "2026-03-14",
        seller: {
            name: "Neha R.",
            memberSince: "Aug 2024",
            listingsCount: 5,
            phone: "+91 97654 32100",
        },
    },
    {
        id: 5,
        name: "iPhone 13",
        brand: "Apple",
        price: 39999,
        condition: "Good",
        storage: "128 GB",
        city: "Delhi",
        batteryHealth: 87,
        defects: "Battery replaced at authorised service (receipt available).",
        description: "Face ID and cameras work perfectly. No iCloud lock.",
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=600&fit=crop&q=80",
        ],
        verified: true,
        postedAt: "2026-03-12",
        seller: {
            name: "Vikram D.",
            memberSince: "Jun 2024",
            listingsCount: 2,
            phone: "+91 94500 11223",
        },
    },
    {
        id: 6,
        name: "Samsung S22",
        brand: "Samsung",
        price: 29999,
        condition: "Fair",
        storage: "128 GB",
        city: "Chennai",
        batteryHealth: 82,
        defects: "Visible wear on corners; display has no cracks.",
        description: "Priced for quick sale. Negotiable for serious buyers.",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop&q=80",
        ],
        verified: false,
        postedAt: "2026-03-10",
        seller: {
            name: "Suresh P.",
            memberSince: "Feb 2026",
            listingsCount: 1,
            phone: "+91 88776 55443",
        },
    },
    {
        id: 7,
        name: "Xiaomi 14",
        brand: "Xiaomi",
        price: 34999,
        condition: "Excellent",
        storage: "512 GB",
        city: "Kolkata",
        batteryHealth: 93,
        defects: "None.",
        description: "Import variant, all bands work. Original charger in box.",
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&q=80",
        ],
        verified: true,
        postedAt: "2026-03-11",
        seller: {
            name: "Ananya B.",
            memberSince: "Dec 2024",
            listingsCount: 4,
            phone: "+91 92345 67890",
        },
    },
    {
        id: 8,
        name: "iPhone 15",
        brand: "Apple",
        price: 71999,
        condition: "Like New",
        storage: "256 GB",
        city: "Mumbai",
        batteryHealth: 98,
        defects: "None. Under warranty.",
        description: "Barely used, switched to Pro Max. AppleCare+ can be transferred.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1592750475338-84b45ab18754?w=600&h=600&fit=crop&q=80",
        ],
        verified: true,
        postedAt: "2026-03-19",
        seller: {
            name: "Kabir L.",
            memberSince: "Oct 2024",
            listingsCount: 6,
            phone: "+91 90123 45678",
        },
    },
];

/** @deprecated Use MOCK_LISTINGS; kept for gradual migration of imports */
export const MOCK_PRODUCTS = MOCK_LISTINGS;

export function getListingById(id) {
    const n = Number(id);
    if (Number.isNaN(n))
        return undefined;
    return MOCK_LISTINGS.find((l) => l.id === n);
}

export function getCitiesFromListings() {
    const cities = [...new Set(MOCK_LISTINGS.map((l) => l.city))];
    return cities.sort();
}

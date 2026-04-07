/** Map backend Phone documents to UI-friendly product shapes */
export function normalizeProduct(p) {
  if (!p) return null;
  const id = p._id || p.id;
  const images = Array.isArray(p.images) ? p.images : [];
  const image = images[0] || p.image || "";
  let seller = p.seller;
  if (p.sellerId && typeof p.sellerId === "object") {
    seller = {
      name: p.sellerId.name || "Seller",
      email: p.sellerId.email,
      phone: "",
      memberSince: "",
      listingsCount: 0,
    };
  }
  return {
    ...p,
    id: String(id),
    image,
    images: images.length ? images : image ? [image] : [],
    seller,
    city: p.city || "",
    postedAt: p.createdAt
      ? new Date(p.createdAt).toISOString().slice(0, 10)
      : p.postedAt || "",
    rating: typeof p.rating === "number" ? p.rating : 0,
    totalReviews: p.totalReviews ?? 0,
  };
}

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";
import { normalizeProduct } from "@/utils/product";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  MessageCircle,
  ChevronLeft,
  Star,
  ShoppingCart,
} from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [photoIndex, setPhotoIndex] = useState(0);

  const [testReport, setTestReport] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const [prodRes, revRes, reportRes] = await Promise.allSettled([
          api.get(`/products/${id}`),
          api.get(`/reviews/${id}`),
          api.get(`/testing/${id}`)
        ]);

        if (prodRes.status === "rejected") {
            throw prodRes.reason;
        }

        const raw = prodRes.value?.data?.data;
        if (!cancelled) {
          setListing(raw ? normalizeProduct(raw) : null);
          setReviews(revRes.status === "fulfilled" && Array.isArray(revRes.value.data?.data) ? revRes.value.data.data : []);
          setTestReport(reportRes.status === "fulfilled" && reportRes.value.data?.data ? reportRes.value.data.data : null);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e.response?.data?.message || e.message || "Failed to load"
          );
          setListing(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [listing?.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-muted-foreground">
        Loading listing…
      </div>
    );
  }

  if (loadError || !listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">
          {loadError || "This listing is not available."}
        </p>
        <Button asChild variant="outline">
          <Link to="/browse">Back to browse</Link>
        </Button>
      </div>
    );
  }

  const photos =
    listing.images?.length > 0
      ? listing.images
      : listing.image
        ? [listing.image]
        : [];
  const mainPhoto = photos[photoIndex] ?? listing.image;

  const requireAuth = (action) => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: `Please login to ${action}.`,
        variant: "destructive",
      });
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleContact = () => {
    if (!requireAuth("contact the seller")) return;
    const email = listing.seller?.email;
    toast({
      title: "Seller contact",
      description: email
        ? `Reach out at ${email}`
        : "Seller email is not available.",
    });
  };

  const handleAddToCart = async () => {
    if (!requireAuth("add items to cart")) return;
    try {
      await addToCart(listing);
      toast({ title: "Added to cart", description: listing.name });
    } catch (e) {
      toast({
        title: "Could not add to cart",
        description:
          e.response?.data?.message || e.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!requireAuth("leave a review")) return;
    setSubmittingReview(true);
    try {
      await api.post("/reviews", {
        phoneId: listing._id || listing.id,
        rating: reviewRating,
        comment: reviewComment.trim() || undefined,
      });
      const { data } = await api.get(`/reviews/${id}`);
      setReviews(Array.isArray(data?.data) ? data.data : []);
      setReviewComment("");
      toast({ title: "Review submitted" });
      const { data: p } = await api.get(`/products/${id}`);
      if (p?.data) setListing(normalizeProduct(p.data));
    } catch (err) {
      toast({
        title: "Could not submit review",
        description:
          err.response?.data?.message || err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const avgFromReviews =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
      : listing.rating || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition"
      >
        <ChevronLeft className="h-4 w-4" /> Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-2xl bg-secondary overflow-hidden border border-border mb-3">
            {mainPhoto ? (
              <img
                src={mainPhoto}
                alt={listing.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                📱
              </div>
            )}
          </div>
          {photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {photos.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPhotoIndex(i)}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    i === photoIndex
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {listing.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/15 text-primary px-2 py-1 rounded-md">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified seller
              </span>
            )}
            <span className="text-xs font-medium px-2 py-1 rounded-md bg-secondary text-muted-foreground">
              {listing.condition}
            </span>
            {avgFromReviews > 0 && (
              <span className="inline-flex items-center gap-1 text-sm text-amber-500">
                <Star className="h-4 w-4 fill-amber-500" />
                {avgFromReviews.toFixed(1)}
                <span className="text-muted-foreground text-xs">
                  ({reviews.length || listing.totalReviews || 0} reviews)
                </span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {listing.name}
          </h1>
          <p className="text-3xl font-bold text-primary mb-6">
            ₹{Number(listing.price).toLocaleString("en-IN")}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground mb-6">
            {listing.city && (
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {listing.city}
              </p>
            )}
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              Posted{" "}
              {listing.postedAt ||
                (listing.createdAt
                  ? new Date(listing.createdAt).toLocaleDateString()
                  : "—")}
            </p>
          </div>

          <div className="glass-card p-4 mb-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Storage</span>
              <span className="text-foreground font-medium">
                {listing.storage || "—"}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Battery health</span>
              <span className="text-foreground font-medium">
                {listing.batteryHealth != null && listing.batteryHealth !== ""
                  ? `${listing.batteryHealth}%`
                  : "—"}
              </span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-muted-foreground mb-1">Wear / defects</p>
              <p className="text-foreground">
                {listing.defects || "None reported."}
              </p>
            </div>
          </div>

          {testReport && (
            <div className="glass-card mb-6 p-4 border border-primary/20 bg-primary/5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Testing & Certification Report
                </h3>
                {testReport.certification && (
                  <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">
                    CERTIFIED
                  </span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall Score</span>
                  <span className="font-medium text-foreground">{testReport.overallScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Battery Health</span>
                  <span className="font-medium text-foreground">{testReport.batteryHealth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Screen Condition</span>
                  <span className="font-medium text-foreground">{testReport.screenCondition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Camera Status</span>
                  <span className="font-medium text-foreground">{testReport.cameraStatus}</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-foreground leading-relaxed mb-6">
            {listing.description || "No description provided."}
          </p>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-muted-foreground mb-8">
            <strong className="text-amber-200">Used phone — peer to peer.</strong>{" "}
            PhoneBazar does not handle payment or delivery. Inspect the device
            and agree the price directly with the seller.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 gap-2" onClick={handleAddToCart} disabled={listing.isSold}>
              <ShoppingCart className="h-4 w-4" /> {listing.isSold ? 'Sold Out' : 'Add to cart'}
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleContact}
            >
              <MessageCircle className="h-4 w-4" /> Contact seller
            </Button>
          </div>

          <div className="mt-10 glass-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Seller
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {(listing.seller?.name || "S").charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {listing.seller?.name || "Seller"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {listing.seller?.email || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl">
        <h2 className="text-xl font-bold text-foreground mb-4">Reviews</h2>
        {reviews.length === 0 && (
          <p className="text-sm text-muted-foreground mb-6">No reviews yet.</p>
        )}
        <ul className="space-y-4 mb-8">
          {reviews.map((r) => (
            <li
              key={r._id}
              className="glass-card p-4 border border-border rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-foreground">
                  {r.userId?.name || "User"}
                </span>
                <span className="flex items-center text-amber-500 text-sm">
                  <Star className="h-3 w-3 fill-amber-500 mr-0.5" />
                  {r.rating}/5
                </span>
              </div>
              {r.comment && (
                <p className="text-sm text-muted-foreground">{r.comment}</p>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmitReview} className="space-y-3 glass-card p-5">
          <p className="text-sm font-medium text-foreground">Write a review</p>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Rating</label>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="px-3 py-2 rounded-lg text-sm bg-card border border-border text-foreground"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </div>
          <Textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Share your experience…"
            rows={3}
            className="resize-none"
          />
          <Button type="submit" disabled={submittingReview}>
            {submittingReview ? "Submitting…" : "Submit review"}
          </Button>
        </form>
      </div>
    </div>
  );
}

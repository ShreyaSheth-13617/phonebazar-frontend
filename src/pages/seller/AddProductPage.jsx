import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

export default function AddProductPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    city: "",
    storage: "",
    batteryHealth: "",
    condition: "Like New",
    defects: "",
    description: "",
    imeiNumber: "",
  });

  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [isImeiVerified, setIsImeiVerified] = useState(false);
  const [verifyingImei, setVerifyingImei] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  const handleVerifyImei = async () => {
    if (!form.imeiNumber) return;
    setVerifyingImei(true);
    try {
      await api.post("/products/verify-imei", { imeiNumber: form.imeiNumber });
      setIsImeiVerified(true);
      toast({ title: "IMEI Verified", description: "Your device is marked as verified." });
    } catch (e) {
      setIsImeiVerified(false);
      toast({
        title: "Verification Failed",
        description: e.response?.data?.message || "Invalid IMEI.",
        variant: "destructive",
      });
    } finally {
      setVerifyingImei(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.brand || !form.price || !form.description) {
      toast({
        title: "Missing fields",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please add at least one photo of the phone.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("price", Number(form.price) || 0);
      if (form.city) formData.append("city", form.city);
      if (form.storage) formData.append("storage", form.storage);
      if (form.batteryHealth !== "" && form.batteryHealth != null) {
        formData.append("batteryHealth", Number(form.batteryHealth));
      }
      formData.append("condition", form.condition);
      if (form.defects) formData.append("defects", form.defects);
      formData.append("description", form.description);
      if (form.imeiNumber) formData.append("imeiNumber", form.imeiNumber);
      formData.append("isVerified", isImeiVerified);
      images.forEach((file) => formData.append("images", file));

      // Debug: log what we're sending
      console.log("Sending form data:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const { data } = await api.post("/products", formData);
      const id = data?.data?._id;
      toast({
        title: "Ad posted",
        description: "Your listing is live.",
      });
      setForm({
        name: "",
        brand: "",
        price: "",
        city: "",
        storage: "",
        batteryHealth: "",
        condition: "Like New",
        defects: "",
        description: "",
      });
      setImages([]);
      if (id) navigate(`/listing/${id}`);
      else navigate("/browse");
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);
      toast({
        title: "Could not publish",
        description:
          err.response?.data?.message ||
          err.message ||
          "Check images and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">
        Post a used phone
      </h1>
      <p className="text-muted-foreground mb-8">
        One listing = one device. Add clear photos and honest condition notes.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Phone model (e.g. iPhone 14 Pro)"
          required
          className={inputClass}
        />
        <input
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          placeholder="Brand"
          required
          className={inputClass}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            type="number"
            min={0}
            placeholder="Asking price (₹)"
            required
            className={inputClass}
          />
          <input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="City (optional)"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={form.storage}
            onChange={(e) => setForm({ ...form, storage: e.target.value })}
            placeholder="Storage (e.g. 256 GB)"
            className={inputClass}
          />
          <input
            value={form.batteryHealth}
            onChange={(e) =>
              setForm({ ...form, batteryHealth: e.target.value })
            }
            type="number"
            min={0}
            max={100}
            placeholder="Battery health % (optional)"
            className={inputClass}
          />
        </div>

        <div className="flex gap-2">
          <input
            value={form.imeiNumber}
            onChange={(e) => {
              setForm({ ...form, imeiNumber: e.target.value });
              setIsImeiVerified(false);
            }}
            placeholder="IMEI Number (optional but recommended)"
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleVerifyImei}
            disabled={!form.imeiNumber || verifyingImei || isImeiVerified}
            className={`px-4 py-2 rounded-xl font-medium shrink-0 transition ${isImeiVerified ? 'bg-green-100 text-green-700' : 'bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50'}`}
          >
            {isImeiVerified ? "Verified ✓" : verifyingImei ? "Verifying..." : "Verify IMEI"}
          </button>
        </div>

        <select
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
          className={inputClass}
        >
          <option value="Like New">Like New</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Used">Used</option>
          <option value="New">New</option>
        </select>

        <textarea
          value={form.defects}
          onChange={(e) => setForm({ ...form, defects: e.target.value })}
          placeholder="Scratches, repairs, screen issues…"
          rows={2}
          className={`${inputClass} resize-none`}
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description — accessories, bill, reason for selling"
          rows={4}
          className={`${inputClass} resize-none`}
          required
        />

        <input type="file" multiple accept="image/*" onChange={handleImageChange} className={inputClass} />

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {submitting ? "Publishing…" : "Publish ad"}
        </button>
      </form>
    </div>
  );
}

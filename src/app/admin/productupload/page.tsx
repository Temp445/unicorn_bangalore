"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productLink: "",
    calendlyUrl: "",
    productPath: "",
    description: "",
    why_choose_des: "",
    who_need_des: "",
    category: "",
  });

  const [mainImages, setMainImages] = useState<File[]>([]);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [benefits, setBenefits] = useState([{ title: "", description: "" }]);
  const [FAQ, setFAQ] = useState([{ question: "", answer: "" }]);
  const [Result, setResult] = useState([{ title: "", description: "" }]);
  const [whatis, setWhatis] = useState([{ title: "", description: "" }]);
  const [testimonials, setTestimonials] = useState([
    { clientName: "", companyName: "", description: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "product"
  ) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (type === "main") setMainImages(files);
    else setProductImages(files);
  };

  // whatis
  const handleWhatisChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = [...whatis];
    updated[i][e.target.name as keyof typeof updated[0]] = e.target.value;
    setWhatis(updated);
  };


  // benefits
  const handleBenefitChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = [...benefits];
    updated[i][e.target.name as keyof typeof updated[0]] = e.target.value;
    setBenefits(updated);
  };
  const addBenefit = () =>
    setBenefits([...benefits, { title: "", description: "" }]);
  const removeBenefit = (i: number) =>
    setBenefits(benefits.filter((_, idx) => idx !== i));

    // FAQ
  const handleFAQChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = [...FAQ];
    updated[i][e.target.name as keyof typeof updated[0]] = e.target.value;
    setFAQ(updated);
  };
  const addFAQ = () =>
    setFAQ([...FAQ, { question: "", answer: "" }]);
  const removeFAQ = (i: number) =>
    setFAQ(FAQ.filter((_, idx) => idx !== i));

  //result
  const handleResultChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = [...Result];
    updated[i][e.target.name as keyof typeof updated[0]] = e.target.value;
    setResult(updated);
  };
  const addResult = () =>
    setResult([...Result, { title: "", description: "" }]);
  const removeResult = (i: number) =>
    setResult(Result.filter((_, idx) => idx !== i));


  // testimonials
  const handleTestimonialChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = [...testimonials];
    updated[i][e.target.name as keyof typeof updated[0]] = e.target.value;
    setTestimonials(updated);
  };
  const addTestimonial = () =>
    setTestimonials([
      ...testimonials,
      { clientName: "", companyName: "", description: "" },
    ]);
  const removeTestimonial = (i: number) =>
    setTestimonials(testimonials.filter((_, idx) => idx !== i));

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));

      mainImages.forEach((file) => data.append("mainImage", file));
      productImages.forEach((file) => data.append("productImage", file));

      data.append("whatis", JSON.stringify(whatis));
      data.append("benefits", JSON.stringify(benefits));
      data.append("FAQ", JSON.stringify(FAQ));
      data.append("Result", JSON.stringify(Result));
      data.append("customerTestimonials", JSON.stringify(testimonials));

      const res = await axios.post("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product uploaded successfully!");
      console.log(res.data);

      router.push("/admin");

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Upload New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
    <div className="grid grid-cols-2 gap-4">

  <div>
    <label className="block font-semibold mb-1">
      Product Name <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="productName"
      value={formData.productName}
      onChange={handleChange}
      className="w-full border p-2 rounded"
      required
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">
      Product Path <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="productPath"
      value={formData.productPath}
      onChange={handleChange}
      className="w-full border p-2 rounded"
      required
    />
  </div>

  {/* <div>
    <label className="block font-semibold mb-1">Demo Video Link</label>
    <input
      type="text"
      name="productLink"
      value={formData.productLink}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Calendly URL</label>
    <input
      type="text"
      name="calendlyUrl"
      value={formData.calendlyUrl}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
  </div> */}

  <div className="col-span-2">
    <label className="block font-semibold mb-1">Category</label>
    <input
      type="text"
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
  </div>
</div>


  <div className="grid grid-cols-1 gap-4">

  <div>
    <label className="block font-semibold mb-1">Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="w-full border p-2 rounded"
      rows={4}
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Why Choose Description</label>
    <textarea
      name="why_choose_des"
      value={formData.why_choose_des}
      onChange={handleChange}
      className="w-full border p-2 rounded"
      rows={4}
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Who Need Description</label>
    <textarea
      name="who_need_des"
      value={formData.who_need_des}
      onChange={handleChange}
      className="w-full border p-2 rounded"
      rows={4}
    />
  </div>
</div>

    <div>
    <h2 className="text-xl font-bold mb-2">What is </h2>
    {whatis.map((b, i) => (
      <div
        key={i}
        className="border p-3 mb-3 rounded-lg space-y-2 bg-gray-50"
      >
        <input
          type="text"
          name="title"
          value={b.title}
          placeholder="Title"
          onChange={(e) => handleWhatisChange(i, e)}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={b.description}
          placeholder="Description"
          onChange={(e) => handleWhatisChange(i, e)}
          className="w-full border p-2 rounded"
        />
      </div>
    ))}
  
    </div>

          <div>
            <label className="block font-semibold mb-1">Main Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "main")}
            />
            <div className="flex gap-3 mt-2 flex-wrap">
              {mainImages.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-24 h-24 rounded"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "product")}
            />
            <div className="flex gap-3 mt-2 flex-wrap">
              {productImages.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>


          <div>
            <h2 className="text-xl font-bold mb-2">Benefits</h2>
            {benefits.map((b, i) => (
              <div
                key={i}
                className="border p-3 mb-3 rounded-lg space-y-2 bg-gray-50"
              >
                <input
                  type="text"
                  name="title"
                  value={b.title}
                  placeholder="Title"
                  onChange={(e) => handleBenefitChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="description"
                  value={b.description}
                  placeholder="Description"
                  onChange={(e) => handleBenefitChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeBenefit(i)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBenefit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Benefit
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Results</h2>
            {Result.map((b, i) => (
              <div
                key={i}
                className="border p-3 mb-3 rounded-lg space-y-2 bg-gray-50"
              >
                <input
                  type="text"
                  name="title"
                  value={b.title}
                  placeholder="Title"
                  onChange={(e) => handleResultChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="description"
                  value={b.description}
                  placeholder="Description"
                  onChange={(e) => handleResultChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeResult(i)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addResult}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Result
            </button>
          </div>

              <div>
            <h2 className="text-xl font-bold mb-2">FAQ</h2>
            {FAQ.map((b, i) => (
              <div
                key={i}
                className="border p-3 mb-3 rounded-lg space-y-2 bg-gray-50"
              >
                <input
                  type="text"
                  name="question"
                  value={b.question}
                  placeholder="question"
                  onChange={(e) => handleFAQChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="answer"
                  value={b.answer}
                  placeholder="answer"
                  onChange={(e) => handleFAQChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeFAQ(i)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFAQ}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add FAQ
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Customer Testimonials</h2>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="border p-3 mb-3 rounded-lg space-y-2 bg-gray-50"
              >
                <input
                  type="text"
                  name="clientName"
                  value={t.clientName}
                  placeholder="Client Name"
                  onChange={(e) => handleTestimonialChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="companyName"
                  value={t.companyName}
                  placeholder="Company"
                  onChange={(e) => handleTestimonialChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="description"
                  value={t.description}
                  placeholder="Feedback"
                  onChange={(e) => handleTestimonialChange(i, e)}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeTestimonial(i)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTestimonial}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Testimonial
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;

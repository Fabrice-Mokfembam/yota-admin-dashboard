import  { useState } from "react";
import PageDetail from "../../components/PageAlert/PageDetail";
import pic from "../../assets/images/avatar.jpeg";
import ReviewCard from "./ReviewCard";

function Reviews() {
  // Dummy data for unconfirmed and confirmed reviews
  const unconfirmedReviews = [
    {
      _id: "1",
      title: "Great Product!",
      reviewText: "This product exceeded my expectations. Highly recommend it.",
      name: "Alice Smith",
      photos: pic,
      createdAt: new Date().toISOString(),
      confirmed: false,
    },
    {
      _id: "2",
      title: "Average Experience",
      reviewText: "It’s okay, but could be better. Decent value for the price.",
      name: "Bob Johnson",
      photos: pic,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      confirmed: false,
    },
    {
      _id: "3",
      title: "Disappointing",
      reviewText: "Not what I expected. Quality issues noticed after a week.",
      name: "Charlie Brown",
      photos: pic,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      confirmed: false,
    },
  ];

  const confirmedReviews = [
    {
      _id: "4",
      title: "Best Purchase Ever!",
      reviewText: "Absolutely love this product. Perfect in every way.",
      name: "Logan N.",
      photos: pic,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      confirmed: true,
      rating: 5,
    },
    {
      _id: "4",
      title: "Best Purchase Ever!",
      reviewText: "Absolutely love this product. Perfect in every way.",
      name: "Logan N.",
      photos: pic,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      confirmed: true,
      rating: 5,
    },
    {
      _id: "4",
      title: "Best Purchase Ever!",
      reviewText: "Absolutely love this product. Perfect in every way.",
      name: "Logan N.",
      photos: pic,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      confirmed: true,
      rating: 5,
    },
    {
      _id: "4",
      title: "Best Purchase Ever!",
      reviewText: "Absolutely love this product. Perfect in every way.",
      name: "Logan N.",
      photos: pic,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      confirmed: true,
      rating: 5,
    },
    {
      _id: "4",
      title: "Best Purchase Ever!",
      reviewText: "Absolutely love this product. Perfect in every way.",
      name: "Logan N.",
      photos: pic,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      confirmed: true,
      rating: 5,
    },
    {
      _id: "4",
      title: "Best Purchase Ever!",
      reviewText: "Absolutely love this product. Perfect in every way.",
      name: "Logan N.",
      photos: pic,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      confirmed: true,
      rating: 5,
    },
    {
      _id: "5",
      title: "Good Value",
      reviewText: "Works well for the price. Satisfied overall.",
      name: "Emma Wilson",
      photos: pic,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      confirmed: true,
      rating: 4,
    },
    {
      _id: "6",
      title: "Could Be Better",
      reviewText: "It’s functional, but there are some flaws in design.",
      name: "David Lee",
      photos: pic,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
      confirmed: true,
      rating: 3,
    },
  ];

  const [activeTab, setActiveTab] = useState("confirmed"); // State to manage active tab

  const review = "Reviews";

  return (
    <div className="home-container p-4">
      <PageDetail page={review} />

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-[10px">
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "confirmed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("confirmed")}
        >
          Confirmed Reviews
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "unconfirmed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("unconfirmed")}
        >
          Unconfirmed Reviews
        </button>
      </div>

      {/* Reviews */}
      <div className="flex flex-wrap justify-center gap-3.5  mt-[10px] w-full">
        {activeTab === "confirmed"
          ? confirmedReviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          : unconfirmedReviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
      </div>
    </div>
  );
}

export default Reviews;

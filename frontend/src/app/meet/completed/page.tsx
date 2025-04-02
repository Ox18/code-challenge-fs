"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Completed() {
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (feedback) {
      toast.success("Thanks for your feedback!");
      router.push("/");
    } else {
      toast.error("Please select an option.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl text-center">
      <h1 className="text-2xl font-semibold mb-4">How was your experience?</h1>

      <div className="flex flex-col items-start gap-2 mb-6">
        {["Excellent", "Good", "Fair", "Poor"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="feedback"
              value={option}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit and return to home
      </button>
    </div>
  );
}

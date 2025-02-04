import React from "react";

const SubscriptionPage = () => {
  const plans = [
    {
      name: "Learn",
      price: "$500",
      features: [
        "Standard Dummy Text: There are many variations of Lorem Ipsum available",
        "Randomised Words: Which don't look even slightly unbelievable",
        "Free Event Passes",
      ],
    },
    {
      name: "Achieve",
      price: "$800",
      features: [
        "All benefits of Personal: There are many variations of Lorem Ipsum",
        "Various Versions: All the Lorem Ipsum generators on the Internet",
        "Unlimited Storage",
      ],
    },
    {
      name: "Excel",
      price: "$1000",
      features: [
        "All benefits of Team: There are many variations of Lorem Ipsum",
        "Sentence Structures: Making this the first true generator on the Internet",
        "Lifetime Access to all the content",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-16 ">
      <div className="text-center py-24 bg-deepBlue w-full text-white">
        <h2 className="text-3xl font-bold text-white">Flexible Plans & Pricing</h2>
        <p className="text-white max-w-2xl mx-auto mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry and has been the standard ever since.
        </p>
      </div>

      {/* ✅ Pricing Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center"
          >
            {/* ✅ Plan Header */}
            <div className="flex flex-col items-center mb-4">
              <img src="/images/education-cap.svg" alt="image" className="w-20 h-20" />
              <h3 className="text-xl font-semibold mt-2 text-gray-700">{plan.name}</h3>
            </div>

            {/* ✅ Price */}
            <p className="text-3xl font-bold text-gray-900">{plan.price} <span className="text-sm text-gray-500">/ month</span></p>

            {/* ✅ Features List */}
            <ul className="my-9 text-sm text-gray-600 space-y-4 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} >
                  ✅ {feature}
                </li>
              ))}
            </ul>

            {/* ✅ Subscribe Button */}
            <button className="mt-6 bg-blue-600 text-white w-full py-3 rounded-lg font-medium hover:bg-blue-700 transition-all">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;

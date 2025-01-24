import { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";

function FAQQuestion() {
    const [openFAQs, setOpenFAQs] = useState(Array(6).fill(false));

    const toggleFAQ = (index) => {
        setOpenFAQs((prev) =>
            prev.map((item, i) => (i === index ? !item : item))
        );
    };
    return (
        <div className="bg-white text-gray-800">
            <div className="max-w-2xl mx-auto py-16 px-4">
                <h1 className="text-3xl font-semibold text-center">
                    Frequently asked questions
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    Everything you need to know about the product and billing.
                </p>
                <div className="mt-8">
                    {[
                        {
                            question: "Who are these video lessons for?",
                            answer:
                                "Every student holds the potential for success. With tailored support and resources, that potential becomes reality.",
                        },
                        {
                            question:
                                "What makes Rockstarmath different? How do I know it will help me?",
                            answer:
                                "Rockstarmath offers personalized support and resources to ensure your success.",
                        },
                        {
                            question: "Will Rockstarmath follow my coursework?",
                            answer:
                                "Yes, Rockstarmath is designed to align with your coursework and help you succeed.",
                        },
                        {
                            question:
                                "What makes Rockstarmath different? How do I know it will help me?",
                            answer:
                                "Rockstarmath provides unique resources and support tailored to your needs.",
                        },
                        {
                            question: "How do the Monthly and Yearly membership plans work?",
                            answer:
                                "Membership plans offer flexible options to suit your needs, with both monthly and yearly subscriptions available.",
                        },
                        {
                            question: "Why should I trust you?",
                            answer:
                                "We have a proven track record of helping students succeed with our tailored resources and support.",
                        },
                    ].map((faq, index) => (
                        <div className="border-b py-4" key={index}>
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h2 className="text-lg font-medium">{faq.question}</h2>
                                <span className="text-steelBlue">
                                    {openFAQs[index] ? <FaMinus /> : <FaPlus />}
                                </span>
                            </div>
                            <div
                                className={`transition-all ease-in-out duration-500 overflow-hidden ${openFAQs[index] ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-gray-500 mt-2">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto mb-12">
                <div className="bg-gray-200 rounded-lg p-8 mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <img
                            alt="Person 1"
                            className="w-10 h-10 rounded-full border-2 border-white -ml-2"
                            src="https://storage.googleapis.com/a1aa/image/6YV3NyPh7CoXA1ggon2VmkCL6ESFNzTcyBkKM4VhwqByDO7E.jpg"
                        />
                        <img
                            alt="Person 2"
                            className="w-10 h-10 rounded-full border-2 border-white -ml-2"
                            src="https://storage.googleapis.com/a1aa/image/OnOz9rQF836NERIeS4lJaU4eDhHLkuFULkfsLNo2Tier8gzOB.jpg"
                        />
                        <img
                            alt="Person 3"
                            className="w-10 h-10 rounded-full border-2 border-white -ml-2"
                            src="https://storage.googleapis.com/a1aa/image/Pbd2hfruRDXmRiEF3XtGyx3JnvgcjO24We4Jrzpt2zGPP4sTA.jpg"
                        />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
                    <p className="text-gray-600 mb-6">
                        Can’t find the answer you’re looking for? Please chat to our
                        friendly team.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>)
}

export default FAQQuestion
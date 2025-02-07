import React, { useState, Suspense, lazy } from "react";
import { FaQuoteLeft } from "react-icons/fa";

// Lazy Load Components
const BlogBanner = lazy(() => import("../components/banners/BlogBanner"));
const AnimatedSection = lazy(() => import("../components/AnimatedSection"));

function BlogPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      image: "/images/about1.png",
      title: "Make Math a Daily Habit",
      description:
        "Incorporate 15 minutes of math practice into your child’s routine—just like brushing their teeth. Daily engagement reinforces existing skills and ensures consistency.",
    },
    {
      image: "/images/about2.png",
      title: "Review Old Skills Regularly",
      description:
        "It's common for children to forget concepts they learned months ago if they aren't revisited. Set aside time to review past lessons—whether it's multiplication, decimals, or word problems.",
    },
    {
      image: "/images/about3.png",
      title: "Leverage Real-Life Math Opportunities",
      description:
        "Math is everywhere! Involve your children in activities like cooking, budgeting, or grocery shopping. These real-world applications make math engaging and help children understand its practical importance.",
    },
    {
      image: "/images/about1.png",
      title: "Join STEM Enrichment Programs",
      description:
        "Many schools and community centers offer math clubs, robotics teams, and STEM workshops. These programs make math exciting and give children opportunities to work collaboratively.",
    },
    {
      image: "/images/about2.png",
      title: "Celebrate Progress",
      description:
        "Acknowledge and celebrate milestones—whether it’s mastering multiplication tables or solving their first algebra equation. Positive reinforcement boosts confidence.",
    },
  ];

  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBlog(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading...</div>}>
        <BlogBanner />
      </Suspense>

      <div className="flex flex-col md:flex-row px-8 md:px-32 py-12 md:py-20 gap-12 md:gap-20 items-center bg-gray-50">
        <div className="md:w-2/3 text-lg md:text-2xl text-gray-600 font-medium leading-relaxed">
          <Suspense fallback={<div className="text-gray-500 text-center">Loading...</div>}>
            <AnimatedSection direction="bottom">
              <h2>
                A passion for making math{" "}
                <span className="text-deepBlue">understandable</span> and helping my students reach
                their <span className="text-deepBlue">potential</span> is at the core of everything
                we do at RockstarMath.
              </h2>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-[16px] px-6 py-2 rounded-full shadow-md transition duration-300">
                See More
              </button>
            </AnimatedSection>
          </Suspense>
        </div>

        <div className="md:w-1/3">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img src="/images/blog2.png" loading="lazy" alt="Blog" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 px-6 sm:px-8 text-lightGray font-sans"
        style={{ backgroundImage: `url(/images/blog3.png)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <Suspense fallback={<div className="text-gray-500 text-center">Loading...</div>}>
          <AnimatedSection direction="right">
            <div className="relative max-w-4xl mx-auto text-center text-gray-200">
              <div className="flex justify-center mb-6">
                <FaQuoteLeft className="text-6xl sm:text-7xl text-white" />
              </div>
              <p className="text-lg sm:text-1xl leading-relaxed font-medium">
                RockstarMath is all about transforming challenges into achievements. We take pride
                in simplifying math and helping students discover their true potential through
                guided learning.
              </p>
              <br />
              <hr />
              <p className="text-lg sm:text-1xl leading-relaxed font-medium mt-5">
                Rockstar-Math
              </p>
            </div>
          </AnimatedSection>
        </Suspense>
      </div>

      <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading...</div>}>
        <AnimatedSection direction="top">
          <div className="py-10 bg-gray-50">
            <h2 className="text-gray-800 text-3xl font-bold text-center mb-10">
              <span className="border-b-4 border-deepBlue pb-1">Our Blogs</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 xl:px-20">
              {blogs.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                  onClick={() => handleOpenModal(item)}
                >
                  <div className="h-56 overflow-hidden rounded-t-lg relative">
                    <img src={item.image} loading="lazy" alt="Blog image" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h6 className="mb-3 text-gray-800 text-xl font-semibold hover:text-deepBlue transition-colors duration-300">
                      {item.title}
                    </h6>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Suspense>

      {modalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleBackdropClick}>
          <div className="relative bg-white rounded-lg w-[90vw] md:w-[70vw] lg:w-[60vw] overflow-hidden shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-deepBlue text-white p-2 rounded-full shadow-md hover:bg-sky-600 transition-all focus:outline-none"
            >
              ✖
            </button>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-64 lg:h-auto bg-gray-100">
                <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
              </div>
              <div className="lg:w-1/2 p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedBlog.title}</h3>
                <p className="text-gray-600">{selectedBlog.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPage;

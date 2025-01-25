import React from 'react';

function BlogBanner() {
    return (
        <div className="relative h-96 overflow-hidden">
    {/* Background Image */}
    <img
        src="/images/blog.png"
        alt="Blog Banner"
        className="absolute w-full h-full object-cover"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black opacity-75"></div>

    {/* Text Content */}
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            Welcome to Our Blog
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl drop-shadow-lg">
            Stay informed with the latest updates, tips, and insights to empower your learning journey.
        </p>
    </div>
</div>

    );
}

export default BlogBanner;

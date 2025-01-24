import React from 'react';

function ReviewsBanner() {
    return (
        <div className="bg-cover bg-center py-40" style={{ backgroundImage: `url(/images/reviewsBanner.png)` }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-start ">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white text-center mb-4 leading-snug">
                        RockstarMath Reviews from students just like you…
                    </h2>
                    <p className="text-white text-center">
                        RockstarMath has consistently received positive reviews from students who have used its resources to enhance their understanding of calculus. Here are some common themes found in student feedback:
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReviewsBanner;

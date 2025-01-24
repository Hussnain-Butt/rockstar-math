import React from 'react'

function ContactBanner() {
    return (
        <>
            {/* Banner Section */}
            <div className="bg-gradient-to-r from-deepBlue py-5 to-darkTeal p-8 text-lightGray font-sans">
                <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
                    {/* Left Section: Text */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-medium mb-4 leading-snug">
                            To contact us, please complete and submit the form below. We’ll get back with you within 24 hours. Thank you!
                        </h2>
                    </div>

                    {/* Right Section: Logo */}
                    <div className="lg:w-1/2 flex justify-end mt-6 lg:mt-0">
                        <img src="/images/logo1.png" alt="Company Logo" className="w-[300px] h-auto" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactBanner
import React from "react";

const HeroSection = () => {
  // Smooth scroll function to Reservation section
  const scrollToReservation = () => {
    const element = document.getElementById("reservation");
    const navbarHeight = 80; // Adjust if your navbar height is different
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="heroSection"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-28 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              Fresh <span className="text-orange-600">Sri Lankan</span>{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Flavors
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto md:mx-0">
              Delicious meals, vibrant tastes & friendly vibes for every occasion.
            </p>

            {/* Reserve Now Button */}
            <button
              onClick={scrollToReservation}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl shadow-lg text-lg font-semibold transition-all hover:scale-105"
            >
              Reserve Now
            </button>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-md">
              {/* Main Hero Image */}
              <img
                src="./hero3.png"
                alt="Sri Lankan Food"
                className="w-full h-auto rounded-3xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Side Image */}
              <img
                src="./hero4.png"
                alt="Side Dish"
                className="absolute -bottom-4 -right-4 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full object-cover ring-4 ring-white shadow-xl bg-white animate-bounce-slow"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

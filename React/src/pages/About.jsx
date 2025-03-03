const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          About Us
        </h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">MyApp</span> your go-to platform for seamless user interactions and social connections. We are dedicated to providing you with the best experience, whether you re here to connect with friends, explore new opportunities, or simply enjoy our services.
          </p>

          <p className="text-lg leading-relaxed">
            Our mission is to create a community-driven platform that fosters meaningful connections and empowers users to achieve their goals. With a focus on innovation, security, and user satisfaction, we strive to make your journey with us enjoyable and rewarding.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600">John Doe</h3>
                <p className="text-gray-600">CEO & Founder</p>
                <p className="mt-2 text-gray-700">
                  John is a visionary leader with over 10 years of experience in the tech industry.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600">Jane Smith</h3>
                <p className="text-gray-600">CTO</p>
                <p className="mt-2 text-gray-700">
                  Jane is a tech enthusiast who loves building scalable and efficient systems.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>User-Centric Approach</li>
              <li>Innovation and Creativity</li>
              <li>Transparency and Trust</li>
              <li>Community Building</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
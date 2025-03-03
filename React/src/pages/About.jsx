const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          About Us
        </h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">MyApp</span>, your go-to platform for seamless social connections. We are dedicated to providing you with the best experience, whether you're here to connect with friends, explore new opportunities, or simply enjoy our services.
          </p>

          <p className="text-lg leading-relaxed">
            Our mission is to create a community-driven platform that fosters meaningful connections and empowers users to achieve their goals. With a focus on innovation, security, and user satisfaction, we strive to make your journey with us enjoyable and rewarding.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600">Rajveer Singh Khinchi</h3>
                <p className="text-gray-600">Developer & Designer</p>
                <p className="mt-2 text-gray-700">
                  Rajveer is a passionate developer currently pursuing his B.Tech in Information Technology at VIT Vellore. He loves building user-friendly and scalable applications.
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

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg leading-relaxed">
              MyApp was born out of a simple idea: to create a platform where people can connect, share, and grow together. As a team of passionate individuals, we believe in the power of technology to bring people closer and make the world a better place.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              From the initial concept to the final product, every step of our journey has been driven by a commitment to excellence and a desire to make a positive impact. We are proud of what we have built so far, and we are excited to continue improving and expanding our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

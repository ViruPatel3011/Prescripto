import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img src={assets.about_image} alt="" className="w-full max-w-[360px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-md text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            id labore provident. Eaque iusto non nostrum error voluptatem vel
            velit sunt est! Dicta officiis tempora tenetur quaerat molestias
            ipsum et?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
            quaerat impedit eveniet necessitatibus similique dolor, doloribus
            commodi voluptatem natus dolore, rem enim. Aut doloremque,
            recusandae excepturi earum cumque accusantium natus?
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
            minus inventore quas est quisquam impedit architecto pariatur iure
            sapiente vitae! Iure nulla ad enim dignissimos.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            ab!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVIENIENCE:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            nostrum.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus,
            aliquid?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

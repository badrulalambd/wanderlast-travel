import Image from "next/image"

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChoose() {
  return (
    <section className="bg-[#e6f7f4] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl text-gray-900 lg:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-base text-gray-600 lg:text-lg">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon, title, description }) => (
            <article
              key={title}
              className="flex flex-col items-center rounded-xl bg-[#fdf2ee] px-8 py-10 text-center"
            >
              <Image src={icon} alt="" width={44} height={44} className="size-11" />
              <h3 className="mt-5 text-2xl text-gray-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 lg:text-base">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

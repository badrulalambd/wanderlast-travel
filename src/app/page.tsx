import { Banner } from "@/components/home/banner"
import { Cta } from "@/components/cta/cta"
import { Testimonials } from "@/components/home/testimonials"
import { WhyChoose } from "@/components/home/why-choose"
import FeaturedDestination from "@/components/home/FeaturedDestination";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedDestination />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
}

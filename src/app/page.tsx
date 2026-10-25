import { Banner } from "@/components/banner/banner"
import { Cta } from "@/components/cta/cta"
import { Testimonials } from "@/components/testimonials/testimonials"
import { WhyChoose } from "@/components/why-choose/why-choose"

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
}

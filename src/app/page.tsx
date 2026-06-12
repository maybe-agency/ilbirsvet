import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getDictionary } from "@/data/site";
import { Blog } from "@/sections/blog";
import { Emergency } from "@/sections/emergency";
import { Hero } from "@/sections/hero";
import { Offers } from "@/sections/offers";
import { Services } from "@/sections/services";

export default function Home() {
  const dictionary = getDictionary("ru");

  return (
    <>
      <Header dictionary={dictionary} />
      <main>
        <Hero dictionary={dictionary} />
        <Offers dictionary={dictionary} />
        <Emergency dictionary={dictionary} />
        <Services dictionary={dictionary} />
        <Blog dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}

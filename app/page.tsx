import Banner from "./components/Banner";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";
import Whyus from "./components/Whyus";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Featured />
      <Whyus />
      <NewsLetter />
      <Footer />
    </div>
  );
}

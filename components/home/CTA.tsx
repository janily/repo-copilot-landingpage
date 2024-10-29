/* eslint-disable react/no-unescaped-entities */
import CTAButton from "@/components/home/CTAButton";
import { RoughNotation } from "react-rough-notation";

const CTA = ({ locale, CTALocale }: { locale: any; CTALocale: any }) => {
  return (
    <section className="flex flex-col justify-center max-w-[88%] items-center py-16 gap-12">
      <div className="flex flex-col text-center gap-4">
        <h2 className="text-center">{locale.title}</h2>
        <p className="text-large text-default-500">
          {locale.description1}{" "}
          <RoughNotation type="box" color="#b71c1c" show={true}>
            {locale.description2}
          </RoughNotation>{" "}
          {locale.description3}{" "}
          <RoughNotation type="box" color="#b71c1c" show={true}>
            {locale.description4}
          </RoughNotation>
          {locale.description5} {locale.description6}
        </p>
      </div>
      <CTAButton locale={CTALocale} />
    </section>
  );
};

export default CTA;

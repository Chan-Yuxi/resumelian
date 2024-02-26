import { Button } from "antd";
import { useTranslation } from "react-i18next";

// import Search from "./Search";
import TemplateCard from "./TemplateCard";
import JobTemplateCard from "./JobTemplateCard";
import CaseCard from "./CaseCard";

import resources from "@/config/home_resources.json";

type HomeResourcesType = {
  jobs: Array<JobType>;
  tips: Array<string>;
};

type JobType = {
  text: string;
  picture: string;
};

const Home = () => {
  const { t } = useTranslation();

  const staticTemplates = [
    `https://www.jianlizhizuo.cn/static/rusumethemepic_5.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_3.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_2.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_4.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_5.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_6.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_4.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_6.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_2.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_3.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_4.jpg`,
    `https://www.jianlizhizuo.cn/static/rusumethemepic_5.jpg`,
  ];

  return (
    <main>
      {/* SECTION 1 */}
      <section className="md:h-[830px] overflow-hidden md:relative py-6 md:p-60 bg-blue-50/80">
        <div className="px-6 md:px-0">
          <h1 className="text-5xl md:text-6xl leading-tight md:leading-none font-bold mb-4">
            {t("home.title")}
          </h1>
          <h4 className="text-gray-400 text-base md:text-lg mb-4 md:mb-16">
            {t("home.description")}
          </h4>
          {/* <Search /> */}
        </div>
        <img
          className="md:absolute md:bottom-0 md:-right-16 w-full md:w-auto md:h-4/5 mt-12 md:mt-0 bg-blue-50 md:bg-transparent"
          src="/home_background.png"
          alt="home background not found"
        />
      </section>

      {/* SECTION 2 */}
      <section className="hidden md:flex flex-col gap-4 items-start md:flex-row md:justify-between px-4 md:px-60 py-6 bg-gradient-to-l from-indigo-100/50 to-blue-200/80">
        {(resources as HomeResourcesType).tips.map((tip, index) => {
          return (
            <img
              key={index}
              className="h-[48px]"
              src={tip}
              alt="picture not found"
            />
          );
        })}
      </section>

      {/* SECTION 3 */}
      <section className="px-4 md:px-60 py-8 md:py-16 bg-blue-50">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{t("home.subtitle")}</h2>
          <h4 className="text-slate-500">{t("home.sub_description")}</h4>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-16">
          {staticTemplates.map((template, i) => (
            <TemplateCard key={i} src={template} />
          ))}
        </div>
        <div className="text-center mt-8 md:mt-16">
          <Button
            className="h-[40px] rounded-full px-16 shadow-lg"
            type="primary"
          >
            {t("home.more_template")}
          </Button>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="px-4 md:px-60 py-8 md:py-16 bg-blue-100">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{t("home.subtitle")}</h2>
          <h4 className="text-slate-500">{t("home.sub_description")}</h4>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-16">
          {(resources as HomeResourcesType).jobs.map((job, index) => {
            return (
              <JobTemplateCard
                key={index}
                text={job.text}
                picture={job.picture}
              />
            );
          })}
        </div>
        <div className="text-center mt-8 md:mt-16">
          <Button
            className="h-[40px] rounded-full px-16 shadow-lg"
            type="primary"
          >
            {t("home.more_template")}
          </Button>
        </div>
      </section>

      {/* SECTION 5 */}
      <section
        className="px-4 md:px-60 py-16 bg-cover"
        style={{ backgroundImage: "url(/index_background.png)" }}
      >
        <h1 className="text-center text-3xl text-white mb-12">
          {t("home.service_advantages")}
        </h1>
        <div className="flex flex-col md:flex-row gap-16 items-center md:justify-between">
          <img
            className="hidden md:block h-[125px]"
            src="/home_picture/info_1.png"
            alt="not_found"
          />
          <img
            className="block md:hidden h-[100px]"
            src="/home_picture/info_1_mobile.png"
            alt="not_found"
          />
          <img
            className="hidden md:block h-[125px]"
            src="/home_picture/info_2.png"
            alt="not_found"
          />
          <img
            className="block md:hidden h-[100px]"
            src="/home_picture/info_2_mobile.png"
            alt="not_found"
          />
          <img
            className="hidden md:block h-[125px]"
            src="/home_picture/info_3.png"
            alt="not_found"
          />
          <img
            className="block md:hidden h-[100px]"
            src="/home_picture/info_3_mobile.png"
            alt="not_found"
          />
          <img
            className="hidden md:block h-[125px]"
            src="/home_picture/info_4.png"
            alt="not_found"
          />
          <img
            className="block md:hidden h-[100px]"
            src="/home_picture/info_4_mobile.png"
            alt="not_found"
          />
        </div>
      </section>

      {/* SECTION 6 */}
      <section className="px-4 md:px-60 py-8 md:pt-16 md:pb-44 bg-zinc-100">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{t("home.subtitle")}</h2>
          <h4 className="text-slate-500">{t("home.sub_description")}</h4>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-16">
          {/* 暂时替代，后续需配置内容请创建正确的数组 */}
          {new Array(8).fill(0).map((_, index) => (
            <CaseCard
              key={index}
              src={`/home_picture/case-template-${(index % 3) + 1}.jpg`}
              title="事业单位简历案例"
              text="事业单或国企简历范文突出，教师岗位，具有丰富教师经验..."
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

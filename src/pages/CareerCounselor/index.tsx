import { Button } from "antd";
import ParticlesBg from "particles-bg";

const CareerCounselor = () => {
  const items = [
    {
      id1: [
        {
          id: 1,
          username:
            "Andy，本科毕业于武汉大学金融工程专业，硕士毕业于纽约大学金融工程专业。3年全职工作经验，就职于中信建投证券，担任自营投资分析工作，参与团队管理40亿人民币资产。工作内容包括：股票基本面研究、量化研究、股票中性策略、期货趋势跟踪策略、期权波动率交易策略及大类资产配置等。此外，曾在美国UBS量化策略部及高瓴资本团队实习，熟悉中美两地一、二级市场求职及工作内容。对三中一华等大型证券公司、华夏基金等基金公司内部岗位设置及招聘流程较为熟悉。2020年帮助同学拿到华泰证券、中信证券、中金公司、国泰君安等全职offer。善于从学生优点角度润色简历，改简历的同时会指点学生如何使用，如何表述简历中相关内容。",
          img: "/xizhuang5.png",
        },
      ],
    },
    {
      id1: [
        {
          id: 2,
          username:
            "Anna Zhao导师央企海外财务岗位，全球职业规划师。擅长把一般学校学生打造的同样具有竞争优势。导师之前的成功案例丰富，帮助多位学员成功拿到过Offer，个人做为导师的过往战绩如下：房地产类：北京万科、华夏幸福、新希望、美的置业、隆基泰和等互联网类：字节跳动、小米、今日头条、北京搜狗、石家庄搜狐、欧冶电商等央企/国企：中国铁塔、上海电气、汇丰银行、农行、建行、工商银行等公务员/事业单位：国家电网、南方电网、河北国家物资储备管理局、南京教育厅等 其他：国泰君安、阿克苏诺贝尔、德邦物流、瑞华事务所等东北人自带的幽默感，不灭的心中火，一定要帮助像我一样简历平平的同学，找到一份令人满意的好工作。熟悉央企/国企工作制度，任职要求，曾配合省公司组织人才招聘。擅长面试押题，成功率在80%以上。",
          img: "/xizhuang4.png",
        },
      ],
    },
    {
      id1: [
        {
          id: 3,
          username:
            "Edison,导师就职于Top2券商投资银行部，入职前曾参与多段头部券商股、债实习，斩获多家头部券商、大型券商投资银行部的暑期实习、校招实习、及正式录取offer。导师有较为丰富的带教给实习生经验，擅于指导有一定基础的实习生及和0基础的投行小白，从0开始到独立负责部分板块工作。导师对券商、公募基金的各类岗位的实习录用、实习留用、校招录取及考核机制极为熟悉。以让学员“学习后能够自主应对各种类型的面试”为导向，帮助学员斩获券商投行部实习和正式offer。导师对无商科实习的工科背景同学、无相关实习经历的留学生、无财务基础及实习经验的学生、本科学历一般的学生、及本硕985及以上有相关经历等各类型学生，对其寻找实习及全职，具备丰富的学生导向差异化培训经验，对大四拟留学的同学可以亦可提供投行部相关英文文书指导。",
          img: "/xizhuang3.png",
        },
      ],
    },
  ];

  const result: Array<{
    id: number;
    username: string;
    img: string;
  }> = [];
  for (let i = 0; i < items.length; i++) {
    result.push(items[i].id1[0]);
  }

  return (
    <main className="w-[80vw] mb-64 mx-auto bg-transparent">
      <section className="p-8 m-8 shadow-lg bg-white">
        <div
          className="text-transparent text-center text-3xl font-bold bg-gradient-to-r from-[#f01234] via-[#f58031] via-[#f3c228] to-[#e6ff07]"
          style={{
            backgroundClip: "text",
          }}
        >
          金融行业专业导师亲自为您量身定做简历，让你的简历更显专业！
        </div>
      </section>

      <section>
        {result.map((item) => (
          <figure
            className="p-8 m-8 border border-1 border-solid border-slate-200 bg-slate-100 shadow-lg"
            key={item.id}
          >
            <div className="flex">
              <img
                className="w-[18%] aspect-square me-8 shrink-0 rounded"
                alt="picture"
                src={item.img}
              />
              <figcaption>
                <div className="text-xl text-zinc-600 leading-normal">
                  {item.username}
                </div>
              </figcaption>
            </div>

            <div className="text-right">
              <Button
                type="primary"
                size="large"
                className="!rounded-none !px-16"
              >
                了解详情
              </Button>
            </div>
          </figure>
        ))}
      </section>

      <ParticlesBg type="polygon" bg={true} />
    </main>
  );
};

export default CareerCounselor;

import { Button } from "antd";
import { RightCircleOutlined, RiseOutlined } from "@ant-design/icons";

const mentors = [
  {
    id: 1,
    price: 700,
    image: "/mentor_1.png",
    description: `Andy，本科毕业于武汉大学金融工程专业，硕士毕业于纽约大学金融工程专业。3年全职工作经验，就职于中信建投证券，担任自营投资分析工作，参与团队管理40亿人民币资产。工作内容包括：股票基本面研究、量化研究、股票中性策略、期货趋势跟踪策略、期权波动率交易策略及大类资产配置等。此外，曾在美国UBS量化策略部及高瓴资本团队实习，熟悉中美两地一、二级市场求职及工作内容。对三中一华等大型证券公司、华夏基金等基金公司内部岗位设置及招聘流程较为熟悉。2020年帮助同学拿到华泰证券、中信证券、中金公司、国泰君安等全职offer。善于从学生优点角度润色简历，改简历的同时会指点学生如何使用，如何表述简历中相关内容。`,
  },
  {
    id: 2,
    price: 400,
    image: "/mentor_2.png",
    description: `Anna Zhao，导师央企海外财务岗位，全球职业规划师。擅长把一般学校学生打造的同样具有竞争优势。导师之前的成功案例丰富，帮助多位学员成功拿到过Offer，个人做为导师的过往战绩如下：房地产类：北京万科、华夏幸福、新希望、美的置业、隆基泰和等互联网类：字节跳动、小米、今日头条、北京搜狗、石家庄搜狐、欧冶电商等央企/国企：中国铁塔、上海电气、汇丰银行、农行、建行、工商银行等公务员/事业单位：国家电网、南方电网、河北国家物资储备管理局、南京教育厅等 其他：国泰君安、阿克苏诺贝尔、德邦物流、瑞华事务所等东北人自带的幽默感，不灭的心中火，一定要帮助像我一样简历平平的同学，找到一份令人满意的好工作。熟悉央企/国企工作制度，任职要求，曾配合省公司组织人才招聘。擅长面试押题，成功率在80%以上。`,
  },
  {
    id: 3,
    price: 850,
    image: "/mentor_3.png",
    description: `Edison，导师就职于Top2券商投资银行部，入职前曾参与多段头部券商股、债实习，斩获多家头部券商、大型券商投资银行部的暑期实习、校招实习、及正式录取offer。导师有较为丰富的带教给实习生经验，擅于指导有一定基础的实习生及和0基础的投行小白，从0开始到独立负责部分板块工作。导师对券商、公募基金的各类岗位的实习录用、实习留用、校招录取及考核机制极为熟悉。以让学员“学习后能够自主应对各种类型的面试”为导向，帮助学员斩获券商投行部实习和正式offer。导师对无商科实习的工科背景同学、无相关实习经历的留学生、无财务基础及实习经验的学生、本科学历一般的学生、及本硕985及以上有相关经历等各类型学生，对其寻找实习及全职，具备丰富的学生导向差异化培训经验，对大四拟留学的同学可以亦可提供投行部相关英文文书指导。`,
  },
];

const CareerCounselor: React.FC = () => {
  return (
    <main className="min-h-reach-bottom bg-gradient-to-br from-sky-500 via-blue-400 to-purple-500">
      <div className="p-6 sm:px-72 sm:py-16">
        <section>
          <p className="text-lg sm:text-3xl font-bold text-blue-900">
            金融行业专业导师亲自为您量身定做简历，让你的简历更显专业！
          </p>
        </section>
        <section className="mt-6">
          <div className="flex gap-6 flex-col">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="cursor-pointer p-4 bg-zinc-200/50 hover:bg-zinc-200/80 transition-all shadow rounded group"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img
                    className="w-36 aspect-square shadow rounded-full border border-solid border-transparent group-hover:border-white"
                    src={mentor.image}
                  />
                  <div>
                    <p className="text-slate-700 group-hover:text-black">
                      {mentor.description}
                    </p>
                    <div className="mt-2 text-right">
                      <a href="#QRcode">
                        <Button
                          icon={<RightCircleOutlined />}
                          className="px-8"
                          type="primary"
                        >
                          {`咨询价格 $${mentor.price}`}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12">
          <div className="text-center">
            <Button
              icon={<RiseOutlined />}
              className="!px-12"
              size="large"
              type="primary"
            >
              更多导师
            </Button>
          </div>
        </section>
        <section className="mt-12" id="QRcode">
          <p className="text-lg sm:text-3xl font-bold text-blue-900">
            简历修改流程
          </p>
        </section>
        <section className="mt-6 p-4 bg-zinc-200/50 rounded shadow">
          <ol className="flex flex-col gap-2">
            <li>
              1、发送自己的简历给麦芒求职的工作人员，并告知相关求职方向&求职的基本情况，工作人员在跟你大概了解情况后会为您匹配专属导师。
            </li>
            <li>
              2、工作人员会发您相关导师的背景资料，您这边可以进行选择导师。购买后有工作人员帮您和导师进行拉群对接。
            </li>
            <li>
              3、导师会跟您进行15分钟的简单语音沟通为您进行目标岗位分析，并开始制作简历，在修改简历过程中导师需要挖掘您的优点会直接在群里询问相关内容，3天内将简历1.0版发给您。
            </li>
            <li>
              4、您在收到初稿后，请配合在一到两天内针对初稿内容进行补充，期间可以在群里与导师进行细节沟通。
            </li>
            <li>
              5、导师会针对您补充的内容在1-2天内进行进一步修改&完善并发送2.0版本的简介给您。
            </li>
            <li>6、如果2.0版本双方均无异议，则该版本为最终版本。</li>
          </ol>
        </section>
        <section className="mt-12">
          <p className="text-lg sm:text-3xl font-bold text-blue-900">
            报名方式
          </p>
          <div className="text-slate-900 mt-6">
            {/* <p>添加课程助教备注行研</p> */}
            {/* <p>拼团/购买后联系助教进课程群领取课件</p> */}
            <p>扫描下方二维码，添加微信号备注简历修改</p>
          </div>
          <img
            className="mt-6 w-48"
            src="/mentor_QRcode.png"
            style={{ opacity: ".7" }}
          />
        </section>
      </div>
    </main>
  );
};

export default CareerCounselor;

import React from 'react'
import Link from 'next/link';
import BgCard1 from "@/assets/bgCard1.jpg"
import Image from 'next/image'

export default function Menu() {
  const features = [
    {
      title: 'เช็คดวงชะตาตาม\nลัคนาราศี',
      image: BgCard1,
      link: '/zodiactable'
    },
    {
      title: 'สุ่มเปิดไพ่ทำนาย\nดวงชะตาแบบเจาะลึก',
      image: BgCard1,
      link: '/tarotcard'
    },
    {
      title: 'ส่งข้อความถึงตัวฉัน\nในอนาคต',
      image: BgCard1,
      link: '/sendmail'
    },
    {
      title: 'แชร์รีวิวคำทำนาย',
      image: BgCard1,
      link: '/review'
    },
  ];

  return (
    <div className="p-5">
      {/* Title */}
      <div className="flex justify-center">
        <span className="text-[70px] font-semibold text-white">MENU</span>
      </div>

      {/* Feature Cards */}
      <div className="flex justify-center gap-8 p-10">
        {
          features.map((feature, index) => (
            <Link href={feature.link} key={index}>
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                style={{
                  width: '250px',
                  height: '350px'
                }}>

                {/* ภาพพื้นหลัง (จางลง) */}
                <Image
                  src={feature.image}
                  alt="BgCard1"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-50 absolute inset-0 z-0"
                />

                {/* เลเยอร์สีดำบางๆ เพื่อให้ตัวหนังสือชัดขึ้น */}
                <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

                {/* ข้อความ */}
                <h2 className="relative z-20 flex justify-center items-center text-center text-xl font-bold text-white px-4 whitespace-pre-line h-full">
                  {feature.title}
                </h2>

              </div>
            </Link>
          ))
        }
      </div>


    </div>
  );
}

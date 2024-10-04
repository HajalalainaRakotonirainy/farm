import Image from "next/image";

export default function Card () {
  const cardData = [
    {
      id: 1,
      title: "Bétails",
      lien: "/betail",
      image: "/images/betail.jpg",
    },
    {
      id: 2,
      title: "Employées",
      lien: "/employee",
      image: "/images/employe.jpg",
    },
    {
      id: 3,
      title: "Alimentations",
      lien: "/alimentation",
      image: "/images/alimentation.jpg",
    },
    {
      id: 4,
      title: "Médecines",
      lien: "/medecine",
      image: "/images/medecine.jpg",
    },
    {
      id: 5,
      title: "Matériels",
      lien: "/materiel",
      image: "/images/materiel.jpg",
    },
    {
      id: 6,
      title: "Productions",
      lien: "/production",
      image: "/images/production.jpg",
    },
    {
      id: 7,
      title: "Calendriers",
      lien: "/calendrier",
      image: "/images/calendrier.png",
    },
    {
      id: 8,
      title: "Finances",
      lien: "/finance",
      image: "/images/finance.jpg",
    },
    {
      id: 9,
      title: "Tableau de bords",
      lien: "/dashboard",
      image: "/images/dashboard.png",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {cardData.map((card) => (
        <div key={card.id} className="p-4 max-w-sm">
          <div className="flex rounded-lg h-full dark:bg-gray-800 flex-col shadow-md">
            <Image
              src={card.image}
              alt="Image"
              className="rounded-lg h-52 w-96"
              width={400}
              height={200}
            />
            <div className="flex flex-col flex-grow p-3 items-center">
              <a
                href={card.lien}
                className="font-size-lg mt-3 text-custom_green dark:text-white hover:text-blue-600 inline-flex"
              >
                { card.title }
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

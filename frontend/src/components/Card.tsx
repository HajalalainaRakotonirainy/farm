import Image from "next/image";

export default () => {
  const cardData = [
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card",
      image: "/images/betail.jpg",
    },
    {
      id: 2,
      title: "Card 2",
      description: "This is the second card",
      image: "/images/employe.jpg",
    },
    {
      id: 3,
      title: "Card 3",
      description: "This is the third card",
      image: "/images/alimentation.jpg",
    },
    {
      id: 4,
      title: "Card 1",
      description: "This is the first card",
      image: "/images/medecine.jpg",
    },
    {
      id: 5,
      title: "Card 2",
      description: "This is the second card",
      image: "/images/materiel.jpg",
    },
    {
      id: 6,
      title: "Card 3",
      description: "This is the third card",
      image: "/images/production.jpg",
    },
    {
      id: 7,
      title: "Card 1",
      description: "This is the first card",
      image: "/images/calendrier.png",
    },
    {
      id: 8,
      title: "Card 2",
      description: "This is the second card",
      image: "/images/finance.jpg",
    },
    {
      id: 9,
      title: "Card 3",
      description: "This is the third card",
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
                href="#"
                className="mt-3 text-custom_green dark:text-white hover:text-blue-600 inline-flex"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

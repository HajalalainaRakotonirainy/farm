"use client";

import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Cookies = require("js-cookie");

export default () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");
  const [data, setData] = useState({
    tag: "",
    race: "",
    nom: "",
    sexe: "male",
    date_naissance: "",
    date_entre_farm: "",
    pelage: "",
    poid: "",
    mere_tag: "",
    pere_tag: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/betails/${id}`, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          setData(res.data);
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Bétail No {data.tag}{" "}
        {data.sexe == "male" ? (
          <FontAwesomeIcon icon={faMars} color="blue" />
        ) : (
          <FontAwesomeIcon icon={faVenus} color="blue" />
        )}
      </h1>
      <div className="flex justify-around bg-white p-6 rounded-lg shadow-md w-3/4">
        {/* Left Section */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Nom</p>
            <p className="font-semibold">{data.nom}</p>
          </div>
          <div>
            <p className="text-gray-500">Race</p>
            <p className="font-semibold">{data.race}</p>
          </div>
          <div>
            <p className="text-gray-500">Pelage</p>
            <p className="font-semibold">{data.pelage}</p>
          </div>
          <div>
            <p className="text-gray-500">Poid</p>
            <p className="font-semibold">{data.poid}</p>
          </div>
        </div>

        {/* Center Section */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Date de naissance</p>
            <p className="font-semibold">{data.date_naissance}</p>
          </div>
          <div>
            <p className="text-gray-500">Date d'entrée au farm</p>
            <p className="font-semibold">{data.date_entre_farm}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Mère tag No</p>
            <p className="font-semibold">{data.mere_tag}</p>
          </div>
          <div>
            <p className="text-gray-500">Père tag No</p>
            <p className="font-semibold">{data.pere_tag}</p>
          </div>
          <div>
            <button onClick={()=>router.push(`/medicament?tag=${data.tag}`)} className="bg-green-500 text-white px-4 py-2 rounded">
              Medical History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { faAdd, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const Cookies = require("js-cookie");

export default () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");
  const tag = params.get("tag");
  const [data, setData] = useState({
    tag: tag,
    raison: "traitement",
    medicament: "",
    dosage: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/medicaments/${id}`, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          setData(res.data);
        });
    }
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (id) {
      axios
        .put(`http://localhost:8000/api/medicaments/${id}/`, data, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        })
        .then(() => {
          router.push(`/medicament?tag=${data.tag}`);
          Swal.fire({
            text: "Medicament modifié avec succés",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
          });
        });
    } else {
      axios
        .post("http://localhost:8000/api/medicaments/", data, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        })
        .then(() => {
          router.push(`/medicament?tag=${data.tag}`);
          Swal.fire({
            text: "Medicament ajouté avec succés",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
          });
        });
    }
  }
  return (
    <>
      <Navbar />
      <form className="max-w-4xl mx-auto" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid md:grid-cols-3 md:gap-6 mb-5">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="Raison"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Select raison
            </label>
            <select
              id="Raison"
              name="raison"
              value={data.raison}
              onChange={(e) => setData({ ...data, raison: e.target.value })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="traitement">Traitement</option>
              <option value="vaccin">Vaccin</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="medicament"
              id="Medicament"
              value={data.medicament}
              onChange={(e) => setData({ ...data, medicament: e.target.value })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Medicament"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Medicament
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="dosage"
              id="Dosage"
              step={0.01}
              value={data.dosage}
              onChange={(e) => setData({ ...data, dosage: e.target.value })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Dosage"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Dosage
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 mb-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="description"
              id="Description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="date"
              id="Date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date
            </label>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => router.push(`/medicament?tag=${data.tag}`)}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Annuler
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
const Cookies = require("js-cookie");
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

DataTable.use(DT);

export default function Betail() {
  const router = useRouter();

  const [betail, setBetail] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios
      .get("http://localhost:8000/api/betails", {
        headers: { Authorization: `Token ${Cookies.get("token")}` },
      })
      .then((res) => {
        setBetail(res.data);
      });
  }

  function handleDelete(id: number) {
    Swal.fire({
      icon: "warning",
      text: "Voulez-vous vraiment supprimer?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/betails/${id}/`, {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
          })
          .then(() => {
            loadData();
            Swal.fire({
              // title: "Error!",
              text: "Bétail supprimé avec succés",
              icon: "success",
              // confirmButtonText: 'Cool'
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 2000,
            });
          });
      }
    });
  }

  function handleModify(e: any, id: number) {
    e.preventDefault();
    router.push(`/form/betail?id=${id}`);
  }

  return (
    <>
      <Navbar />
      {betail ? (
        <DataTable
          data={betail}
          className="display"
          slots={{
            10: (data: any, row: any) => (
              <>
                <button
                  className="modify-btn"
                  onClick={(e) => handleModify(e, row.id)}
                >
                  <FontAwesomeIcon icon={faEdit} color="blue" /> Modify
                </button>
                <button
                  className="modify-btn"
                  onClick={() => handleDelete(row.id)}
                >
                  <FontAwesomeIcon icon={faTrash} color="red" /> Delete
                </button>
                <button
                  className="modify-btn"
                  onClick={() => router.push(`/detail?id=${row.id}`)}
                >
                  <FontAwesomeIcon icon={faInfo} color="green" /> Details
                </button>
              </>
            ),
          }}
          options={{
            columns: [
              { data: "tag" },
              { data: "nom" },
              { data: "race" },
              { data: "sexe" },
              { data: "poid" },
              { data: "pelage" },
              { data: "date_naissance" },
              { data: "date_entre_farm" },
              { data: "mere_tag" },
              { data: "pere_tag" },
            ],
          }}
        >
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Race</th>
              <th>Sexe</th>
              <th>Poid</th>
              <th>Pelage</th>
              <th>Date de naissance</th>
              <th>Date d'entrée au ferme</th>
              <th>Identifiant Mère</th>
              <th>Identifian Père</th>
              <th>
                <div className="flex flex-wrap justify-center ">
                  <a
                    href="/form/betail"
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <FontAwesomeIcon icon={faAdd} /> Ajouter
                  </a>
                </div>
              </th>
            </tr>
          </thead>
        </DataTable>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

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
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

DataTable.use(DT);

export default function Medecine() {
  const router = useRouter();

  const [medecine, setMedecine] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios
      .get("http://localhost:8000/api/medecines", {
        headers: { Authorization: `Token ${Cookies.get("token")}` },
      })
      .then((res) => {
        setMedecine(res.data);
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
          .delete(`http://localhost:8000/api/medecines/${id}/`, {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
          })
          .then(() => {
            loadData();
            Swal.fire({
              text: "Medecine supprimé avec succés",
              icon: "success",
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
    router.push(`/form/medecine?id=${id}`);
  }

  return (
    <>
      <Navbar />
      {medecine ? (
        <DataTable
          data={medecine}
          className="display"
          slots={{
            4: (data: any, row: any) => (
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
              </>
            ),
          }}
          options={{
            columns: [
              { data: "nom" },
              { data: "types" },
              { data: "prix" },
              { data: "date" },
            ],
          }}
        >
          <thead>
            <tr>
              <th>Nom</th>
              <th>Types</th>
              <th>Prix</th>
              <th>Date</th>
              <th>
                <div className="flex flex-wrap justify-center ">
                  <a
                    href="/form/medecine"
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

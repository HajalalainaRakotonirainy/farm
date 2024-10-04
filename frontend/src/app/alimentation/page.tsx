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

export default function Alimentation() {
  const router = useRouter();

  const [alimentation, setAlimentation] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios
      .get("http://localhost:8000/api/alimentations", {
        headers: { Authorization: `Token ${Cookies.get("token")}` },
      })
      .then((res) => {
        setAlimentation(res.data);
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
          .delete(`http://localhost:8000/api/alimentations/${id}/`, {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
          })
          .then(() => {
            loadData();
            Swal.fire({
              text: "Alimentation supprimé avec succés",
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

  function handleModify(e, id: number) {
    e.preventDefault();
    router.push(`/form/alimentation?id=${id}`);
  }

  return (
    <>
      <Navbar />
      {alimentation ? (
        <DataTable
          data={alimentation}
          className="display"
          slots={{
            4: (data, row) => (
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
              { data: "poid" },
              { data: "prix" },
              { data: "date" },
            ],
          }}
        >
          <thead>
            <tr>
              <th>Nom</th>
              <th>Poid</th>
              <th>Prix</th>
              <th>Date</th>
              <th>
                <div className="flex flex-wrap justify-center ">
                  <a
                    href="/form/alimentation"
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

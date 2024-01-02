import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Ticket() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("tickets"));
    const x = tickets.find((x) => x.id === id);
    if (x) {
      setData(x);
      document.title = `Ticket #${id}`;
    }
  }, [id]);

  return !data.id ? "Not found" : <div><h2>Ticket #{id}</h2></div>;
}

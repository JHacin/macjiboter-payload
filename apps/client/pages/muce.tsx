import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Cat } from "@macjiboter/shared-types";
import { CAT_GENDER_LABELS, CAT_STATUS_LABELS } from "@macjiboter/shared-constants";

export const getServerSideProps: GetServerSideProps<{
  cats: { docs: Cat[] };
}> = async () => {
  const res = await fetch("http://localhost:3333/api/muce");
  const data = await res.json();

  return {
    props: {
      cats: data,
    },
  };
};

const Muce: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ cats }) => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <div>
        <label htmlFor="search">Išči po imenu</label>
        <input id="search" type="text" style={{ border: "1px solid black" }} />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <div>
          <button>Razvrsti po datumu objave - najprej novejše</button>
        </div>
        <div>
          <button>Razvrsti po datumu objave - najprej starejše</button>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <div>Na stran:</div>
        <div style={{ display: "flex" }}>
          <div>
            <button>{"<<"}</button>
          </div>
          <div>
            <button>{"<"}</button>
          </div>
          <div>
            <button>6</button>
          </div>
          <div>
            <button>12</button>
          </div>
          <div>
            <button>{">"}</button>
          </div>
          <div>
            <button>{">>"}</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Rezultat</h1>
        {cats?.docs.map((cat) => (
          <div key={cat.id} style={{ border: "2px solid red", padding: "1rem", margin: "1rem" }}>
            <div>
              <strong>Ime</strong>: {cat.name}
            </div>
            <div>
              <strong>Spol</strong>: {CAT_GENDER_LABELS[cat.gender]}
            </div>
            <div>
              <strong>Status</strong>: {CAT_STATUS_LABELS[cat.status]}
            </div>
            <div>
              <strong>Datum sprejema v zavetišče</strong>:{" "}
              {String(cat.dateAcceptedToSponsorshipProgram)}
            </div>
            <div>
              <strong>Kratek opis</strong>: {cat.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Muce;

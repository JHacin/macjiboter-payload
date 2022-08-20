import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Cat, QueryKey } from "@macjiboter/shared-types";
import { CAT_GENDER_LABELS, CAT_STATUS_LABELS } from "@macjiboter/shared-constants";
import { PaginatedDocs } from "payload/dist/mongoose/types";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import qs from "qs";
import { useRef, useState } from "react";
import { debounce, range } from "lodash-es";
import Link from "next/link";
import Image from "next/image";

type GetCatsSort = "createdAt" | "-createdAt";

type GetCatsLimitOption = 1 | 3 | 6 | 12;

interface GetCatsQueryParams {
  sort: GetCatsSort;
  limit: GetCatsLimitOption;
  page: number;
  where: {
    name: {
      contains: string;
    };
  };
}

const defaultQueryParams: GetCatsQueryParams = {
  sort: "-createdAt",
  limit: 6,
  page: 1,
  where: {
    name: {
      contains: "",
    },
  },
};

const getCats = async (params: GetCatsQueryParams): Promise<PaginatedDocs<Cat>> => {
  const stringifiedQuery = qs.stringify(params, { addQueryPrefix: true });
  const res = await fetch(`http://localhost:3333/api/muce${stringifiedQuery}`);
  return await res.json();
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QueryKey.Cats, defaultQueryParams], () =>
    getCats(defaultQueryParams)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const CatsList: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const [queryParams, setQueryParams] = useState(defaultQueryParams);
  const {
    data: { docs, hasPrevPage, hasNextPage, totalPages, page },
  } = useQuery([QueryKey.Cats, queryParams], () => getCats(queryParams), {
    keepPreviousData: true,
  });

  const pageIndices = range(1, totalPages + 1);
  const perPageLimitOptions: GetCatsLimitOption[] = [1, 3, 6, 12];

  const queryUtils = {
    set: (cb: (prevState: GetCatsQueryParams) => Partial<GetCatsQueryParams>) => {
      setQueryParams((prev) => ({ ...prev, ...cb(prev) }));
    },
    page: {
      decrement: () => {
        queryUtils.set((prev) => ({ page: prev.page - 1 }));
      },
      increment: () => {
        queryUtils.set((prev) => ({ page: prev.page + 1 }));
      },
      set: (page: number) => {
        queryUtils.set(() => ({ page }));
      },
    },
    setSortBy: (sort: GetCatsSort) => {
      queryUtils.set(() => ({ sort, page: 1 }));
    },
    setPerPageLimit: (limit: GetCatsLimitOption) => {
      queryUtils.set(() => ({ limit, page: 1 }));
    },
    setSearch: (search: string) => {
      queryUtils.set(() => ({ where: { name: { contains: search } } }));
    },
    clearSearch: () => {
      queryUtils.setSearch("");
    },
  };

  const debouncedSetSearch = useRef(
    debounce((search: string) => {
      queryUtils.setSearch(search);
    }, 500)
  );

  return (
    <div style={{ marginTop: "5rem" }}>
      <div>
        <label htmlFor="search">Išči po imenu</label>
        <input
          id="search"
          type="text"
          style={{ border: "1px solid black" }}
          onChange={(event) => {
            debouncedSetSearch.current(event.currentTarget.value);
          }}
        />
        <span
          onClick={() => {
            queryUtils.clearSearch();
          }}
        >
          X
        </span>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <div>
          <button
            onClick={() => queryUtils.setSortBy("-createdAt")}
            style={{
              color: queryParams.sort === "-createdAt" ? "red" : "black",
            }}
            disabled={queryParams.sort === "-createdAt"}
          >
            Razvrsti po datumu objave - najprej novejše
          </button>
        </div>
        <div>
          <button
            onClick={() => queryUtils.setSortBy("createdAt")}
            style={{
              color: queryParams.sort === "createdAt" ? "red" : "black",
            }}
            disabled={queryParams.sort === "createdAt"}
          >
            Razvrsti po datumu objave - najprej starejše
          </button>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <div>Pojdi na stran:</div>
        <div style={{ display: "flex" }}>
          {hasPrevPage && (
            <div>
              <button onClick={queryUtils.page.decrement}>{"<"}</button>
            </div>
          )}
          {pageIndices.map((i) => (
            <div key={i}>
              {i === page && (
                <button style={{ color: "red" }} disabled>
                  {i}
                </button>
              )}
              {i !== page && <button onClick={() => queryUtils.page.set(i)}>{i}</button>}
            </div>
          ))}
          {hasNextPage && (
            <div>
              <button onClick={queryUtils.page.increment}>{">"}</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <div>Na stran:</div>
        <div style={{ display: "flex" }}>
          {perPageLimitOptions.map((limit) => (
            <div key={limit}>
              {limit === queryParams.limit && <button style={{ color: "red" }}>{limit}</button>}
              {limit !== queryParams.limit && (
                <button onClick={() => queryUtils.setPerPageLimit(limit)}>{limit}</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Rezultat</h1>
        {docs.length === 0 && <div>Ni rezultatov.</div>}

        {docs.map((cat) => (
          <div key={cat.id} style={{ border: "2px solid red", padding: "1rem", margin: "1rem" }}>
            {cat.photos[0]?.photo.sizes.thumbnail.url && (
              <div>
                <Image
                  src={`http://localhost:3333${cat.photos[0].photo.sizes.thumbnail.url}`}
                  alt={cat.photos[0].photo.alt}
                  width={cat.photos[0].photo.sizes.thumbnail.width}
                  height={cat.photos[0].photo.sizes.thumbnail.height}
                />
              </div>
            )}
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
              <strong>Datum sprejema v zavetišče</strong>: {cat.dateAcceptedToSponsorshipProgram}
            </div>
            <div>
              <strong>Kratek opis</strong>: {cat.summary}
            </div>
            <div>
              <strong>Datum vnosa</strong>: {cat.createdAt}
            </div>
            <div>
              <Link href={`/muce/${cat.slug}`}>
                <a>Pojdi na opis</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatsList;

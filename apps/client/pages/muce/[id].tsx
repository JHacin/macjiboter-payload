import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Cat, QueryKey } from "@macjiboter/shared-types";
import { dehydrate, DehydratedState, QueryClient, useQuery } from "@tanstack/react-query";
import { CAT_GENDER_LABELS, CAT_STATUS_LABELS } from "@macjiboter/shared-constants";

const getCat = async (id: string): Promise<Cat> => {
  const res = await fetch(`http://localhost:3333/api/muce/${id}`);
  return await res.json();
};

export const getServerSideProps: GetServerSideProps<
  { dehydratedState: DehydratedState; id: string },
  { id: string }
> = async ({ params: { id } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QueryKey.Cat, id], () => getCat(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

const CatDetails: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ id }) => {
  const { data: cat } = useQuery([QueryKey.Cat, id], () => getCat(id));

  return (
    <div>
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
    </div>
  );
};

export default CatDetails;

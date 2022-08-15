import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Cat, QueryKey } from "@macjiboter/shared-types";
import { dehydrate, DehydratedState, QueryClient, useQuery } from "@tanstack/react-query";
import { CAT_GENDER_LABELS, CAT_STATUS_LABELS } from "@macjiboter/shared-constants";
import { useRouter } from "next/router";
import qs from "qs";
import { PaginatedDocs } from "payload/dist/mongoose/types";

const getCat = async (slug: string): Promise<Cat> => {
  const query = {
    where: {
      slug: {
        equals: slug,
      },
    },
  };
  const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true });

  const res = await fetch(`http://localhost:3333/api/muce/${stringifiedQuery}`);
  const data: PaginatedDocs<Cat> = await res.json();

  return data.docs[0];
};

export const getServerSideProps: GetServerSideProps<
  { dehydratedState: DehydratedState },
  { slug: string }
> = async ({ params: { slug } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([QueryKey.Cat, slug], () => getCat(slug));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const CatDetails: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { data: cat } = useQuery([QueryKey.Cat, slug], () => getCat(slug));

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

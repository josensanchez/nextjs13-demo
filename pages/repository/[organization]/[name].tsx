import { GetServerSideProps } from "next";
import { getRepository, Repository, md2html } from "@/lib/github";
import Layout from "@/components/Layout";

export default function Home({ name, organization, full_name, description, readme }: RepositoryProps) {
  return (
    <>
      <Layout>
        <section id="Home" className="container">
          <hgroup>
            <h1>{name} </h1>
            <h2> {full_name}</h2>
          </hgroup>
          <p>{description}</p>
          
          <article className="readme" dangerouslySetInnerHTML={{ __html: readme }} />
        </section>
      </Layout>
    </>
  );
}

type RepositoryProps = {
  name: string;
  organization: string;
  full_name: string;
  readme: string;
  description: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  
  const organization = context.params?.organization ?? "default";
  const name = context.params?.name ?? "default";
  
  const repository = await getRepository(paramToString(organization), paramToString(name));
  // const index = await md2html("## Hello World");
  return {
    props: {
      name,
      organization,
      full_name: repository.full_name,
      description: repository.description,
      readme: repository.readme,
    }, // will be passed to the page component as props
  };
};

function paramToString(param: string | string[]):string {
  if (Array.isArray(param)) {
    return param.join('');
  }
  return param
}

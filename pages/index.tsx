import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home({repositories}:HomeProps) {
  return (
    <>
      <Layout>
        <section id="Home" class="container">
          <hgroup>
            <h1>Deprecated Home</h1>
            <h2>Here are some link to test the GitHub markdown API</h2>
          </hgroup>
          <div class="grid">
          { repositories.map( ({name, full_name, description}) =>
            <article key={full_name}>
              <hgroup>
                <h1>{name} </h1>
                <h2> {full_name}</h2>
              </hgroup>
              <p>{description}</p>
              <Link role="button" href={`/repository/${full_name}`}>
                show
              </Link>
            </article>
          )}
          </div>
        </section>
      </Layout>
    </>
  );
}

type HomeProps = {
  repositories: Partial<Repository>[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      repositories: [
        {
          name: "elixir",
          full_name: "elixir-lang/elixir",
          description: "Elixir is a dynamic, functional language designed for building scalable and maintainable applications",
        },
        {
          name: "phx-demo",
          full_name: "josensanchez/phx-demo",
          description: "Demo project using github public API",
        },
        {
          name: "nextjs13-demo",
          full_name: "josensanchez/nextjs13-demo",
          description: "Demo project using github public API and the markdown github app",
        },
      ]
    }, // will be passed to the page component as props
  };
};

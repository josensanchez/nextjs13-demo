import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

type Children = string | JSX.Element 
type Props = {
  children: Children;
}

export default function Layout({children}:Props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css"
        />
      </Head>
      <header data-theme="light">
        <nav className="container-fluid">
          <ul>
            <li>
              <strong>Brand</strong>
            </li>
          </ul>
          <ul>
            <li><a className="contrast" href="https://github.com/josensanchez">josensanchez</a></li>
            <li>
              <Image alt="" width={80} height={80} className="avatar" src="https://avatars.githubusercontent.com/u/5849818?v=4"/>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );

}


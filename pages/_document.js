import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <title>Oscar</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTviaLmNmv9PtGa7Ffji9Hg3gjPmTYsp7OYnQ&s" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&display=swap"
          rel="stylesheet"
        />
         <script src="https://apis.google.com/js/api.js" async defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

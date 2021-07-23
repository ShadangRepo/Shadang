import React from "react";

const Application = () => {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.id = "translation-script";
  //   script.src = "https://translate.google.com/translate_a/element.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   document
  //     .getElementById("translation-script")
  //     .addEventListener("load", () => {
  //       if (window.google) {
  //         new window.google.translate.TranslateElement(
  //           { pageLanguage: "en" },
  //           "google_translate_element"
  //         );
  //       }
  //     });
  // }, []);

  return (
    <>
      {/* <div id="google_translate_element"></div> */}
      Application routing
    </>
  );
};

export { Application };

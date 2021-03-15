import React from "react";

import success from "./../../assets/img/success.png";
import empty from "./../../assets/img/empty.png";

import "./Result.scss";

export const Result = ({ data, search, uris, flags }) => {
  console.log(data);
  console.log(uris);
  console.log(flags);
  return !data || data === "NO_DATA" ? (
    <div itemScope itemType="https://schema.org/Result" className="result">
      <img
        src={empty}
        alt="no data"
        itemProp="imageResultEmpty"
        className="result_image"
        align="center"
      />
      <h4 itemProp="title" className="result_title">
        {search}
      </h4>
      <p className="result_text" itemProp="resultEmpty">
        No hay resultados.
      </p>
    </div>
  ) : (
    <div itemScope itemType="https://schema.org/Result" className="result">
      <img
        src={success}
        alt="success"
        itemProp="imageResultsuccess"
        className="result_image"
      />
      <h4 itemProp="title" className="result_title">
        {search}
      </h4>

      {data.map((item, key) => (
        <p className="result_text" itemProp="resultSuccessAbstract" key={key}>
          {item}
        </p>
      ))}

      {uris.map((item, key) => (
        <p
          className="result_text_uri"
          itemProp="resultSuccessUris"
          key={`uri-${key}`}
        >
          {item}
        </p>
      ))}

      {flags.map((item, key) => (
        <img
          src={item}
          alt={`uri-${key}`}
          className="result_image_flag"
          itemProp="resultSuccessFlags"
          key={`uri-${key}`}
        />
      ))}
    </div>
  );
};

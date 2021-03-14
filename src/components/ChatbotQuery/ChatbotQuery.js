import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Loading } from "react-simple-chatbot";

import { Result } from "./../Result";

import { Encode } from "./../../util/utilsQuery";
import { GetComment } from "./../../util/utilArray";

import "./ChatbotQuery.scss";

export const ChatbotQuery = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [search, setSearch] = useState("");
  const [uris, setUris] = useState("");

  useEffect(() => {
    const { value } = steps.search;
    const param = value
      .charAt(0)
      .toUpperCase()
      .concat(value.slice(1));
    //console.log(param);
    setSearch(param);
    const query = Encode(`
      select * where {
        ?x rdfs:label '${param}'@es .
        ?x rdfs:comment ?comment .
        FILTER (lang(?comment) = 'es')
      } LIMIT 100 
    `);

    const readyStateChange = (e) => {
      //console.log(e);
      if (e.currentTarget.readyState === 4) {
        //console.log(e.currentTarget);
        const data = JSON.parse(e.currentTarget.response);
        const comment = GetComment(data.results.bindings, setUris);
        //console.log(bindings)
        if (comment && comment.length > 0) {
          setLoading(false);
          setResult(comment);
        } else {
          setLoading(false);
          setResult("NO_DATA");
        }
      }
    };

    const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri=&query=${query}&format=json`;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", readyStateChange);
    xhr.open("GET", queryUrl);
    xhr.send();
  }, [steps.search]);

  const triggetNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  return (
    <div className="dbpedia" itemScope itemType="https://dbpedia.org/sparql/">
      {loading ? (
        <Loading />
      ) : (
        <Result data={result} search={search} uris={uris} />
      )}
      {!loading && (
        <div
          itemScope
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {!trigger && (
            <button className="btn_search" onClick={() => triggetNext()}>
              Buscar de nuevo
            </button>
          )}
        </div>
      )}
    </div>
  );
};

ChatbotQuery.propTypes = {
  steps: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    metadata: PropTypes.any,
    value: PropTypes.string,
  }),
  triggerNextStep: PropTypes.func,
};

ChatbotQuery.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

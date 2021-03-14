import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Loading } from "react-simple-chatbot";

import { Encode } from './../../util/utilsQuery'
import { Result } from "./../Result";

export const ChatbotQuery = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const { search } = steps;
    console.log(search);
    const query = Encode(`
    select * where {
      ?x rdfs:label '${search.value}'@en .
      ?x rdfs:comment ?comment .
      FILTER (lang(?comment) = 'en')
    } LIMIT 100 
  `);
    //FILTER (lang(?comment) = 'es')
/*
OPTIONAL {
        ?x prov:wasDerivedFrom ?urlConsulta .
      }
*/
    const readyStateChange = (e) => {
      console.log(e);
      if (e.currentTarget.readyState === 4) {
        console.log(e.currentTarget.response);
        const data = JSON.parse(e.currentTarget.response);
        console.log(data);
        const bindings = data.results.bindings;
        if (bindings && bindings.length > 0) {
          setLoading(false);
          setResult(bindings[0].comment.value);
        } else {
          setLoading(false);
          setResult("No hay Resultados.");
        }
      }
    };
    const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri=&query=${query}&format=json`;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", readyStateChange);
    xhr.open("GET", queryUrl);
    xhr.send();
  }, [steps]);

  //no funciona correctamente
  const triggetNext = () => {
    setTrigger(true, () => {
      triggerNextStep();
    });
  };

  return (
    <div className="dbpedia" itemScope itemType="https://dbpedia.org/sparql/">
      {loading ? <Loading /> : <Result data={result} />}
      {!loading && (
        <div
          itemScope
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {!trigger && (
            <button onClick={() => triggetNext()}>Buscar de nuevo</button>
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

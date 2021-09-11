import React from "react";
import "./Definitions.css";

const Definitions = ({ meanings, word, LightTheme, category }) => {
  return (
    <div className="meanings">
      
          {
              meanings[0] && word && category === "en" && (
                  <audio
                      src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                      style={{ backgroundColor: "#fff", borderRadius: 10 }}
                      controls
                    >
                  </audio>
              )
      }

      {word === "" ? (
        <div className="subTitle">Enter a word</div>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="single-mean"
                style={{
                  backgroundColor: LightTheme ? "#356b7a" : "white",
                  color: LightTheme ? "white" : "black",
                }}
                > 
                    <b>{def.definition}</b>
                    <hr style={{ backgroundColor: "black", width: "100%" }} />
                    {
                        def.example && (
                            
                            <span>
                                <b> Examples - </b>
                                {def.example}
                            </span>
                        )
                    }
                    {
                        def.synonyms && (
                            <span>
                                
                                <b> Synonyms - </b>
                                {def.synonyms.map((s) => ` ${s} : `)}
                                
                            </span>
                        )
                    }
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definitions;
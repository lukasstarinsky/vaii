import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Section.css";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

export default function Section(props) {
  if (props.empty)
    return (
      <div className={`rounded border border-1 section border-gray-900 ${props.className} ${props.shadow ? "section-shadow": ""}`}>
        { props.header && 
          <div className="px-3 py-1 section-header text-white font-semibold">
            <span className="section-header-text">{props.header}</span>
          </div>
        }

        <div className="flex justify-center flex-col text-center py-12">
          <FontAwesomeIcon icon={faFaceFrown} className="h-24 text-gray-900" /> 
          <p className="text-xl mt-4 text-gray-500">This section is empty...</p>
        </div>
      </div>
    );
  
  return (
    <div className={`rounded border border-1 section border-gray-900 ${props.className} ${props.shadow ? "section-shadow": ""}`}>
      { props.header && 
        <div className="px-3 py-1 section-header text-white font-semibold">
          <span className="section-header-text">{props.header}</span>
        </div>
      }

      <div className={props.contentClassName}>
        { props.children }
      </div>
    </div>
  );
}
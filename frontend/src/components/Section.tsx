import "./Section.css";

interface SectionProps {
  className?: string
  children: string | JSX.Element | JSX.Element[],
  header?: string,
  shadow?: boolean,
  contentClassName?: string
}

export default function Section(props: SectionProps) {
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
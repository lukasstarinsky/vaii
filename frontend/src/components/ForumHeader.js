import "./ForumHeader.css";

export default function ForumHeader(props) {
  return (
    <>
      <div className="forum-header-background" />
      <div className="flex flex-col">
        <span className="text-4xl text-center mt-2 text-capitalize">{props.header}</span>
        <span className="text-center text-xl/10 text-neutral-600">{props.description}</span>
      </div>
    </>
  );
}
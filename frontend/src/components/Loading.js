import "./Loading.css";

export default function Loading() {
  return (
    <div className="top-0 absolute min-h-screen min-w-full">
      <div className="loading-background flex flex-col min-h-screen justify-center items-center">
        <div className="container">
          <div className="spinner mx-auto">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
import Home from "./Pages/Home";

const App = () => {
  return (
    <div className=" flex justify-center">
      <div>
        <h1 className=" text-center text-3xl mt-5 ">Data Grid Application</h1>

        <div className=" flex justify-center -mt-5">
          <div>
            <div className=" my-5"></div>
          </div>
        </div>

        <Home />
      </div>
    </div>
  );
};

export default App;

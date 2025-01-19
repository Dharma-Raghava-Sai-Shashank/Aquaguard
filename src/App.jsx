import ParticlesComponent from "./Components/ParticlesComponent.jsx";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import BoxReveal from "./Components/ui/box-reveal.jsx";
function App() {
  return (
    <div className="app h-screen w-screen text-white">
      <ParticlesComponent id="particles" />
      <div
        className="m-5 text-4xl "
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <BoxReveal
          className="box-reveal"
          boxColor="#000000"
          width={"480px"}
          height={"150px"}
          duration={0.5}
        >
          <b className="text-7xl text-black">AQUAGUARD</b>
        </BoxReveal>
      </div>
      <div
        className="m-5 text-4xl "
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <BoxReveal
          className="box-reveal"
          boxColor="#000000"
          width={"480px"}
          height={"150px"}
          duration={0.9}
        >
          <b className="text-2xl text-black">Real-time insights at your fingertips</b>
        </BoxReveal>
      </div>

      <div
        className="m-5 text-4xl "
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <BoxReveal
          className="box-reveal"
          boxColor="#000000"
          width={"480px"}
          height={"120px"}
          duration={1.4}
        >
          <b className="text-2xl text-black"> Monitor flow rates, pressure, and leak detection effortlessly.</b>
        </BoxReveal>
      </div>
    </div>
  );
}

export default App;

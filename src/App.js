import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [state, setstate] = useState(-1);
  const [data, setData] = useState([]);
  const [allcomment, setComment] = useState([]);
  const searchChangeHandler = event => {
    // console.log(event.target.value);
    setSearch(event.target.value);
    setstate(0);
  };
  var comments = "";

  const commentChangeHandler = event => {
    comments = event.target.value;
  };
  const commentHandler = () => {
    setComment([...allcomment, comments]);
    console.log(allcomment);
  };

  function datechanger(unix) {
    var date = new Date(unix * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  }
  const Weather = props => {
    if (props.data.cod === 200) {
      var icode = props.data.weather[0].icon;
      var url = "http://openweathermap.org/img/w/" + icode + ".png";
      console.log(url);

      console.log(datechanger(props.data.sys.sunrise));
      console.log(datechanger(props.data.sys.sunset));
      return (
        <>
          <div className="card">
            <table>
              <tbody>
                <tr>
                  <td
                    colSpan="2"
                    style={{ fontSize: "30px", paddingLeft: "10px" }}
                  >
                    {props.data.name},{props.data.sys.country}
                  </td>
                </tr>
                <tr>
                  <td rowSpan="5" style={{ width: "50%", textAlign: "center" }}>
                    <h1 style={{ fontSize: "100px", color: "#525252" }}>
                      {" "}
                      {props.data.main.temp}&#8451;
                      <img src={url} id="imageBox" alt="img" />{" "}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>
                      Weather:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {props.data.weather[0].main}
                      </span>{" "}
                    </h3>
                    <h3>
                      Wind:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {props.data.wind.speed} km/h
                      </span>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>
                      Humidity:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {props.data.main.humidity} %
                      </span>
                    </h3>
                    <h3>
                      Pressure:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {props.data.main.pressure} Pa
                      </span>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>
                      Max temp:
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {props.data.main.temp_max}&#8451;
                      </span>{" "}
                    </h3>
                    <h3>
                      Min temp:
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {props.data.main.temp_min}&#8451;
                      </span>{" "}
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>
                      Sunrise:
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {datechanger(props.data.sys.sunrise)}
                      </span>{" "}
                    </h3>
                    <h3>
                      Sunset:
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {datechanger(props.data.sys.sunset)}
                      </span>{" "}
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <div className="">
              <input
                list="name"
                placeholder="Comment here.."
                style={{
                  fontSize: 15,
                  display: "block",
                  width: "50%",
                  paddingTop: 10,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  marginLeft: "25%",
                  marginTop: "10px"
                }}
                onChange={commentChangeHandler}
              />
              <button
                onClick={commentHandler}
                style={{
                  width: "100px",
                  paddingTop: 10,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  marginLeft: "25%",
                  marginTop: "10px"
                }}
              >
                comment
              </button>
            </div>
            <div className="commentcard">
              <h3>Comments ({allcomment.length})</h3>
              <br />
              <ul className="fas">
                {allcomment.map(item => (
                  <p>&#xf007;{item}</p>
                ))}
              </ul>
            </div>
          </div>
        </>
      );
    } else if (props.data.cod == 404) {
      return (
        <div className="card">
          <h1 style={{ textAlign: "center" }}>City not Found</h1>
        </div>
      );
    } else {
      return (
        <div className="card">
          <h1 style={{ textAlign: "center" }}>Searching </h1>
        </div>
      );
    }
  };
  const Card = props => {
    if (props.state === 0) {
      return (
        <div className="card">
          <h1 style={{ textAlign: "center" }}>Searching </h1>
        </div>
      );
    } else if (props.state === 1) {
      return <Weather data={data} />;
    } else {
      return (
        <div className="card">
          <h1 style={{ textAlign: "center" }}>welcome</h1>
        </div>
      );
    }
  };
  const fetchApi = () => {
    setstate(1);
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      search +
      "&units=metric&appid=315ead1b490818d6d382d74fac3892d1";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  return (
    <div className="App">
      <Navbar />
      <div className="searchbar">
        <input
          list="name"
          placeholder="search"
          style={{
            fontSize: 15,
            display: "block",
            width: "50%",
            paddingTop: 10,
            paddingBottom: 8,
            paddingLeft: 16,
            marginLeft: "25%",
            marginTop: "10px"
          }}
          onChange={searchChangeHandler}
        />
        <button onClick={fetchApi}>Search</button>
      </div>
      <Card state={state} />
    </div>
  );
}

export default App;

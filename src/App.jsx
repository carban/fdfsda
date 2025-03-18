import { useState } from "react";

export default function SearchEngine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "https://b4c9-52-91-143-124.ngrok-free.app";

  function getYouTubeVideoId(url) {
    const regex = /[?&]v=([^&#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const data = {"answer":[{"href":"/clases/11887-reactjs/74504-que-es-react-y-cuales-son-sus-casos-de-uso/","image":"https://static.platzi.com/media/achievements/reactjs-patrones-render_badge-3c77e155-b04a-4c95-ac61-e2b6d2d5b92e-00753ce_R9qSoA6.webp","title":"Curso de React.js","teacher":"Por Estefany Aguilar","videos":[{"title":"¿Qué es ReactJS? ⚛️ ¿Cómo funciona? Explicación animada","url":"https://www.youtube.com/watch?v=bvxm389cYVI&pp=ygUIUmVhY3QuanM%3D"},{"title":"¿Qué es React.js y cómo funciona? - La mejor explicación en español","url":"https://www.youtube.com/watch?v=lWQ69WX7-hA&pp=ygUIUmVhY3QuanM%3D"},{"title":"Aprende React en 15 Minutos 📘","url":"https://www.youtube.com/watch?v=wGxDfSWC4Ww&pp=ygUIUmVhY3QuanM%3D"}],"title_emb":"curso de react.js"},{"href":"/clases/3219-react-redux-profesional/51177-ya-tomaste-el-curso-basico-de-redux/","image":"https://static.platzi.com/media/achievements/profesional-reactjs-redux-badge-d70e22d4-8d39-48be-a2a4-82945cd02e16.png","title":"Curso Profesional de React.js y Redux","teacher":"Por Mariangélica Useche","videos":[{"title":"Curso Profesional de React (firebase, hooks, redux, MaterialUI)","url":"https://www.youtube.com/watch?v=5DAEdXKp7QA&pp=ygUlQ3Vyc28gUHJvZmVzaW9uYWwgZGUgUmVhY3QuanMgeSBSZWR1eA%3D%3D"},{"title":"1. REACT con REDUX - CURSO PROFESIONAL","url":"https://www.youtube.com/watch?v=w8rRCNjj5W4&pp=ygUlQ3Vyc28gUHJvZmVzaW9uYWwgZGUgUmVhY3QuanMgeSBSZWR1eA%3D%3D"},{"title":"Curso Completo de React - La guía definitiva: Hooks, router, redux, next y muchos proyectos!","url":"https://www.youtube.com/watch?v=CvxPD5Acwgc&pp=ygUlQ3Vyc28gUHJvZmVzaW9uYWwgZGUgUmVhY3QuanMgeSBSZWR1eA%3D%3D"}],"title_emb":"curso profesional de react.js y redux"},{"href":"/clases/5481-react-typescript/57804-el-presente-del-frontend-es-typescript/","image":"https://static.platzi.com/media/achievements/piezas-react-typescript_badge-0b482f25-d778-492a-9cd8-d3b351e45667.png","title":"Curso de React.js con TypeScript","teacher":"Por Jonathan Alvarez","videos":[{"title":"Tutorial práctico: React y TypeScript paso a paso, crea tu primera aplicación","url":"https://www.youtube.com/watch?v=4lAYfsq-2TE&pp=ygUXUmVhY3QuanMgY29uIFR5cGVTY3JpcHQ%3D"},{"title":"How to use TypeScript with React... But should you?","url":"https://www.youtube.com/watch?v=ydkQlJhodio&pp=ygUXUmVhY3QuanMgY29uIFR5cGVTY3JpcHQ%3D"},{"title":"¿Utilizar REACT con Javascript o con Typescript? Invitado @midudev","url":"https://www.youtube.com/watch?v=rbPFyY-eGjQ&pp=ygUXUmVhY3QuanMgY29uIFR5cGVTY3JpcHQ%3D"}],"title_emb":"curso de react.js con typescript"},{"href":"/clases/2167-reactividad-vuejs/35415-como-convertirte-en-frontend-developer-con-vuejs/","image":"https://static.platzi.com/media/achievements/badge-vue-3-4b4c3cb0-ea25-4eac-957f-28eb09339383.png","title":"Curso de Reactividad con Vue.js 3","teacher":"Por Samuel Burbano","videos":[{"title":"Cómo usar la Reactividad en Vue 3","url":"https://www.youtube.com/watch?v=RVtsIAVPORA&pp=ygUYUmVhY3RpdmlkYWQgY29uIFZ1ZS5qcyAz"},{"title":"☘ Curso en Vue 3: Conociendo el sistema reactivo: REACTIVIDAD en Potencia #7","url":"https://www.youtube.com/watch?v=8rU5yervles&pp=ygUYUmVhY3RpdmlkYWQgY29uIFZ1ZS5qcyAz"},{"title":"La reactividad y componentes en un Proyecto Vue 3 | Curso de Vue.js 3 - 03","url":"https://www.youtube.com/watch?v=oeCfkrNyTk0&pp=ygUYUmVhY3RpdmlkYWQgY29uIFZ1ZS5qcyAz"}],"title_emb":"curso de reactividad con vue.js 3"}]}
    // setResults(data.answer); // Simulate search results
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: searchTerm }),
    });
    const data = await response.json();
    setLoading(false);
    setResults(data.answer)
  };

  return (
    <div className="min-h-screen bg-gray-150 flex flex-col items-center p-4 transition-all duration-300">
      <div className={`w-full max-w-2xl transition-all duration-300 ${results.length === 0 ? "flex flex-col justify-center items-center mt-60" : "mt-6"}`}>
        <h1 className="text-6xl font-bold mb-6 text-center">Gratzi</h1>
        <p className="text-center mb-5">Busca contenido alternativo <i>gratis</i> a los cursos de Platzi</p>
        <form onSubmit={handleSearch} className="w-full relative flex gap-2">
          <input
            type="text"
            placeholder="Escribe lo quieres aprender..."
            className="w-full p-3 text-lg border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="px-6 py-3 bg-orange-900 text-white rounded-full shadow-md hover:bg-orange-600">
            Buscar
          </button>
        </form>
      </div>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {(results.length > 0 && !loading) && (
        <div className="mt-10 w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-900 text-white">
                <th className="p-4 text-center">Course</th>
                <th className="p-4 text-center">Alternative</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <center>
                    <div className="border rounded-lg shadow-lg p-4 w-80 bg-white">
                      <a href={item.href} className="block hover:opacity-80">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </a>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.teacher}</p>
                      </div>
                      <a
                        href={"https://platzi.com"+item.href}
                        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg text-center w-full hover:bg-blue-600"
                      >
                        Ver curso
                      </a>
                    </div>
                    </center>
                    </td>
                  <td className="p-4 flex">
                  {item.videos.map((v, jndex) => (
                      <div key={jndex} className="border rounded-lg shadow-lg p-4 w-75 bg-white ">
                        <a href={v.url} className="block hover:opacity-80">
                        <img
                          src={`https://img.youtube.com/vi/${getYouTubeVideoId(v.url)}/hqdefault.jpg`}
                          alt={v.title}
                          // className="w-full h-40 object-cover rounded-md"
                        />
                      </a>
                                        <div className="mt-4">
                                          <h3 className="text-md font-semibold text-gray-800">{v.title}</h3>
                                        </div>
                                        {/* <a
                                          href={v.url}
                                          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg text-center w-full hover:bg-blue-600"
                                        >
                                          Ver video
                                        </a> */}
                      </div>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Footer */}
      <footer className="mt-auto w-full bg-gray-800 text-white text-center py-4">
        <p>¿Cómo funciona? | Acerca de</p>
      </footer>
    </div>
  );
}

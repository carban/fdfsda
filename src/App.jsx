import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Footer(){
  return (
    <footer className="mt-auto w-full bg-gray-800 text-white text-center py-4">
    <p>
      <Link to="/" className="text-blue-400 text-xl hover:underline"> Gratzi </Link> |
      <Link to="/como-funciona" className="text-blue-400 text-xl hover:underline"> ¿Cómo funciona? </Link> |
      <Link to="/acerca-de" className="text-blue-400 text-xl hover:underline"> Acerca de </Link>
    </p>
  </footer>
  )
}

function SearchEngine() {
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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: searchTerm }),
    });
    const data = await response.json();
    setLoading(false);
    setResults(data.answer);
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
      <Footer />
    </div>
  );
}

function ComoFunciona() {
  return <div className="p-10 text-center mt-10">
    <h2 className="text-3xl">Gratzi funciona gracias al poder de la <b>Búsqueda Semántica</b></h2>
    <center>
    <img src="https://raw.githubusercontent.com/UKPLab/sentence-transformers/master/docs/img/SemanticSearch.png" alt="Logo" class="m-15"  />
    </center>
    <div class="max-w-5xl  mx-auto p-6 bg-white rounded-lg mt-10 mb-10">
        <h1 class="text-3xl font-bol mb-4">¿Qué es un buscador semántico?</h1>
        <p class="text-lg leading-relaxed">Un <strong>buscador semántico</strong> es un sistema de búsqueda que comprende el significado de las palabras y la intención del usuario en lugar de simplemente coincidir términos exactos. A diferencia de los motores de búsqueda tradicionales, que comparan palabras clave en los documentos, un buscador semántico analiza el contexto y la relación entre los términos para ofrecer resultados más precisos y relevantes.</p>
        <h1 class="text-3xl font-bol mb-4 mt-4">¿Cómo Gratzi lo usa?</h1>
        <p class="text-lg leading-relaxed mt-4 mb-4">
          Gratzi toma un query como por ejemplo <i>"Marketing"</i> lo descompone en un vector <b>(embedding)</b> y busca los vectores <b>(documentos)</b> más <i>parecidos</i> en el espacio vectorial, muy parecido a la visualización de la imagen arriba.
        </p>
        <h1 class="text-3xl font-bol mb-4 mt-4">¿Cuáles documentos?</h1>
        <p class="text-lg leading-relaxed mt-4 mb-4">
          Para la recolección de documentos (datos y links de cursos) escribí <b>dos</b> scrapers:
          <ul>
            <li><b>Platzi Scraper:</b> Script creado con <b>Beautiful Soup</b> para recorrer y extraer los datos de <a className="text-blue-800" href="https://platzi.com/cursos/">https://platzi.com/cursos/</a></li>
            <li><b>Youtube Scraper:</b> Script creado con <b>Playwright</b> para navegar hasta YouTube y extraer los primeros 3 videos relacionados a un curso en específico</li>
          </ul>
        </p>

    </div>    
    <Footer />
  </div>;
}

function AcercaDe() {
  return <div className="p-10 text-center mt-10">
  <h2 className="text-3xl">Esto es una Demo</h2>
  <div class="max-w-5xl  mx-auto p-6 bg-white rounded-lg mt-10 mb-10">
      <p class="text-lg leading-relaxed">Desarrollé esta <b>prueba de concepto</b> para poner en práctica mis habilidades como Data Scientist </p>
      <p class="text-lg leading-relaxed">Cosas por mejorar <b><i>sí, muchas</i></b> el feedback es bienvenido</p>
      {/* <p class="text-lg leading-relaxed">Si <b>Freddy</b> o <b>Christian</b> ven esto, por favor no me demanden 😅</p> */}
      <p class="text-lg leading-relaxed">Otros proyectos en los que estoy trabajando:</p>
      <h1 class="text-3xl mb-4 mt-8">Mis Proyectos</h1>
      <ul>
        <li><a className="text-blue-800 text-lg" href="https://fooapi.com">FooApi</a></li>
        <li><a className="text-blue-800 text-lg" href="https://3d-ivory.vercel.app/">3D World Data</a></li>
      </ul>
      <h1 class="text-3xl mb-4 mt-4">Artículos</h1>
      <ul>
        <li><a className="text-blue-800 text-lg" href="https://dev.to/carban/the-all-in-one-fake-api-for-developers-3hpn">The All-in-One Fake API for you</a></li>
        <li><a className="text-blue-800 text-lg" href="https://dev.to/carban/3d-data-world-explorer-po9">3D Data World Explorer</a></li>
      </ul>
  </div>    
  <Footer />
</div>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchEngine />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
      </Routes>
    </Router>
  );
}

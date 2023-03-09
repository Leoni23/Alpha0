import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import p1 from '../pages/app/img/p1.png'
import p2 from '../pages/app/img/p2.png'
import video1 from '../pages/app/img/video1.mp4'


export const LandingPage = () => {
    const navigate = useNavigate()
    const [banner, setBanner] = useState([]);
    const [contact, setContact] = useState([]);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    const getBanner = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/banner-publico/fotos',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.banners)
            setBanner(response.data.data.banners)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getContact = async () => {
        try {
            const response = await axios.get(
                'https://alphaofin.herokuapp.com/api/alpha/contactos-publico',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.contactanos)
            setContact(response.data.data.contactanos)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getContact(); }, [])
    useEffect(() => { getBanner(); }, [])

    return (
        <>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
                    <div class="container px-5">
                        <h3 class=" brand-style">Escuela de Biodanza</h3>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i class="bi-list"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                                <li class="nav-item"><a class="nav-link me-lg-3" href="#Metodologias">Metodología</a></li>
                                <li class="nav-item"><a class="nav-link me-lg-3" href="#Simbolo">Símbolo</a></li>
                                <li class="nav-item"><a class="nav-link me-lg-3" href="#RedesSociales">Redes Sociales</a></li>
                                <li class="nav-item"><button class="nav-link me-lg-3 btn rounded-pill px-3 mb-2 mb-lg-0" >  <Link id="inicio" class="btn rounded-pill" to="login" style={{ textDecoration: "none" }}>Inicio de Sesión</Link></button></li>
                            </ul>

                        </div>
                    </div>
                </nav>

                <section style={{ background: "#EAEBEA" }} >
                    <div class="container px-5">
                        <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
                            <div id="tituloB" class="col-12 col-lg-6 text-center">
                                <h3 class="font-alt">¿Qué es Biodanza?</h3>
                                <p id="textoGarza" class="lead fw-normal text-muted mb-5 mb-lg-0">
                                    “Es un sistema de aceleración de procesos integrativos a nivel celular, metabólico neuro-endócrino,
                                    inmunológico y existencial mediante ambientes enriquecidos con músicas específicas, movimiento integrado,
                                    caricias y encuentro en grupo, que deflagran vivencias integradoras”. Todas las personas tenemos muchas
                                    capacidades de vitalidad, afecto, creatividad, sexualidad y trascendencia, que a veces están en silencio;
                                    a través de La Biodanza se logra el desarrollo e integración de todos estos potenciales ya que nos propone
                                    un nuevo enfoque para replantear la manera en que vemos y llevamos nuestras vidas.
                                </p>
                                <img src={p2} class="img-fluid" />
                            </div>
                            <div id="tituloB" class="col-12 col-lg-6">
                                {loading ? (
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) :
                                    <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">

                                        <div class="carousel-inner">
                                            {
                                                banner.map((banner, index) => (
                                                    <div key={banner.id} class={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="10000">
                                                        <img src={banner.fotografias} class="img-fluidds" alt="..." />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Anterior</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Siguiente</span>
                                        </a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <aside class="text-center bg-custom-gradient">
                    <div class="container px-5">
                        <div class="row gx-5 justify-content-center">
                            <h3 class="text-center text-white font-alt mb-4">LOS “SIETE PODERES” DE TRANSFORMACIÓN DE BIODANZA </h3>
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            <strong id="textoPoderes" >1.- Poder Musical</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" >
                                        <div id="textoGarza" class="accordion-body">
                                            Orfeo inauguró míticamente en Occidente el “poder musical”.  Mediante la música era capaz de influir en la naturaleza.  Bajo el influjo de su música, podía hacer florecer los árboles en invierno y calmar a los animales salvajes.
                                            Actualmente la investigación científica en Músicoterapia y en Psicología de la Música confirma la eficacia de este poder.  Como lo aseveran Tomatis, Campbell, Menuhim e Imberty, la música no sólo se vincula con las áreas perceptivas de la sensibilidad y de la innovación, sino que posee poderes de transformación sobre plantas, animales y, en especial, sobre los seres humanos.
                                            En Biodanza, la música es rigurosamente seleccionada, con criterios semánticos, para estimular y despertar emociones sentimentales, eróticas, eufóricas, nostálgicas, las cuales, al ser danzadas, se transforman en vivencias.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                            <strong id="textoPoderes">2.- Poder de la danza integradora</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                        <div id="textoGarza" class="accordion-body">
                                            Biodanza posee un repertorio de más de 250 ejercicios y danzas que activan los movimientos humanos en forma armónica e integradora;  que estimulan las vivencias de vitalidad, sexualidad, creatividad, afectividad y trascendencia.
                                            En Biodanza la música se transforma en movimiento corporal, “se encarna” hasta que el danzante entra en vivencia.  De la combinación música-movimiento-vivencia se desencadenan cambios sutiles en el organismo que elevan la calidad de vida, para alcanzar la plenitud y el goce de vivir.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                            <strong id="textoPoderes">3.- Metodología vivencial</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                        <div id="textoGarza" class="accordion-body">
                                            Su metodología se orienta a la deflagración de vivencias integradoras, capaces de superar las disociaciones que induce la cultura.
                                            La vivencia es la sensación intensa de estar vivo “aquí-ahora” y posee fuertes componentes cenestésicos y emocionales.  Las vivencias tienen diferentes matices emocionales, tales como euforia, erotismo, ternura, paz interior, entre otros, que contribuyen a la expresión auténtica de la identidad. La vivencia es el agente esencial de integración de la unidad funcional: “habitamos el aquí y ahora, en un tiempo cósmico”.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingFive">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                            <strong id="textoPoderes">4.- Poder deflagrador de la caricia</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                        <div id="textoGarza" class="accordion-body">
                                            “Biodanza es una poética del encuentro humano” (Rolando Toro).
                                            La conexión o contacto con las personas es esencial en todo acto de rehabilitación o curación, no existe crecimiento en solitario. La conexión verbal es insuficiente.  Es necesaria la danza en pareja ó colectiva y el compromiso corporal dentro de un contexto sensible, sutil y en feed-back. La caricia, es contacto y conexión porque trabajan en vivencias significativas de amor y comunión.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                                            <strong id="textoPoderes">5.- Poder del trance</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                                        <div id="textoGarza" class="accordion-body">
                                            Es un estado alterado de conciencia que implica la disminución del ego y regresión a lo primordial, a lo originario, en cierto modo a etapas perinatales, a estados iniciales de la existencia.
                                            Sus efectos son de renovación biológica, porque reedita las condiciones biológicas del comienzo del desarrollo y las primeras necesidades de protección, nutrición y contacto.
                                            Los ejercicios de trance permiten la reparentalización, es decir “nacer de nuevo” dentro de un contexto de amor y cuidado.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingSeven">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven">
                                            <strong id="textoPoderes">6.- Poder de la expansión de conciencia</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseSeven" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSeven">
                                        <div id="textoGarza" class="accordion-body">
                                            Es un estado de percepción ampliada que restablece el vínculo primordial con el universo, mediante músicas, danzas y ceremonias de encuentro, provocando un sentimiento intenso de unidad ontocosmológica y alegría trascendente, de plenitud, y frecuentemente de éxtasis. a través de ejercicios de afectividad y trascendencia.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingNine">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseNine" aria-expanded="false" aria-controls="panelsStayOpen-collapseNine">
                                            <strong id="textoPoderes">7.- Poder del grupo</strong>
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseNine" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingNine">
                                        <div id="textoGarza" class="accordion-body">
                                            Es una matriz de renacimiento que integra a nivel afectivo porque es un campo de interacción intenso, en donde la inducción recíproca de vivencias entre los participantes del grupo, tienen el poder de cambiar profundamente actitudes y formas de relacionamiento humano.
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>

                <section id="Metodologias">
                    <div class="container px-2 align-items-center">
                        <div class="container-fluid px-5">
                            <div class="row gx-5">
                                <div class="col-md-6 mb-2">
                                    <div class="text-center ">
                                        <i class="bi bi-diagram-3 icon-feature text-gradient d-block mb-3 "></i>
                                        <h3 class="font-alt">Metodología</h3>
                                        <p id="textoGarza" class="text-muted mb-0">
                                            Biodanza es un sistema que ha sido creado en base a principios de fisiología, psicología y antropología; interviene sobre determinadas áreas del cerebro, a través de propuestas de movimiento, las que estimuladas por situaciones
                                            de encuentro en grupo y música actúa en niveles consciente, subconsciente, emocional, orgánico y celular, permitiendo a los y las participantes, recuperar el valor de expresar aquello que está dormido o reprimido.
                                            La Biodanza emplea una metodología vivencial, enfatizando en la experiencia vivida (más que información verbal), permitiendo acceder a la transformación interna, sin mayores procesos mentales.
                                            Utiliza la música como instrumento de mediación entre la emoción y el movimiento corporal.
                                            Este sistema ayuda a integrar los potenciales humanos para lograr que las personas redescubran sus capacidades bloqueadas, se animen a hacer un cambio de paradigmas y encuentren una forma más plena de vivir. </p>
                                    </div>
                                </div>
                                <div id="metodoBio" class="col-md-6 mb-2">
                                    <div class="text-center">
                                        <i class="bi bi-graph-up-arrow icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">¿Quién puede hacer Biodanza?</h3>
                                        <p id="textoGarza" class="text-muted mb-0">
                                            Todas las personas, desde los niños hasta los ancianos, porque tenemos capacidades y habilidades que recuperar y mantener; y, como sociedad estamos afectados por la civilización, que nos provoca: estrés, depresión, soledad, angustia,
                                            ansiedad y demás presiones causadas por las exigencias de la cotidianidad. Biodanza trabaja con la parte sana de los seres humanos, potenciando sus fortalezas de creatividad y expresión, su capacidad de amar y sus valores. Además, estimula la memoria, la concentración, las relaciones sociales, la motricidad, etc.
                                            Para hacer Biodanza solo se necesita tener el deseo de renovación y entrega para involucrarse en esta propuesta. </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-5 ">
                                    <div class="text-center">
                                        <i class="bi-patch-check icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">Beneficios de practicar Biodanza</h3>
                                        <ul id="textoGarza" class="text-muted ">
                                            A través de su práctica se logra: <br /> <br />
                                            <li type="square">Reforzar la identidad</li>
                                            <li type="square"> Aumentar la energía vital</li>
                                            <li type="square">Manejar los niveles de estrés</li>
                                            <li type="square"> Elevar el sistema inmunológico</li>
                                            <li type="square">Mejorar la comunicación</li>
                                            <li type="square">Integración afectivo – motora</li> <br />
                                            <p id="textoGarza"> Al ser un sistema que sigue una evolución progresiva, permite que los participantes encuentren un nuevo sentido para su vida, una nueva escala de valores en concordancia con su propia esencia, que reconozcan con claridad sus objetivos y la forma de encaminarse hacia ellos. Desarrolla la empatía, la solidaridad
                                                y la capacidad de abrir sus vidas hacia otras personas.</p>
                                        </ul>
                                    </div>
                                </div>
                                <div id="metodoBio" class="col-md-6 mb-5">
                                    <div class="text-center">
                                        <i class="bi bi-music-note-list icon-feature text-gradient d-block mb-3"></i>
                                        <h3 id="tituloV" class="font-alt">Bailar la Vida con Biodanza</h3>
                                        <div class="text-center ">

                                            <div class="container" style={{ width: '500px' }}  >
                                                <video muted="muted" autoplay="" loop="true" style={{ width: '500px' }} ><source src={video1} type="video/mp4" /></video>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <section style={{ background: "#EAEBEA" }} id="Simbolo">
                    <div class="container px-5">
                        <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
                            <div class="col-12 col-lg-5">
                                <h2 class="display-4 lh-1 mb-4">Una Garza</h2>
                                <p id="textoGarza" class="lead fw-normal text-muted mb-5 mb-lg-0">
                                    Hermosa y ergida se impulsa desde el Ecuador desde este centro afectivo planetario en la mitad de nuestras
                                    Pacha Mama (latitud 0° 0° 0°). La Garza se eleva tomando la fuerza de la tierra; sus articulaciones flexibles
                                    le permiten un movimiento pulsante de elevación y descenso, pues el impulso de ascensión lleva en si la posibilidad
                                    de descender y retomar el vuelo. Sus alas evocan la gracia y la levedad para una visión de altura.
                                    Su movimiento nace del plexo solar y sus ojos están abiertos.
                                </p>

                            </div>
                            <div class="col-sm-8 col-md-6">
                                <img src={p1} class="img-fluid animated rounded-circle" alt="" />
                            </div>
                        </div>
                    </div>
                </section>

                <section class="cta">
                    <div class="cta-content">
                        <div class="container px-5">
                            <h2 class="text-white display-1 lh-1 mb-4">
                                Descarga la aplicación móvil para solicitar nuestro servicio de manera fácil y rápida
                                <br />
                                <div class="d-flex flex-column flex-lg-row align-items-center">
                                    <a href="#!"><img class="app-badge" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Google_Play_Store_badge_FR.svg/2560px-Google_Play_Store_badge_FR.svg.png" alt="..." /></a>
                                </div>
                            </h2>
                        </div>
                    </div>
                </section>

                <section class="bg-custom-gradient text-center py-5" id="RedesSociales">
                    <div class="container px-5">
                        <h3 class="text-center text-white font-alt mb-4">Siguenos en nuestras redes sociales </h3>
                        <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                            <a class="btn btn-dark m-3" href="https://www.facebook.com/biodanzapuembo.quito"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark m-3" href=".."><i class="bi bi-instagram"></i></a>
                            <a class="btn btn-dark m-3" href=".."><i class="bi bi-twitter"></i></a>
                        </div>
                        <h3 class="text-center text-white font-alt mb-4">Estamos ubicados en </h3>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.796664947252!2d-78.36229898528731!3d-0.1887749354666549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d593b61538b5ef%3A0x75d2b7ed6a233d31!2sEscuela%20de%20Biodanza%20Puembo!5e0!3m2!1ses!2sec!4v1673897763529!5m2!1ses!2sec"
                            style={{ border: 60 }} width="800" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                </section>

                <footer class="bg-black text-center py-5">
                    <div class="container">
                        <h3 class="text-white">Contactos</h3>
                        <div class="d-flex flex-wrap">
                            {
                                contact.map((contact, index) => (
                                    <div key={contact.id} class="col-4">
                                        <h4>{contact.nombre} {contact.apellido}</h4>
                                        <p>{contact.correo}</p>
                                        <p>{contact.puesto}</p>
                                        <p>{contact.contactanos}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </footer>
                <script src="js/scripts.js"></script>
                <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
            </div>
        </>
    )
}



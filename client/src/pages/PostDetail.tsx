import { Link } from "react-router-dom"
import PostAuthor from "../components/PostAuthor"
import thumbnail from '../assets/images/blog15.jpg'
import './postDetail.css'

const PostDetail = () => {
  return (
    <section className="post__detail">
      <div className="container post__detail-container">
        <div className="post__detail-header">
          <PostAuthor authorID={3}/>
          <div className="post__detail-buttons">
            <Link to={`/posts/julius/edit`} className="btn sm primary">
              Editar
            </Link> 
            <Link to={`/posts/julius/edit`} className="btn sm danger">
              Eliminar
            </Link> 
          </div>
        </div>
        <h1>
          React Native para aplicaciones de Robótica y Drone  
        </h1>
        <div className="post__detail-thumbnail">
          <img src={thumbnail} alt="" />
        </div>
        <p>React Native es un framework popular para el desarrollo de aplicaciones móviles que permite a los desarrolladores crear aplicaciones nativas para iOS y Android utilizando JavaScript y React. Una de las características clave de React Native es su capacidad para manejar la asincronía de manera efectiva, lo que es fundamental en aplicaciones de robótica y drones donde se requiere una comunicación rápida y eficiente con los dispositivos de hardware.</p>

        <p>En React Native, la asincronía se maneja principalmente a través de promesas y callbacks. Esto permite a los desarrolladores realizar operaciones como la lectura y escritura de datos, la comunicación con servidores remotos y el control de dispositivos de hardware de forma asincrónica, lo que mejora la capacidad de respuesta de la aplicación.</p>

        <p>Redux es una biblioteca de gestión del estado que se utiliza comúnmente en aplicaciones de React Native para gestionar el estado de la aplicación de manera centralizada. Redux facilita el manejo de datos en la aplicación y ayuda a mantener un estado coherente en toda la aplicación, lo que es útil en aplicaciones de robótica y drones donde se necesita un control preciso del estado de los dispositivos.</p>

        <p>Otra biblioteca que se utiliza a menudo en aplicaciones de React Native es React Query. React Query es una biblioteca de gestión de datos en caché que facilita la obtención y el almacenamiento en caché de datos remotos en la aplicación. Esto es útil en aplicaciones de robótica y drones donde se necesita acceder a datos en tiempo real y mantener un rendimiento óptimo.</p>

        <p>En cuanto a la geolocalización, React Native ofrece varias opciones para acceder a la ubicación del dispositivo. Una de las formas más comunes es a través del paquete @react-native-community/geolocation, que proporciona funciones para obtener la ubicación del dispositivo en tiempo real. Esto es útil en aplicaciones de robótica y drones donde se necesita conocer la ubicación precisa del dispositivo para la navegación y otras tareas.</p>

        <p>En resumen, React Native es una excelente opción para el desarrollo de aplicaciones de robótica y drones debido a su capacidad para manejar la asincronía de manera efectiva, su soporte para bibliotecas como Redux y React Query para la gestión del estado y los datos, y su capacidad para acceder a funcionalidades como la geolocalización del dispositivo. Estas características hacen de React Native una herramienta poderosa para el desarrollo de aplicaciones móviles en el campo de la robótica y los drones.</p>

      </div>
    </section>
  )
}

export default PostDetail
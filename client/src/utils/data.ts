import thumbnail1 from '../assets/images/blog1.jpg'
import thumbnail2 from '../assets/images/blog2.jpg'
import thumbnail3 from '../assets/images/blog3.jpg'
import thumbnail4 from '../assets/images/blog4.jpg'

const posts_data: PostType[] = [
    {
        id: '1',
        thumbnail1: thumbnail1,
        category: 'education',
        title: 'La educación es la base de la sociedad',
        desc: 'La educación es la base de la sociedad, es el pilar fundamental para el desarrollo de un país, es el motor que impulsa el progreso y el bienestar de una nación. La educación es el medio por el cual se transmiten los conocimientos, valores, costumbres y formas de actuar de una sociedad de generación en generación.',
        authorId: '1'
    },
    {
        id: '2',
        thumbnail1: thumbnail2,
        category: 'technology',
        title: 'La tecnología está transformando nuestras vidas',
        desc: 'La tecnología está transformando nuestras vidas de formas que antes eran difíciles de imaginar. Desde la forma en que nos comunicamos hasta la manera en que trabajamos, la tecnología ha revolucionado la forma en que vivimos.',
        authorId: '2'
    },
    {
        id: '3',
        thumbnail1: thumbnail3,
        category: 'health',
        title: 'La importancia de cuidar nuestra salud',
        desc: 'Cuidar nuestra salud es fundamental para disfrutar de una buena calidad de vida. La prevención y el cuidado de nuestro cuerpo y mente son clave para evitar enfermedades y vivir más y mejor.',
        authorId: '3'
    },
    {
        id: '4',
        thumbnail1: thumbnail4,
        category: 'science',
        title: 'El avance de la ciencia y la tecnología',
        desc: 'El avance de la ciencia y la tecnología ha sido fundamental para el desarrollo de la humanidad. Desde los descubrimientos en el espacio hasta los avances en medicina, la ciencia y la tecnología continúan transformando nuestro mundo.',
        authorId: '4'
    }
];

import avatar1 from '../assets/images/avatar1.jpg'
import avatar2 from '../assets/images/avatar2.jpg'
import avatar3 from '../assets/images/avatar3.jpg'
import avatar4 from '../assets/images/avatar4.jpg'

const author_data: AuthorType[] = [
    {
        id: 1,
        avatar: avatar1,
        name: 'John Doe',
        description: 'Desarrollador web',
        posts: 10
    },
    {
        id: 2,
        avatar: avatar2,
        name: 'Jane Doe',
        description: 'Diseñadora gráfica',
        posts: 15
    },
    {
        id: 3,
        avatar: avatar3,
        name: 'Juan Pérez',
        description: 'Ingeniero de software',
        posts: 20
    },
    {
        id: 4,
        avatar: avatar4,
        name: 'Ana Gómez',
        description: 'Periodista',
        posts: 25
    }
]

const post_categories = [
    "Agricultura",
    "Negocios",
    "Educación",
    "Entretenimiento",
    "Arte",
    "Investigación",
    "Sin categoría",
    "Tiempo"
]

const formats = [
    'header', 
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const modules = {
    toolbar: [
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ]

}

export {
    posts_data,
    author_data,
    post_categories,
    formats,
    modules
}


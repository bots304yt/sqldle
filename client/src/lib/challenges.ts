import { Language } from "@/context/LanguageContext";

type BaseChallenge = {
    id: number;
    schema: string;
    words: string[];
    fakeWords: string[];
    answers: string[];
}
type ChallengeInfo = { desc: string; task: string; };
type Traductions = {[lang in Language]: ChallengeInfo;};
type Challenge = Traductions & BaseChallenge;

export type ChallengeType = BaseChallenge & ChallengeInfo;

export const defaultChallenge: ChallengeType = {
    id: -1,
    schema: "",
    words: [],
    fakeWords: [],
    answers: [],
    desc: "",
    task: "",
}

export function getChallenge(id: number, lang: Language): ChallengeType  {
    if (id >= challenges.length) return defaultChallenge;
    const translatedChallenge = {
        id: id,
        schema: challenges[id].schema,
        words: challenges[id].words,
        fakeWords: challenges[id].fakeWords,
        answers: challenges[id].answers,
        ...challenges[id][lang]
    }
    return translatedChallenge;
}

const challenges: Challenge[] = [
    {
        id: 0,
        en: {
            desc: "You're working with a bookstore database that tracks books, authors, and sales.",
            task: "Find all books written by authors from 'USA' with a price less than $20.",
        },
        es: {
            desc: "Estás trabajando con una base de datos de una librería que rastrea libros, autores y ventas.",
            task: "Encuentra todos los libros escritos por autores de 'USA' con un precio menor a $20.",
        },
        eu: {
            desc: "Liburuak, egileak eta salmentak jarraitzen dituen liburu-denda datu-base batekin ari zara lanean.",
            task: "'USA'-ko egileek idatzitako eta 20$ baino gutxiago balio duten liburu guztiak aurkitu.",
        },
        sv: {
            desc: "Du arbetar med en bokhandelsdatabas som spårar böcker, författare och försäljning.",
            task: "Hitta alla böcker skrivna av författare från 'USA' med ett pris under $20.",
        },
        schema: "Tables:\n- books (id, title, author_id, price, published_date)\n- authors (id, name, country)\n- sales (id, book_id, quantity, sale_date)\n",
        words: ["SELECT", "books.title", "FROM", "books", "JOIN", "authors", "ON", "books.author_id", "=", "authors.id", "WHERE", "authors.country", "=", "'USA'", "AND", "books.price", "<", "20"],
        fakeWords: ["ORDER BY", "GROUP BY", "HAVING", "sales.quantity", ">", "100", "DESC", "ASC"],
        answers: ["SELECT books.title FROM books JOIN authors ON books.author_id = authors.id WHERE authors.country = 'USA' AND books.price < 20"],
    },
    {
        id: 1,
        en: {
            desc: "You're analyzing a database of employees and departments in a company.",
            task: "Find the average salary for each department, ordered by average salary in descending order.",
        },
        es: {
            desc: "Estás analizando una base de datos de empleados y departamentos en una empresa.",
            task: "Encuentra el salario promedio para cada departamento, ordenado por salario promedio en orden descendente.",
        },
        eu: {
            desc: "Enpresa bateko langile eta departamentuen datu-base bat aztertzen ari zara.",
            task: "Departamentu bakoitzeko batez besteko soldata aurkitu, batez besteko soldataren arabera beheranzko ordenan ordenatuta.",
        },
        sv: {
            desc: "Du analyserar en databas med anställda och avdelningar i ett företag.",
            task: "Hitta den genomsnittliga lönen för varje avdelning, sorterad efter genomsnittlig lön i fallande ordning.",
        },
        schema: "Tables:\n- employees (id, name, department_id, salary, hire_date)\n- departments (id, name, location)\n",
        words: ["SELECT", "departments.name", "AVG(employees.salary)", "AS", "avg_salary", "FROM", "employees", "JOIN", "departments", "ON", "employees.department_id", "=", "departments.id", "GROUP BY", "departments.name", "ORDER BY", "avg_salary", "DESC"],
        fakeWords: ["WHERE", "employees.salary", ">", "50000", "LIMIT", "10", "HAVING", "COUNT(*)", ">"],
        answers: ["SELECT departments.name, AVG(employees.salary) AS avg_salary FROM employees JOIN departments ON employees.department_id = departments.id GROUP BY departments.name ORDER BY avg_salary DESC"],
    },
    {
        id: 2,
        en: {
            desc: "You're working with a student database for a university.",
            task: "Find all Computer Science students who have taken courses with more than 3 credits and received a grade of 'A'.",
        },
        es: {
            desc: "Estás trabajando con una base de datos de estudiantes para una universidad.",
            task: "Encuentra a todos los estudiantes de Ciencias de la Computación que hayan tomado cursos con más de 3 créditos y hayan recibido una calificación de 'A'.",
        },
        eu: {
            desc: "Unibertsitate baterako ikasleen datu-base batekin ari zara lanean.",
            task: "Informatika ikasle guztiak aurkitu, 3 kreditu baino gehiago dituzten ikastaroak egin dituztenak eta 'A' kalifikazioa jaso dutenak.",
        },
        sv: {
            desc: "Du arbetar med en studentdatabas för ett universitet.",
            task: "Hitta alla datavetenskapsstudenter som har gått kurser med mer än 3 poäng och fått betyget 'A'.",
        },
        schema: "Tables:\n- students (id, name, major, gpa, enrollment_date)\n- courses (id, name, credits, department)\n- enrollments (student_id, course_id, semester, grade)\n",
        words: ["SELECT", "DISTINCT", "students.name", "FROM", "students", "JOIN", "enrollments", "ON", "students.id", "=", "enrollments.student_id", "JOIN", "courses", "ON", "enrollments.course_id", "=", "courses.id", "WHERE", "students.major", "=", "'Computer Science'", "AND", "courses.credits", ">", "3", "AND", "enrollments.grade", "=", "'A'"],
        fakeWords: ["courses.department", "=", "'Math'", "students.gpa", ">", "3.5", "ORDER BY", "students.name"],
        answers: ["SELECT DISTINCT students.name FROM students JOIN enrollments ON students.id = enrollments.student_id JOIN courses ON enrollments.course_id = courses.id WHERE students.major = 'Computer Science' AND courses.credits > 3 AND enrollments.grade = 'A'"],
    },
    {
        id: 3,
        en: {
            desc: "You're analyzing an e-commerce database with customer orders.",
            task: "Find the top 5 customers who spent the most money in 2023, showing their name and total amount spent.",
        },
        es: {
            desc: "Estás analizando una base de datos de comercio electrónico con pedidos de clientes.",
            task: "Encuentra los 5 mejores clientes que gastaron más dinero en 2023, mostrando su nombre y la cantidad total gastada.",
        },
        eu: {
            desc: "Bezeroen eskaerak dituen merkataritza elektronikoko datu-base bat aztertzen ari zara.",
            task: "2023an diru gehien gastatu duten 5 bezero nagusiak aurkitu, haien izena eta gastatutako zenbateko osoa erakutsiz.",
        },
        sv: {
            desc: "Du analyserar en e-handelsdatabas med kundorder.",
            task: "Hitta de 5 bästa kunderna som spenderade mest pengar under 2023, visa deras namn och totala belopp som spenderats.",
        },
        schema: "Tables:\n- customers (id, name, email, country)\n- orders (id, customer_id, order_date, total_amount)\n- order_items (order_id, product_id, quantity, price)\n- products (id, name, category, unit_price)\n",
        words: ["SELECT", "customers.name", "SUM(orders.total_amount)", "AS", "total_spent", "FROM", "customers", "JOIN", "orders", "ON", "customers.id", "=", "orders.customer_id", "WHERE", "orders.order_date", ">=", "'2023-01-01'", "AND", "orders.order_date", "<=", "'2023-12-31'", "GROUP BY", "customers.name", "ORDER BY", "total_spent", "DESC", "LIMIT", "5"],
        fakeWords: ["customers.country", "=", "'USA'", "AVG(order_items.quantity)", ">", "2", "HAVING", "COUNT(*)"],
        answers: ["SELECT customers.name, SUM(orders.total_amount) AS total_spent FROM customers JOIN orders ON customers.id = orders.customer_id WHERE orders.order_date >= '2023-01-01' AND orders.order_date <= '2023-12-31' GROUP BY customers.name ORDER BY total_spent DESC LIMIT 5"],
    },
    {
        id: 4,
        en: {
            desc: "You're working with a movie database that tracks films, actors, and directors.",
            task: "Find all comedy movies released after 2010 with a rating above 8, showing the movie title and director name.",
        },
        es: {
            desc: "Estás trabajando con una base de datos de películas que rastrea películas, actores y directores.",
            task: "Encuentra todas las películas de comedia estrenadas después de 2010 con una calificación superior a 8, mostrando el título de la película y el nombre del director.",
        },
        eu: {
            desc: "Pelikulak, aktoreak eta zuzendariak jarraitzen dituen pelikula-base batekin ari zara lanean.",
            task: "2010etik aurrera estreinatutako komediazko film guztiak aurkitu, 8tik gorako balorazioa dutenak, filmaren izenburua eta zuzendariaren izena erakutsiz.",
        },
        sv: {
            desc: "Du arbetar med en filmdatabas som spårar filmer, skådespelare och regissörer.",
            task: "Hitta alla komedifilmer som släpptes efter 2010 med ett betyg över 8, visa filmtiteln och regissörens namn.",
        },
        schema: "Tables:\n- movies (id, title, director_id, release_year, genre, rating)\n- directors (id, name, nationality)\n- actors (id, name, birth_year)\n- movie_actors (movie_id, actor_id, role)\n",
        words: ["SELECT", "movies.title", "directors.name", "FROM", "movies", "JOIN", "directors", "ON", "movies.director_id", "=", "directors.id", "WHERE", "movies.genre", "=", "'Comedy'", "AND", "movies.release_year", ">", "2010", "AND", "movies.rating", ">", "8", "ORDER BY", "movies.rating", "DESC"],
        fakeWords: ["actors.name", "JOIN", "movie_actors", "ON", "movies.id", "=", "movie_actors.movie_id", "LIMIT", "10"],
        answers: ["SELECT movies.title, directors.name FROM movies JOIN directors ON movies.director_id = directors.id WHERE movies.genre = 'Comedy' AND movies.release_year > 2010 AND movies.rating > 8 ORDER BY movies.rating DESC"],
    },
];
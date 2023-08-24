import './AboutMe.css';
import photo from '../../images/pic__COLOR_pic.png';

function AboutMe() {
    return (
        <section className="aboutme" id="abouteMe">
            <h2 className="aboutme__title">Студент</h2>
            <div className="aboutme__column">
                <div className="aboutme__info">
                    <h3 className="aboutme__name">Дмитрий</h3>
                    <p className="aboutme__profession">Фронтенд-разработчик, 27 лет</p>
                    <p className="aboutme__text">Я родился и живу в Севастополе, закончил факультет Промышленное гражданское
                        строительство СГУ. У меня есть
                        жена и сын. Я люблю слушать музыку, а ещё увлекаюсь автомобилями. Недавно начал кодить. С 2015
                        года работаю
                        менеджером по продажам. После того, как прошёл курс по веб-разработке, хочу найти новую работу и
                        заниматься делом которое мне нравится.</p>
                    <a className="aboutme__link" href="https://github.com/zhukoff-dmi">Github</a>
                </div>
                <img className="aboutme__photo" src={photo} alt="Фото студента" />
            </div>
        </section>
    );
}

export default AboutMe;
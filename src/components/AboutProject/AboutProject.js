import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="project" id="aboutProject">
            <h2 className="project__name">О проекте</h2>
            <div className="project__columns">
                <div className="project__column">
                    <h2 className="project__title">Дипломный проект включал 5 этапов</h2>
                    <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </div>
                <div className="project__column">
                    <h2 className="project__title">На&nbsp;выполнение диплома ушло 5 недель</h2>
                    <p className="project__text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__grid">
                <p className="project__week project__week-left">1 неделя</p>
                <p className="project__week project__week-right">4 недели</p>
                <p className="project__techs">Back-end</p>
                <p className="project__techs">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;
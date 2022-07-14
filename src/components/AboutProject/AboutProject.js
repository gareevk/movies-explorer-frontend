import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className='about-project'>
            <h2 className='about-project__heading'>О проекте</h2>
            <div className='about-project__details-container'>
                <div className='about-project__details-item'>
                    <h3 className='about-project__subheading'>Дипломный проект включал в себя 5 этапов</h3>
                    <p className='about-project__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__details-item'>
                    <h3 className='about-project__subheading'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='about-project__graph'>
                <div className='about-project__first-stage'>
                    <div className='about-project__first-week'>1 неделя
                    </div>
                    <div className='about-project__backend'>Back-end</div>
                </div>
                <div className='about-project__second-stage'>
                    <div className='about-project__four-weeks'>
                        4 недели
                    </div>
                    <div className='about-project__frontend'>
                        Front-end
                    </div>
                </div>
            </div>

        </section>
    );
}

export default AboutProject;
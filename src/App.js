import React, { useEffect, useState } from 'react';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import './App.css'
import FeatureMovie from './components/FeatureMovie/FeatureMovie'; 
import Header from './components/Header/Header';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export default() => {

  const[movieList, setMovieList] = useState([]);
  const[FeatureData, setFeatureData] = useState(null);
  const[blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.addEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className="page">

      <Header black={blackHeader}/>
      {FeatureData && < FeatureMovie item={FeatureData} />}
      <section className="lists">
        {
          movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items} />
          ))
        }
      </section>

      <footer>
        Feito por Édipo<br/>
        Diretos de imagem para NetFlix<br/>
        Conteudo copiado da API REST Themoviedb.org
      </footer>
      
      {movieList.length <= 0 &&
      <div className='loading'>
        <img src='https://thumbs.gfycat.com/MintyIndolentFruitbat-size_restricted.gif' />
      </div>}
    </div>
  )
}

import React, {useState} from 'react';
import './MovieRow.css';
import seta_esquerda from '../../images/seta_esquerda.png'
import seta_direita from '../../images/seta_direita.png'


export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0)
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth /2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth /2);
        let listW = items.results?.length * 150;
        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
            <img src={seta_esquerda} alt="" />

            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
            <img src={seta_direita} alt="" />

            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results?.length * 150
                }}>
                    {items.results?.length > 0 && items.results?.map((item, key) => (
                        <div key={key} className="movieRow--item">
                           <a href={`https://vizer.tv/filme/online/${item.original_name}`}> <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} /></a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

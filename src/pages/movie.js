import React from 'react'
import './movie.css'

export default ({item}) => {
    let firstDate = new Date(item.first_air_date);
    let genres = []
    for(let i in item.genres){
        genres.push( item.genres[i].name )
    }

    let description = item.overview;
    if(description.length > 250){
        description = description.substring(0, 250) + '...';
    }
    return (
        <section className='movie' style={{
            backgroundSize: 'cover',
            backgroudPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className='movie--vertical'>
                <div className='movie--horizontal'>
                    <div className='movie--name'>
                        {item.original_name}
                    </div>
                    <div className='movie--info'>
                        <div className='movie--points'>
                            {item.vote_average} pontos
                        </div>
                        <div className='movie--year'>
                            {firstDate.getFullYear()}
                        </div>
                        <div className='movie--seasons'>
                            {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className='movie--overview'>
                        {description}
                    </div>
                    <div className='movie--buttons'>
                        <a href={`watch/${item.id}`} className='movie--watchbutton'>► Assistir</a>
                        <a href={`list/add/${item.id}`} className='movie--mylistbutton'>+ Minha Lista</a>
                    </div>
                    <div className='movie--genres'>
                        <strong>Gêneros:</strong> {genres.join(', ')}
                    </div>

                </div>
            </div>
        </section>

    );
}
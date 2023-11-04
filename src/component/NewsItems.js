import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let {title, description, ImageUrl, Newsurl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div>
          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
        
          <img src={!ImageUrl?"https://media.istockphoto.com/photos/words-news-picture-id959801552?b=1&k=20&m=959801552&s=170667a&w=0&h=h1mGkQJgugNul1LUD9Kdk3nUUAgNmSRA1jtLo3C-flY=":ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body" style={{padding: '1rem 0rem', width: '17em'}}>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={Newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
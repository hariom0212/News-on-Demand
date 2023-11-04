import React, { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from 'prop-types'
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    console.log("Hello i am constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd09aaf4176f4de4bcbab4bbf36fe658&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
  })
  this.props.setProgress(100);
}
  async componentDidMount() {
   this.updateNews();
    }

  // handlePrevClick = async () => {
  //   this.setState({page: this.state.page - 1})
  //   this.updateNews();
  // };

  //   handleNextClick = async () => {
  //     this.setState({ page: this.state.page + 1})
  //     this.updateNews();
  //   };

  fetchMoreData = async() => {
    this.setState({page:this.state.page +1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd09aaf4176f4de4bcbab4bbf36fe658&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false,
  })
}

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{width: '35px, 0px', marginTop: '90px'}}>News OnDemand - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItems
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  ImageUrl={element.urlToImage}
                  Newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
export default News;
